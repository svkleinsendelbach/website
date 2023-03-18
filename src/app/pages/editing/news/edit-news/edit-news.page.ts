import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InternalLink } from 'src/app/types/InternalPath';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { ValidationResult } from 'src/app/modules/input-form/types/validation-result';
import { Validator } from 'src/app/modules/input-form/types/validator';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { environment } from 'src/environments/environment';
import { News } from 'src/app/modules/firebase-api/types/news';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { Guid } from 'src/app/modules/firebase-api/types/guid';
import { FileStorageService } from 'src/app/modules/firebase-api/services/file-storage.service';

@Component({
    selector: 'pages-edit-news',
    templateUrl: './edit-news.page.html',
    styleUrls: ['./edit-news.page.sass']
})
export class EditNewsPage implements OnInit {
    public logInPageLink = InternalLink.all['bearbeiten/anmelden'];
    public editNewsLink = InternalLink.all['bearbeiten/nachrichten'];

    public previousNews: News.Flatten | undefined;

    public inputForm = new InputForm({
        title: new InputField<string>('', [
            Validator.required('Der Titel is erfordelich.')
        ]),
        subtitle: new InputField<string>(''),
        shortDescription: new InputField<string>(''),
        message: new InputField<string>('', [
            Validator.required('Die Nachricht ist erfordelich.')
        ])
    },
    {
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        loading: new InputError('Nachricht wird gespeichert.', ErrorLevel.Info)
    });

    public thumbnailUrl?: string;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly fileStorage: FileStorageService,
        private readonly sharedData: SharedDataService<{
        editNews: News.Flatten;
        }>,
        private router: Router
    ) {
        this.previousNews = this.sharedData.getValue('editNews');
        this.titleService.setTitle(this.previousNews === undefined ? 'Nachricht hinzufügen' : 'Nachricht bearbeiten');
    }

    public ngOnInit() {
        if (this.previousNews !== undefined) {
            this.inputForm.field('title').initialValue = this.previousNews.title;
            this.inputForm.field('subtitle').initialValue = this.previousNews.subtitle ?? '';
            this.inputForm.field('shortDescription').initialValue = this.previousNews.shortDescription ?? '';
            this.thumbnailUrl = this.previousNews.thumbnailUrl;
            this.fileStorage.download(this.previousNews.newsUrl).then(message => {
                this.inputForm.field('message').initialValue = message;
            });
        }
    }

    public uploadFile = (file: File): Promise<string> => {
        const fileExtension = /.[^/.]+$/.exec(file.name)?.[0];
        const filename = `${environment.databaseType}/uploads/editor/${Guid.newGuid().guidString}${fileExtension}`;
        return this.fileStorage.upload(file, filename);
    };

    public async saveNews() {
        if (this.inputForm.status === 'loading')
            return;
        this.inputForm.status = 'valid';
        const validation = this.inputForm.evaluate();
        if (validation === ValidationResult.Invalid)
            return;
        if (this.thumbnailUrl === undefined) {
            this.inputForm.status = 'invalidInput';
            return;
        }
        this.inputForm.status ='loading';
        const newsId = this.previousNews?.id ?? this.createNewsId(this.inputForm.field('title').value);
        const date = this.previousNews?.date ?? new Date().toISOString();
        const newsUrl = await this.uploadNewsMessage(this.inputForm.field('message').value);
        await this.firebaseApiService.function('news').function('edit').call({
            editType: this.previousNews !== undefined ? 'change' : 'add',
            newsId: newsId,
            news: {
                title: this.inputForm.field('title').value,
                subtitle: this.inputForm.field('subtitle').value || undefined,
                date: date,
                shortDescription: this.inputForm.field('shortDescription').value || undefined,
                newsUrl: newsUrl,
                disabled: this.previousNews?.disabled ?? false,
                thumbnailUrl: this.thumbnailUrl
            }
        });
        await this.router.navigateByUrl(InternalLink.all['bearbeiten/nachrichten'].link);
        this.inputForm.status = 'valid';
    }

    public createNewsId(title: string): string {
        const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-#';
        const replaceCharacters = { 'Ä': 'AE', 'Ö': 'OE', 'Ü': 'UE', 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss' };
        let result = '';
        function addCharacter(character: string) {
            if (character === '-' && (result === '' || result.endsWith('-')))
                return;
            result += character;
        }
        for (const character of title) {
            if (validCharacters.includes(character)) {
                addCharacter(character);
            } else if (character in replaceCharacters) {
                addCharacter(replaceCharacters[character as keyof typeof replaceCharacters]);
            } else {
                addCharacter('-');
            }
        }
        if (result.endsWith('-'))
            result = result.slice(0, result.length - 1);
        return result;
    }

    public async uploadNewsMessage(newsMessage: string): Promise<string> {
        const filePath = `${environment.databaseType}/news/${Guid.newGuid().guidString}.html`;
        return await this.fileStorage.upload(newsMessage, filePath);
    }

    public async uploadThumbnail(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file === undefined) return;
        const fileExtension = /.[^/.]+$/.exec(file.name)?.[0];
        if (fileExtension === undefined) return;
        const filePath = `${environment.databaseType}/uploads/thumbnail/${Guid.newGuid().guidString}${fileExtension}`;
        this.thumbnailUrl = await this.fileStorage.upload(file, filePath);
    }
}