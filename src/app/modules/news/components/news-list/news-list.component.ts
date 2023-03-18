import { Component, Input, OnInit } from '@angular/core';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { News } from 'src/app/modules/firebase-api/types/news';
import { FetchState } from 'src/app/types/fetch-state';
import { Datum } from 'src/app/types/datum';
import { Link } from 'src/app/types/link';
import { DeviceTypeService } from '../../../../services/device-type.service';
import { StyleConfigService } from '../../../../services/style-config.service';

@Component({
    selector: 'news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.sass']
})
export class NewsListComponent implements OnInit {
    public Datum = Datum;

    @Input() public maxListCount?: number;

    @Input() public allNewsLink!: Link;

    @Input() public newsLink!: (news: News) => Link;

    public fetchedNews: FetchState<{ news: News[]; hasMore: boolean }> = FetchState.loading;

    public constructor(
        private readonly firebaseApiService: FirebaseApiService,
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {}

    public ngOnInit() {
        this.firebaseApiService.function('news').function('get').call({
            numberNews: this.maxListCount,
            alsoDisabled: false
        }).then(news => {
            this.fetchedNews = FetchState.success({
                news: news.news.map(news => News.concrete(news)),
                hasMore: news.hasMore
            });
        }).catch(reason => {
            this.fetchedNews = FetchState.failure(reason);
        });
    }

    public get notDisabledNews(): News[] | undefined {
        if (!this.fetchedNews.isSuccess()) {
            return undefined;
        }
        return this.fetchedNews.content.news.filter(news => !news.disabled);
    }
}
