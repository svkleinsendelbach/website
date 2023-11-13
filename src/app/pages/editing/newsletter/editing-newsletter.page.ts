import { TrackBy } from 'src/app/types/track-by';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { EventGroupId } from 'src/app/types/event';
import { internalLinks } from 'src/app/types/internal-link-path';
import { Newsletter } from 'src/app/types/newletter';
import { FunctionType } from 'src/app/modules/firebase-api/types/function-type';
import { NewsletterGetAllFunctionType } from 'src/app/modules/firebase-api/types/firebase-functions-types';
import { UtcDate } from 'src/app/types/utc-date';

@Component({
    selector: 'app-editing-newsletter',
    templateUrl: './editing-newsletter.page.html',
    styleUrls: ['./editing-newsletter.page.sass']
})
export class EditingNewsletterPage {
    public TrackBy = TrackBy;

    public Month = Newsletter.Month;

    public newsletter: FunctionType.ReturnType<NewsletterGetAllFunctionType> | null = null;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly sharedData: SharedDataService<{
            publishNewsletter: { id: string; date: UtcDate; title: string; description: string; month: Newsletter.Month; year: number };
            editNewsletter: Newsletter;
        }>,
        private readonly router: Router
    ) {
        this.titleService.setTitle('Newsletter bearbeiten');
    }

    public async getNewsletter() {
        this.newsletter = (await this.firebaseApiService.function('newsletter-getAll').call({})).value;
    }

    public async addNewNewsletter() {
        this.sharedData.removeValue('editNewsletter');
        await this.router.navigateByUrl(internalLinks['bearbeiten/newsletter/bearbeiten'].link);
    }

    public async publishNewsletter(newsletter: { id: string; date: UtcDate; title: string; description: string; month: Newsletter.Month; year: number }) {
        this.sharedData.setValue('publishNewsletter', newsletter);
        await this.router.navigateByUrl(internalLinks['bearbeiten/newsletter/veröffentlichen'].link);
    }

    public async editNewsletter(id: string) {
        const newsletter = (await this.firebaseApiService.function('newsletter-get').call({ id: id })).value;
        if (!newsletter)
            return;
        this.sharedData.setValue('editNewsletter', newsletter);
        await this.router.navigateByUrl(internalLinks['bearbeiten/newsletter/bearbeiten'].link);
    }

    public async deleteNewsletter(id: string) {
        if (this.newsletter)
            this.newsletter = this.newsletter.filter(newsletter => newsletter.id !== id);
        await this.firebaseApiService.function('newsletter-edit').call({
            editType: 'remove',
            newsletter: null,
            newsletterId: id
        });
    }
}
