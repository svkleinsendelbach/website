import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularEditorConfig, UploadResponse } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { guid } from '../../classes/guid';
import { FileStorageService } from '../../services/file-storage.service';
import { HttpResponse } from '@angular/common/http'

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.sass']
})
export class TextEditorComponent {
  @Input() public placeholder!: string

  @Input() public htmlContent!: string

  @Output() public htmlContentChange = new EventEmitter<string>()

  @Output() focusChange = new EventEmitter<'focus' | 'blur'>()

  public config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    defaultFontName: 'calibri',
    fonts: [
      {class: 'calibri', name: 'Calibri'},
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    upload: (file: File) => {
      const fileExtension = /.[^/.]+$/.exec(file.name)?.[0]
      const filename = `${environment.databaseType.value}/uploads/editor/${guid.newGuid().guidString}${fileExtension}`;
      return new Observable<HttpResponse<UploadResponse>>(subscriber => {
          this.fileStorage.upload(file, filename).then(fileUrl => {
            subscriber.next(new HttpResponse({
              body: {
                imageUrl: fileUrl
              }
            }));
            subscriber.complete();
          });
      });
    },
    sanitize: true,
    toolbarPosition: 'top'
  }

  public constructor(
    private readonly fileStorage: FileStorageService
  ) {}

  public onFocus() {
    this.focusChange.emit('focus');
  }

  public onBlur() {
    this.focusChange.emit('blur');
    this.htmlContentChange.emit(this.htmlContent);
  }
}
