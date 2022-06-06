import { Component, Input } from '@angular/core';
import { FullDatum } from 'src/app/services/api/fetch-home-top.service';
import { NewsFetcherService } from '../../services/api/news-fetcher.service';
import { News } from '../../services/shared-data/shared-news-edit.service';
import { DeviceTypeService } from '../../services/device-type.service';

  export type FetchState<Content, Failure = Error> =
    | FetchState.Loading
    | FetchState.Success<Content>
    | FetchState.Failure<Failure>;

namespace FetchState {
  export interface Loading {
    state: 'loading';
  }

  export interface Success<Content> {
    state: 'success';
    content: Content;
  }

  export interface Failure<Failure = Error> {
    state: 'failure';
    error: Failure;
  }

  export const loading: FetchState.Loading = {
    state: 'loading',
  }

  export function success<Content>(content: Content): FetchState.Success<Content> {
    return {
      state: 'success',
      content: content,
    };
  }

  export function failure<Failure = Error>(error: Failure): FetchState.Failure<Failure> {
    return {
      state: 'failure',
      error: error,
    };
  }

  export function isLoading<Content, Failure = Error>(
    state: FetchState<Content, Failure>
  ): state is FetchState.Loading {
    return state.state === 'loading';
  }

  export function isSuccess<Content, Failure = Error>(
    state: FetchState<Content, Failure>,
  ): state is FetchState.Success<Content> {
    return state.state === 'success';
  }

  export function isFailure<Content, Failure = Error>(
    state: FetchState<Content, Failure>,
  ): state is FetchState.Failure<Failure> {
    return state.state === 'failure';
  }

  export function getContent(state: FetchState.Loading): undefined;
  export function getContent<Content>(state: FetchState.Success<Content>): Content;
  export function getContent<Failure = Error>(state: FetchState.Failure<Failure>): undefined;
  export function getContent<Content, Failure = Error>(state: FetchState<Content, Failure>): Content | undefined;
  export function getContent<Content, Failure = Error>(state: FetchState<Content, Failure>): Content | undefined {
    if (FetchState.isSuccess(state)) return state.content;
    return undefined;
  }

  export function getError(state: FetchState.Loading): undefined;
  export function getError<Content>(state: FetchState.Success<Content>): undefined;
  export function getError<Failure = Error>(state: FetchState.Failure<Failure>): Failure;
  export function getError<Content, Failure = Error>(state: FetchState<Content, Failure>): Failure | undefined;
  export function getError<Content, Failure = Error>(state: FetchState<Content, Failure>): Failure | undefined {
    if (FetchState.isFailure(state)) return state.error;
    return undefined;
  }
}

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

  public newsUrl(id: string): string {
    return id.replace(/_/g, '-');
  }
}
