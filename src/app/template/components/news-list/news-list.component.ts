import { Component, Input, OnInit } from '@angular/core';
import { FetchState } from '../../classes/fetch-state';
import { FullDatum } from '../../classes/full-datum';
import { DeviceTypeService } from '../../services/device-type.service';
import { NewsFetcherService } from '../../services/news-fetcher.service';
import { StyleConfigService } from '../../services/style-config.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass']
})
export class NewsListComponent implements OnInit {
  public FetchState = FetchState

  @Input() public maxListCount?: number

  public fetchedNews: FetchState<{ news: NewsFetcherService.News[], hasMore: boolean }> = FetchState.loading

  public constructor(
    private readonly newsFetcher: NewsFetcherService,
    public readonly styleConfig: StyleConfigService,
    public readonly deviceType: DeviceTypeService
  ) {}

  public ngOnInit() {
    this.newsFetcher.fetchNews(this.maxListCount)
      .then(news => {
        this.fetchedNews = FetchState.success(news)
      })
      .catch(reason => {
        this.fetchedNews = FetchState.failure(reason)
      })
  }

  public get notDisabledNews(): NewsFetcherService.News[] | undefined {
    if (!FetchState.isSuccess(this.fetchedNews)) {
      return undefined
    }
    return FetchState.getContent(this.fetchedNews).news.filter(news => !news.disabled)
  }

  public getDateDescription(date: string): string {
    return FullDatum.description(FullDatum.fromDate(new Date(date)))
  }
}
