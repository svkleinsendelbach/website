import { Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { InternalLink } from 'src/app/types/InternalPath';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { FetchState } from 'src/app/types/fetch-state';
import { News } from 'src/app/modules/firebase-api/types/news';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { Datum } from 'src/app/types/datum';
import { FileStorageService } from 'src/app/modules/firebase-api/services/file-storage.service';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.sass']
})
export class NewsDetailComponent {
    public Datum = Datum;

    public fetchedNews: FetchState<News> = FetchState.loading;

  @ViewChild('message') public messageElement!: ElementRef<HTMLElement>;

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    private readonly firebaseApiService: FirebaseApiService,
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
      const news = await this.firebaseApiService.function('news').function('getSingle').call({
          newsId: newsId
      });
      if (news === null) {
          await this.router.navigateByUrl(InternalLink.all['nachrichten'].link);
          return;
      }
      this.titleService.setTitle(news.title);
      this.fetchedNews = FetchState.success(News.concrete(news));
      const message = await this.fileStorage.download(news.newsUrl);
      this.messageElement.nativeElement.innerHTML = message;
  }
}
