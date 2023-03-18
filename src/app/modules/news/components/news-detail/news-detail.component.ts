import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileStorageService } from 'src/app/modules/firebase-api/services/file-storage.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { News } from 'src/app/modules/firebase-api/types/news';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Datum } from 'src/app/types/datum';
import { FetchState } from 'src/app/types/fetch-state';
import { InternalLink } from 'src/app/types/InternalPath';

@Component({
    selector: 'news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.sass']
})
export class NewsDetailComponent implements OnInit {
    public Datum = Datum;

    @Input() newsId!: string;

    public fetchedNews: FetchState<News> = FetchState.loading;

    @ViewChild('message') public messageElement!: ElementRef<HTMLElement>;

    public constructor(
        private readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly fileStorage: FileStorageService,
        private router: Router
    ) {}

    public ngOnInit() {
        this.getNews();
    }

    private async getNews() {
        const news = await this.firebaseApiService.function('news').function('getSingle').call({
            newsId: this.newsId
        });
        if (news === null) {
            await this.router.navigateByUrl(InternalLink.all['nachrichten'].link);
            return;
        }
        this.titleService.setTitle(news.title);
        this.fetchedNews = FetchState.success(News.concrete(news));
        const message = await this.fileStorage.download(news.newsUrl);
        this.messageElement.nativeElement.innerHTML = message;
    }
}
