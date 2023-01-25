import { AfterViewInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { allInternalLinks } from 'src/app/app.component';
import { guid } from 'src/app/template/classes/guid';
import { InputField } from 'src/app/template/classes/input-field';
import { InputForm } from 'src/app/template/classes/input-form';
import { News } from 'src/app/template/classes/news';
import { Validator } from 'src/app/template/classes/validators';
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
  public editNewsLink = allInternalLinks['bearbeiten/nachrichten']

  public previousNews: News.ReturnType | undefined;

  public inputForm = new InputForm({
    title: new InputField(
      'Titel:',
      InputField.Type.inputText('Titel'),
      {
        required: {
          validator: Validator.required,
          errorMessage: 'Der Titel is erfordelich.'
        }
      }
    ),
    subtitle: new InputField(
      'Untertitel:',
      InputField.Type.inputText('Untertitel (Optional)')
    ),
    shortDescription: new InputField(
      'Kurzbeschreibung:',
      InputField.Type.inputText('Kurzbeschreibung (Optional)')
    ),
  },
  {
    invalidInput: {
      message: 'Nicht alle Eingaben sind gültig.',
      level: InputForm.StatusLevel.Error
    },
    loading: {
      message: 'Nachricht wird gespeichert.',
      level: InputForm.StatusLevel.Info
    }
  });

  public thumbnailUrl?: string

  public messageText = ''

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
      this.inputForm.field('title').textValue = this.previousNews.title;
      this.inputForm.field('subtitle').textValue = this.previousNews.subtitle ?? '';
      this.inputForm.field('shortDescription').textValue = this.previousNews.shortDescription ?? '';
      this.thumbnailUrl = this.previousNews.thumbnailUrl;
      this.fileStorage.download(this.previousNews.newsUrl).then(message => {
        this.messageText = message;
      });
    }
  }

  public async saveNews() {}

  public async uploadThumbnail(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file === undefined) return;
    const fileExtension = /.[^/.]+$/.exec(file.name)?.[0]
    if (fileExtension === undefined) return;
    const filePath = `${environment.databaseType.value}/uploads/thumbnail/${guid.newGuid().guidString}${fileExtension}`;
    this.thumbnailUrl = await this.fileStorage.upload(file, filePath);
  }
}
