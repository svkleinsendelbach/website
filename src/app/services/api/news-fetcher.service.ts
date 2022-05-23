import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';
import { News } from '../shared-data/shared-news-edit.service';

@Injectable({
  providedIn: 'root',
})
export class NewsFetcherService {
  constructor(private fns: AngularFireFunctions) {}

  getNews(numberNews?: number): Promise<News[]> {
    const callable = this.fns.httpsCallable<{ numberNews: number | undefined }, News[]>('getNews');
    return lastValueFrom(callable({ numberNews }));
  }
}
