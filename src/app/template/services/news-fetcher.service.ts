import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsFetcherService {

  public constructor(
    private readonly firebaseFunctions: AngularFireFunctions
  ) {}

  public fetchNews(numberNews?: number): Promise<{ news: NewsFetcherService.News[], hasMore: boolean }> {
    const callable = this.firebaseFunctions.httpsCallable('getNews')
    return lastValueFrom(callable({
      numberNews
    }))
  }

  public fetchSingleNews(id: string): Promise<NewsFetcherService.News | null> {
    const callable = this.firebaseFunctions.httpsCallable('getSingleNewsById')
    return lastValueFrom(callable({
      newsId: id
    }))
  }
}

export namespace NewsFetcherService {
  export interface News {
    id: string,
    title: string,
    subtitle?: string,
    date: string,
    shortDescription?: string,
    newsUrl: string,
    disabled: boolean,
    thumbnailUrl: string
  }
}
