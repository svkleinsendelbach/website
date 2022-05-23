import { Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { StorageFilesManagerService } from '../../services/api/storage-files-manager.service';
import * as uuid from 'uuid';
import { EditorLocale, EditorOption } from 'angular-markdown-editor';
import { MarkdownService } from 'ngx-markdown';

type InsertImageState = InsertImageState.None | InsertImageState.Error | InsertImageState.FileUpload;

namespace InsertImageState {
  export interface None {
    state: 'none'
   }

  export interface Error {
    state: 'error',
    message: string,
  }

  export interface FileUpload {
    state: 'fileUpload',
    percentage: number,
  }

  export const none: None = { state: 'none' };

  export function error(message: string): Error {
    return { state: 'error', message };
  }

  export function fileUpload(percentage: number): FileUpload {
    return { state: 'fileUpload', percentage };
  }
}

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.sass'],
})
export class MarkdownEditorComponent {
  @Input() public markdownText: string = '';

  @Output() public markdownTextChange = new EventEmitter<string>();

  public editorOptions: EditorOption;

  private insertImageEvent?: any;

  public insertImageState: InsertImageState = InsertImageState.none;

  public locale: EditorLocale = {
    language: 'de',
    dictionary: {
      Bold: 'Fett',
      Italic: 'Italic',
      Heading: 'Überschrift',
      'URL/Link': 'URL einfügen',
      Image: 'Bild einfügen',
      List: 'Liste',
      'Ordered List': 'geordnete Liste',
      'Unordered List': 'ungeordnete Liste',
      Code: 'Code',
      Quote: 'Anführungszeichen',
      Preview: 'Vorschau',
      Strikethrough: 'Durchstreichen',
      Table: 'Tabelle',
      'strong text': 'wichtiger Text',
      'emphasized text': 'hervorgehobener Text',
      'heading text': 'Überschrift',
      'enter link description here': 'Fügen Sie die Link Beschreibung hier ein',
      'Insert Hyperlink': 'Hyperlink einfügen',
      'enter image description here': 'Fügen Sie die Bild Beschreibung hier ein',
      'Insert Image Hyperlink': 'Bild Hyperlink einfügen',
      'enter image title here': 'Fügen Sie den Bild Title hier ein',
      'list text here': 'Aufzählung',
    },
  };

  @ViewChild('fileUpload') private fileInputElement!: ElementRef<HTMLInputElement>;

  constructor(private markdownService: MarkdownService, private storageFilesManager: StorageFilesManagerService) {
    this.editorOptions = {
      iconlibrary: 'fa',
      language: 'de',
      parser: val => this.parse(val),
      hiddenButtons: ['cmdImage', 'cmdCode'],
      additionalButtons: [
        [
          {
            name: 'groupFont',
            data: [
              {
                name: 'cmdStrikethrough',
                toggle: false,
                title: 'Strikethrough',
                icon: {
                  fa: 'fa fa-strikethrough',
                  glyph: 'glyphicon glyphicon-minus',
                },
                callback: (e: any) => {
                  // Give/remove ~~ surround the selection
                  let chunk;
                  let cursor;
                  const selected = e.getSelection();
                  const content = e.getContent();

                  if (selected.length === 0) {
                    // Give extra word
                    chunk = e.__localize('strikethrough');
                  } else {
                    chunk = selected.text;
                  }

                  // transform selection and set the cursor into chunked text
                  if (content.substr(selected.start - 2, 2) === '~~' && content.substr(selected.end, 2) === '~~') {
                    e.setSelection(selected.start - 2, selected.end + 2);
                    e.replaceSelection(chunk);
                    cursor = selected.start - 2;
                  } else {
                    e.replaceSelection('~~' + chunk + '~~');
                    cursor = selected.start + 2;
                  }

                  // Set the cursor
                  e.setSelection(cursor, cursor + chunk.length);
                },
              },
            ],
          },
          {
            name: 'groupMisc',
            data: [
              {
                name: 'cmdTable',
                toggle: false,
                title: 'Table',
                icon: {
                  fa: 'fa fa-table',
                  glyph: 'glyphicon glyphicon-th',
                },
                callback: (e: any) => {
                  // Replace selection with some drinks
                  let chunk;
                  let cursor;
                  const selected = e.getSelection();

                  chunk =
                    '\n| Tables        | Are           | Cool  | \n' +
                    '| ------------- |:-------------:| -----:| \n' +
                    '| col 3 is      | right-aligned | $1600 | \n' +
                    '| col 2 is      | centered      |   $12 | \n' +
                    '| zebra stripes | are neat      |    $1 |';

                  // transform selection and set the cursor into chunked text
                  e.replaceSelection(chunk);
                  cursor = selected.start;

                  // Set the cursor
                  e.setSelection(cursor, cursor + chunk.length);
                },
              },
            ],
          },
          {
            name: 'groupLink',
            data: [
              {
                name: 'cmdInsertImage',
                toggle: false,
                title: 'Bild einfügen',
                icon: {
                  fa: 'fa fa-image',
                  glyph: 'glyphicon glyphicon-picure',
                },
                callback: (e: any) => {
                  this.insertImageEvent = e;
                  this.fileInputElement.nativeElement.click();
                },
              },
            ],
          },
        ],
      ],
      onChange: _ => {
        this.markdownTextChange.emit(this.markdownText);
      },
    };
  }

  parse(inputString: string): string {
    const markedOutput = this.markdownService.compile(inputString.trim());
    setTimeout(() => {
      this.markdownService.highlight();
    });
    return markedOutput;
  }

  onFileSelected(event: any) {
    // Reset insert image state
    this.insertImageState = InsertImageState.none;

    // Get selected file
    const file: File = event.target.files[0];
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      this.insertImageState = InsertImageState.error(`Ungültiger Dateityp: ${file.type}`);
      return;
    }

    // Upload file
    const fileExtension = /.[^/.]+$/.exec(file.name)?.[0];
    this.storageFilesManager
      .upload(file, `uploads/${uuid.v4()}${fileExtension}`, percentage => {
        this.insertImageState = InsertImageState.fileUpload(percentage ?? 0);
      })
      .then(fileUrl => {
        this.insertImageState = InsertImageState.none;
        const fileName = file.name.replace(/.[^/.]+$/, '');
        const chunk = `![${fileName}](${fileUrl})`;
        const selected = this.insertImageEvent.getSelection();
        const cursor = selected.start;
        this.insertImageEvent.replaceSelection(chunk);
        this.insertImageEvent.setSelection(cursor, cursor + chunk.length);
      })
      .catch(err => {
        console.error(err);
        this.insertImageState = InsertImageState.error(`Es ist ein unbekannter Fehler aufgetreten.`);
      });
  }
}
