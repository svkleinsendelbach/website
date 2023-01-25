import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AngularEditorConfig, UploadResponse } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { InputField } from '../../../classes/input-field';

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
    height: 'auto',
    minHeight: '160px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    defaultFontName: 'calibri',
    fonts: [
      { class: 'calibri', name: 'Calibri' },
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    sanitize: true,
    toolbarPosition: 'top'
  };

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

  public get htmlContent(): string {
    return this.inputField.value;
  }

  public set htmlContent(value: string) {
    this.inputField.inputValue = value;
  }
}
