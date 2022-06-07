import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';
import { NewsFetcherService } from '../../services/api/news-fetcher.service';
import { FetchState } from '../../classes/FetchState';
import { News } from 'src/app/services/shared-data/shared-news-edit.service';
import { StorageFilesManagerService } from '../../services/api/storage-files-manager.service';
import { FullDatum } from 'src/app/services/api/fetch-home-top.service';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.sass'],
})
export class NewsDetailComponent {
    public FetchState = FetchState;

    public fetchState: FetchState<{ news: News; message: string }, any> = FetchState.loading;

    constructor(
        private headerIntransparentService: HeaderIntransparentService,
        private titleService: Title,
        public deviceType: DeviceTypeService,
        private newsFetcher: NewsFetcherService,
        private route: ActivatedRoute,
        private router: Router,
        private storageFilesManager: StorageFilesManagerService,
    ) {
        this.headerIntransparentService.makeIntransparent();
        this.titleService.setTitle('Nachricht');
        this.fetchNews().catch(error => (this.fetchState = FetchState.failure(error)));
    }

    async fetchNews() {
        const newsId = this.route.snapshot.paramMap.get('id');
        if (newsId === null) {
            this.router.navigateByUrl('/nachrichten');
            return;
        }
        const news = await this.newsFetcher.getSingleNews(newsId);
        if (news === null) {
            this.router.navigateByUrl('/nachrichten');
            return;
        }
        this.titleService.setTitle(news.title);
        const message = await this.storageFilesManager.download(news.newsUrl);
        this.fetchState = FetchState.success({ news, message });
    }

    public date(isoDate: string): string {
        const date = FullDatum.fromDate(new Date(isoDate));
        return FullDatum.description(date);
    }
}
