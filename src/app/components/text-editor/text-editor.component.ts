import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { StorageFilesManagerService } from 'src/app/services/api/storage-files-manager.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.sass'],
})
export class TextEditorComponent {
  @Input() public htmlContent: string = '';

  @Output() public htmlContentChange = new EventEmitter<string>();

  public editorOption: Object;

  @ViewChild('editor') editor!: ElementRef<HTMLElement>;

  constructor(private storageFilesManager: StorageFilesManagerService) {
    this.editorOption = {
      charCounterCount: false,
      heightMin: 500,
      language: 'de',
      events: {
        'image.beforeUpload': (images: any) => this.imageBeforeUpload(images),
      },
    };
  }

  private imageBeforeUpload(images: any) {
    const fileExtension = /.[^/.]+$/.exec(images[0].name)?.[0];
    const filePath = `uploads/${uuid.v4()}${fileExtension}`;
    this.storageFilesManager
      .upload(images[0], filePath)
      .then(url => {
        this.froalaEditor.image.insert(url, null, null, this.froalaEditor.image.get());
      })
      .catch(console.error);
  }

  private get froalaEditor(): any {
    return (this.editor.nativeElement as any)['data-froala.editor'];
  }
}
