import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WebsiteEditorAuthService } from 'src/app/services/api/website-editor-auth.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import { NewsFetcherService } from '../../../services/api/news-fetcher.service';
import { News } from 'src/app/services/shared-data/shared-news-edit.service';
import { Router } from '@angular/router';
import { SharedNewsEditService } from '../../../services/shared-data/shared-news-edit.service';
import { DeviceTypeService } from '../../../services/device-type.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass'],
})
export class NewsComponent {
  public news?: News[];

  constructor(
    private titleService: Title,
    private headerIntransparentService: HeaderIntransparentService,
    public authService: WebsiteEditorAuthService,
    private newsFetcher: NewsFetcherService,
    private router: Router,
    private sharedNewsEdit: SharedNewsEditService,
    public deviceType: DeviceTypeService
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('Nachrichten Bearbeiten');
    this.authService.checkLogInOrNavigateToLogInPage();
    this.newsFetcher.getNews().then(n => (this.news = n));
  }

  public editNews(news: News) {
    this.sharedNewsEdit.news = news;
    this.router.navigateByUrl('/bearbeiten/nachrichten/bearbeiten');
  }

  public addNewNews() {
    this.sharedNewsEdit.news = undefined;
    this.router.navigateByUrl('/bearbeiten/nachrichten/bearbeiten');
  }
}
