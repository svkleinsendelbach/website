import { AfterViewInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { allInternalLinks } from 'src/app/app.component';
import { guid } from 'src/app/template/classes/guid';
import { News } from 'src/app/template/classes/news';
import { ErrorLevel } from 'src/app/template/modules/input-form/classes/error-level';
import { InputError } from 'src/app/template/modules/input-form/classes/input-error';
import { InputField } from 'src/app/template/modules/input-form/classes/input-field';
import { InputForm } from 'src/app/template/modules/input-form/classes/input-form';
import { ValidationResult } from 'src/app/template/modules/input-form/classes/validation-result';
import { Validator } from 'src/app/template/modules/input-form/classes/validator';
import { ApiService } from 'src/app/template/services/api.service';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { FileStorageService } from 'src/app/template/services/file-storage.service';
import { SharedDataService } from 'src/app/template/services/shared-data.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.sass']
})
export class EditNewsComponent implements AfterViewInit {
  public logInPageLink = allInternalLinks['bearbeiten/anmelden'];
  public editNewsLink = allInternalLinks['bearbeiten/nachrichten'];

  public previousNews: News.ReturnType | undefined;

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
    private readonly apiService: ApiService,
    private readonly fileStorage: FileStorageService,
    private readonly sharedData: SharedDataService<{
      editNews: News.ReturnType
    }>,
    private router: Router
  ) {
    this.previousNews = this.sharedData.getValue('editNews');
    this.titleService.setTitle(this.previousNews === undefined ? 'Nachricht hinzufügen' : 'Nachricht bearbeiten');
  }

  public ngAfterViewInit(): void {
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
    const filename = `${environment.databaseType.value}/uploads/editor/${guid.newGuid().guidString}${fileExtension}`;
    return this.fileStorage.upload(file, filename);
  };

  public async saveNews() {
    if (this.inputForm.status !== 'valid')
      return;
    const validation = this.inputForm.evaluate();
    if (validation === ValidationResult.Invalid)
      return;
    this.inputForm.status ='loading';
  }

  public async uploadThumbnail(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file === undefined) return;
    const fileExtension = /.[^/.]+$/.exec(file.name)?.[0];
    if (fileExtension === undefined) return;
    const filePath = `${environment.databaseType.value}/uploads/thumbnail/${guid.newGuid().guidString}${fileExtension}`;
    this.thumbnailUrl = await this.fileStorage.upload(file, filePath);
  }
}
