import { Component, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { InputFields, InputField, Validator } from 'src/app/components/input-form/input-form.component';
import { StorageFilesManagerService } from 'src/app/services/api/storage-files-manager.service';
import { WebsiteEditingErrorCode, WebsiteEditingService } from 'src/app/services/api/website-editing.service';
import { WebsiteEditorAuthService } from 'src/app/services/api/website-editor-auth.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import { News, SharedNewsEditService } from 'src/app/services/shared-data/shared-news-edit.service';
import * as uuid from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.sass'],
})
export class EditNewsComponent implements AfterViewInit {
  public WebsiteEditingErrorCode = WebsiteEditingErrorCode;

  public editType: 'add' | 'update' = 'add';

  public markdownText: string = '';

  public disabledChecked: boolean = false;

  private news: News | undefined;

  public inputFields = new InputFields(
    {
      title: new InputField({
        required: Validator.required,
      }),
      subtitle: new InputField(),
      shortDescription: new InputField(),
    },
    undefined as 'messageRequired' | WebsiteEditingErrorCode | 'loading' | undefined,
  );

  constructor(
    private titleService: Title,
    private headerIntransparentService: HeaderIntransparentService,
    public authService: WebsiteEditorAuthService,
    private sharedNewsEdit: SharedNewsEditService,
    public deviceType: DeviceTypeService,
    private storageFilesManager: StorageFilesManagerService,
    private websiteEditing: WebsiteEditingService,
    private router: Router
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.news = this.sharedNewsEdit.news;
    this.editType = this.news === undefined ? 'add' : 'update';
    if (this.editType === 'update') {
      this.titleService.setTitle('Nachrichten Bearbeiten');
    } else {
      this.titleService.setTitle('Nachrichten Hinzufügen');
    }
    this.authService.checkLogInOrNavigateToLogInPage();
  }

  ngAfterViewInit() {
    if (this.editType === 'update' && this.news !== undefined) {
      this.inputFields.field('title').textValue = this.news.title;
      this.inputFields.field('subtitle').textValue = this.news.subtitle ?? '';
      this.inputFields.field('shortDescription').textValue = this.news.shortDescription ?? '';
      this.disabledChecked = this.news.disabled;
      this.storageFilesManager.download<string>(this.news.newsUrl).then(message => {
        console.log(message);
        this.markdownText = message;
      });
    }
  }

  public handleAddEditNews() {
    const validation = this.inputFields.validationOfAllFields;
    if (this.markdownText === '') this.inputFields.setStatus('messageRequired');
    if (this.inputFields.status !== 'valid') return;
    if (validation !== 'valid') return;
    this.inputFields.setStatus('loading');

    const newsId = this.editType === 'update' && this.news !== undefined ? this.news.id : uuid.v4();
    const date = this.editType === 'update' && this.news !== undefined ? this.news.date : new Date().toISOString();
    this.websiteEditing
      .editNews({
        editType: this.editType,
        newsId: newsId,
        title: this.inputFields.field('title').textValue,
        subtitle: this.inputFields.field('subtitle').textValue || undefined,
        shortDescription: this.inputFields.field('shortDescription').textValue || undefined,
        date: date,
        disabled: this.disabledChecked,
      }, {
        fileName: newsId,
        message: this.markdownText,
      }).then(() => {
        this.inputFields.setStatus('valid');
        this.router.navigateByUrl('/bearbeiten/nachrichten');
      }).catch(error => {
        if ('name' in error && error.name === 'WebsiteEditingServiceError' && 'code' in error)
          this.inputFields.setStatus(error.code);
        else this.inputFields.setStatus('unknown');
        console.error(error);
      });
  }
}
