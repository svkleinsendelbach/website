import { Component, Input } from '@angular/core';
import { FullDatum } from 'src/app/services/api/fetch-home-top.service';
import { NewsFetcherService } from '../../services/api/news-fetcher.service';
import { News } from '../../services/shared-data/shared-news-edit.service';
import { DeviceTypeService } from '../../services/device-type.service';
import { FetchState } from 'src/app/classes/FetchState';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass'],
})
export class NewsListComponent {
  public FetchState = FetchState;

  @Input() public maxListCount?: number;

  public fetchState: FetchState<{ news: News[], hasMore: boolean }, any> = FetchState.loading;

  constructor(private newsFetcher: NewsFetcherService, public deviceType: DeviceTypeService) {
    this.fetchNews();
  }

  public fetchNews() {
    this.fetchState = FetchState.loading;
    this.newsFetcher
      .getNews(this.maxListCount)
      .then(news => {
        this.fetchState = FetchState.success(news);
      })
      .catch(error => {
        this.fetchState = FetchState.failure(error);
      });
  }

  public notDisabledNews(state: FetchState.Success<{ news: News[], hasMore: boolean }>): News[] {
    return FetchState.getContent(state).news.filter(news => !news.disabled);
  }

  public date(isoDate: string): string {
    const date = FullDatum.fromDate(new Date(isoDate));
    return FullDatum.description(date);
  }
}
