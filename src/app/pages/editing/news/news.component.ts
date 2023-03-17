import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InternalLink } from 'src/app/types/InternalPath';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { SharedDataService } from 'src/app/template/services/shared-data.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { News } from 'src/app/modules/firebase-api/types/news';
import { FirebaseFunctions } from 'src/app/modules/firebase-api/firebase-functions';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.sass']
})
export class NewsComponent {
    public logInPageLink = InternalLink.all['bearbeiten/anmelden'];
    public mainEditingPageLink = InternalLink.all['bearbeiten'];

    public allNews: News.Flatten[] | undefined = undefined;

    public currentDisableUpdatedNewsIds: Record<string, true> = {};

    public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    private readonly firebaseApiService: FirebaseApiService<FirebaseFunctions>,
    private readonly sharedData: SharedDataService<{
      editNews: News.Flatten;
    }>,
    private router: Router
    ) {
        this.titleService.setTitle('Nachrichten bearbeiten');
        this.getNews();
    }

    private async getNews() {
        this.allNews = (await this.firebaseApiService.function('news').function('get').call({
            numberNews: undefined,
            alsoDisabled: true
        })).news;
    }

    public async deleteNews(id: string) {
        this.allNews = this.allNews?.filter(news => news.id !== id);
        await this.firebaseApiService.function('news').function('edit').call({
            editType: 'remove',
            newsId: id,
            news: undefined
        });
    }

    public async editNews(news: News.Flatten) {
        this.sharedData.setValue('editNews', news);
        await this.router.navigateByUrl(InternalLink.all['bearbeiten/nachrichten/bearbeiten'].link);
    }

    public async handleDisableNews(news: News.Flatten) {
        if (news.id in this.currentDisableUpdatedNewsIds)
            return;
        this.currentDisableUpdatedNewsIds[news.id] = true;
        await this.firebaseApiService.function('news').function('disable').call({
            editType: news.disabled ? 'enable' : 'disable',
            newsId: news.id
        });
        news.disabled = !news.disabled;
        delete this.currentDisableUpdatedNewsIds[news.id];
    }

    public async addNewNews() {
        this.sharedData.removeValue('editNews');
        await this.router.navigateByUrl(InternalLink.all['bearbeiten/nachrichten/bearbeiten'].link);
    }
}
