import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AngularEditorConfig, SelectOption, UploadResponse } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { InputField } from '../../../types/input-field';

@Component({
    selector: 'input-field-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.sass']
})
export class TextEditorComponent implements OnInit {
    @Input() public label!: string;

    @Input() public placeholder: string | undefined = undefined;

    @Input() public inputField!: InputField<string>;

    @Input() public uploadFile?: (file: File) => Promise<string>;

    public config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        minHeight: '160px',
        width: '100%',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        sanitize: false,
        toolbarPosition: 'top',
        toolbarHiddenButtons: [[
            'subscript', 'superscript', 'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'heading', 'fontName', 'textColor', 'backgroundColor', 'insertVideo', 'toggleEditorMode'
        ]]
    };

    public colorSelectOptions: (SelectOption & { value: keyof StyleConfigService.StyleConfig })[] = [
        { label: 'Standard Farbe', value: 'textColor' },
        { label: 'Highlight Farbe', value: 'primaryColor' },
        { label: 'Ausgegrauter Text', value: 'secondaryTextColor' }
    ];

    public selectedColor: keyof StyleConfigService.StyleConfig = 'textColor';

    public constructor(
        public styleConfig: StyleConfigService
    ) {}

    public ngOnInit() {
        this.config.upload = this.uploadFile === undefined ? undefined : (file: File) => {
            return new Observable<HttpResponse<UploadResponse>>(subscriber => {
                if (this.uploadFile === undefined) {
                    return subscriber.complete();
                }
                this.uploadFile(file).then(fileUrl => {
                    subscriber.next(new HttpResponse({
                        body: {
                            imageUrl: fileUrl
                        }
                    }));
                    subscriber.complete();
                });
            });
        };
    }

    public setColor(executeCommand: (commandId: string, value?: string) => boolean) {
        executeCommand('foreColor', this.styleConfig.css(this.selectedColor));
    }

    public get htmlContent(): string {
        return this.inputField.value;
    }

    public set htmlContent(value: string) {
        this.inputField.inputValue = value;
    }
}
