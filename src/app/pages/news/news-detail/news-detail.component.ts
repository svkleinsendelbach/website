import { Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { InternalLink } from 'src/app/classes/InternalPath';
import { FetchState } from 'src/app/template/classes/fetch-state';
import { FullDatum } from 'src/app/template/classes/full-datum';
import { News } from 'src/app/template/classes/news';
import { ApiService } from 'src/app/template/services/api.service';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { FileStorageService } from 'src/app/template/services/file-storage.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.sass']
})
export class NewsDetailComponent {
  public FetchState = FetchState;

  public fetchedNews: FetchState<News> = FetchState.loading;

  @ViewChild('message') public messageElement!: ElementRef<HTMLElement>;

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    private readonly apiService: ApiService,
    private readonly fileStorage: FileStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.titleService.setTitle('Nachricht');
    this.getNews();
  }

  private async getNews() {
    const newsId = this.route.snapshot.paramMap.get('id');
    if (newsId === null) {
      await this.router.navigateByUrl(InternalLink.all['nachrichten'].link);
      return;
    }
    const news = await this.apiService.newsGetSingle({
      newsId: newsId
    });
    if (news === null) {
      await this.router.navigateByUrl(InternalLink.all['nachrichten'].link);
      return;
    }
    this.titleService.setTitle(news.title);
    this.fetchedNews = FetchState.success(News.unflatten(news));
    const message = await this.fileStorage.download(news.newsUrl);
    this.messageElement.nativeElement.innerHTML = message;
  }

  public getDateDescription(date: Date): string {
    return FullDatum.description(FullDatum.fromDate(date));
  }
}
