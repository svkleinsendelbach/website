import { Injectable } from '@angular/core';

export interface News {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  shortDescription?: string;
  newsUrl: string;
  disabled: boolean;
  thumbnailUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedNewsEditService {
  private _newsForEdit: News | undefined = undefined;

  constructor() {}

  public set news(news: News | undefined) {
    this._newsForEdit = news;
  }

  public get news(): News | undefined {
    const news = this._newsForEdit;
    this._newsForEdit = undefined;
    return news;
  }
}
