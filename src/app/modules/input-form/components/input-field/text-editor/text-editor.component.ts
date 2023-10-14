import { AngularEditorConfig, SelectOption, UploadResponse } from '@kolkov/angular-editor';
import { Component, Input, OnInit } from '@angular/core';
import { FileStorageService } from 'src/app/modules/firebase-api/services/file-storage.service';
import { Guid } from 'src/app/modules/firebase-api/types/guid';
import { HttpResponse } from '@angular/common/http';
import { InputField } from '../../../types/input-field';
import { Observable } from 'rxjs';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'input-field-text-editor',
    styleUrls: ['./text-editor.component.sass'],
    templateUrl: './text-editor.component.html'
})
export class TextEditorComponent implements OnInit {
    @Input() public label!: string;

    @Input() public placeholder: string | null = null;

    @Input() public inputField!: InputField<string>;

    public config: AngularEditorConfig = {
        editable: true,
        enableToolbar: true,
        minHeight: '160px',
        sanitize: false,
        showToolbar: true,
        spellcheck: true,
        toolbarHiddenButtons: [['subscript', 'superscript', 'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'heading', 'fontName', 'textColor', 'backgroundColor', 'insertVideo', 'toggleEditorMode']],
        toolbarPosition: 'top',
        translate: 'yes',
        width: '100%'
    };

    public colorSelectOptions: (SelectOption & { value: keyof typeof StyleConfigService.config })[] = [
        { label: 'Standard Farbe',
            value: 'text' },
        { label: 'Highlight Farbe',
            value: 'primary' },
        { label: 'Ausgegrauter Text',
            value: 'secondaryText' }
    ];

    public selectedColor: keyof typeof StyleConfigService.config = 'text';

    public constructor(
        private readonly fileStorage: FileStorageService,
        public styleConfig: StyleConfigService
    ) {}

    public get htmlContent(): string {
        return this.inputField.value;
    }

    public set htmlContent(value: string) {
        this.inputField.inputValue = value;
    }

    public ngOnInit() {
        this.config.upload = (file: File) => new Observable<HttpResponse<UploadResponse>>(subscriber => {
            void this.uploadFile(file).then(fileUrl => {
                subscriber.next(new HttpResponse({
                    body: {
                        imageUrl: fileUrl
                    }
                }));
                subscriber.complete();
            });
        });
    }

    public async uploadFile(file: File): Promise<string> {
        // eslint-disable-next-line prefer-destructuring
        const fileExtension = ((/.[^/.]+$/u).exec(file.name) ?? [''])[0];
        const filePath = `${environment.databaseType}/uploads/files/${Guid.newGuid().guidString}${fileExtension}`;
        return this.fileStorage.upload(file, filePath);
    }

    public setColor(executeCommand: (commandId: string, value?: string) => boolean) {
        executeCommand('foreColor', this.styleConfig.css(this.selectedColor));
    }
}
