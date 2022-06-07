import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';
import { News } from '../shared-data/shared-news-edit.service';

@Injectable({
  providedIn: 'root',
})
export class NewsFetcherService {
  constructor(private fns: AngularFireFunctions) {}

  getNews(numberNews?: number): Promise<{ news: News[]; hasMore: boolean }> {
    const callable = this.fns.httpsCallable<{ numberNews: number | undefined }, { news: News[]; hasMore: boolean }>(
      'getNews',
    );
    return lastValueFrom(callable({ numberNews }));
  }

  getSingleNews(id: string): Promise<News | null> {
    const callable = this.fns.httpsCallable<{ newsId: string }, News | null>('getSingleNewsById');
    return lastValueFrom(callable({ newsId: id }));
  }
}
