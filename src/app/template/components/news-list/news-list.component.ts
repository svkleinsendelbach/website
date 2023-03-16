import { Component, Input, OnInit } from '@angular/core';
import { FetchState } from '../../classes/fetch-state';
import { Datum } from '../../classes/full-datum';
import { Link } from '../../classes/link';
import { News } from '../../classes/news';
import { ApiService } from '../../services/api.service';
import { DeviceTypeService } from '../../services/device-type.service';
import { StyleConfigService } from '../../services/style-config.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass']
})
export class NewsListComponent implements OnInit {
  public FetchState = FetchState;

  @Input() public maxListCount?: number;

  @Input() public allNewsLink!: Link;

  @Input() public newsLink!: (news: News) => Link;

  public fetchedNews: FetchState<{ news: News[], hasMore: boolean }> = FetchState.loading;

  public constructor(
    private readonly apiService: ApiService,
    public readonly styleConfig: StyleConfigService,
    public readonly deviceType: DeviceTypeService
  ) {}

  public ngOnInit() {
    this.apiService
      .newsGet({
        numberNews: this.maxListCount,
        alsoDisabled: false
      })
      .then(news => {
        this.fetchedNews = FetchState.success({
          news: news.news.map(news => News.unflatten(news)),
          hasMore: news.hasMore
        });
      })
      .catch(reason => {
        this.fetchedNews = FetchState.failure(reason);
      });
  }

  public get notDisabledNews(): News[] | undefined {
    if (!FetchState.isSuccess(this.fetchedNews)) {
      return undefined;
    }
    return FetchState.getContent(this.fetchedNews).news.filter(news => !news.disabled);
  }

  public getDateDescription(date: Date): string {
    return Datum.description(Datum.fromDate(date));
  }
}
