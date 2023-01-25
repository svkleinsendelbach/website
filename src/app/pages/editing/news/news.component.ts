import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { allInternalLinks } from 'src/app/app.component';
import { News } from 'src/app/template/classes/news';
import { ApiService } from 'src/app/template/services/api.service';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { SharedDataService } from 'src/app/template/services/shared-data.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent {
  public logInPageLink = allInternalLinks['bearbeiten/anmelden'];
  public mainEditingPageLink = allInternalLinks['bearbeiten']

  public allNews: News.ReturnType[] | undefined = undefined;

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    private readonly apiService: ApiService,
    private readonly sharedData: SharedDataService<{
      editNews: News.ReturnType
    }>,
    private router: Router
  ) {
    this.titleService.setTitle('Nachrichten bearbeiten')
    this.getNews();
  }

  private async getNews() {
    this.allNews = (await this.apiService.getNews({
      numberNews: undefined
    })).news;
  }

  public async deleteNews(id: string) {
    this.allNews = this.allNews?.filter(news => news.id !== id);
    await this.apiService.editNews({
      editType: 'remove',
      id: id,
      news: undefined
    });
  }

  public async editNews(news: News.ReturnType) {
    this.sharedData.setValue('editNews', news);
    await this.router.navigateByUrl(allInternalLinks['bearbeiten/nachrichten/bearbeiten'].link);
  }

  public async addNewNews() {
    this.sharedData.removeValue('editNews');
    await this.router.navigateByUrl(allInternalLinks['bearbeiten/nachrichten/bearbeiten'].link);
  }
}
