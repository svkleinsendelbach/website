import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService, FirebaseApiService, NavigationBarComponent, NavigationBarData, NewsletterComponent, NewsletterData, Result, ResultDisplayComponent, TextSectionComponent, LinkService } from 'kleinsendelbach-website-library';
import { FirebaseFunctions } from '../../../types/firebase-functions';
import { Newsletter } from '../../../types/newsletter';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { InternalPathKey } from '../../../types/internal-paths';

@Component({
    selector: 'newsletter-page',
    standalone: true,
    imports: [CommonModule, ResultDisplayComponent, TextSectionComponent, NewsletterComponent, NavigationBarComponent],
    templateUrl: './newsletter.page.html',
    styleUrl: './newsletter.page.sass'
})
export class NewsletterPage {

    public navigationBarData: NavigationBarData<InternalPathKey> = [
        {
            text: 'Zurück',
            alignment: 'left',
            link: 'newsletter',
            action: null
        }
    ];

    public newsletterResult: Result<Newsletter | null> | null = null

    constructor(
        private readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly route: ActivatedRoute,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly linkService: LinkService<InternalPathKey>
    ) {
        this.titleService.setTitle('Newsletter');
        void this.fetchNewsletter();
    }

    private async fetchNewsletter() {
        const params = await firstValueFrom(this.route.params);
        if (!('id' in params) || typeof params['id'] !== 'string') {
            this.newsletterResult = Result.success(null);
            return;
        }
        this.newsletterResult = await this.firebaseApi.function('newsletter-get').call({
            id: params['id']
        });
        if (this.newsletterResult && this.newsletterResult.isSuccess() && this.newsletterResult.value)
            this.titleService.setTitle(this.title(this.newsletterResult.value));
    }

    public title(newsletter: Newsletter): string {
        return `${newsletter.titlePage.title} | ${Newsletter.Month.title[newsletter.titlePage.month]} ${newsletter.titlePage.year}`
    }

    public newsletterData(newsletter: Newsletter): NewsletterData {
        return Newsletter.newsletterData(newsletter, false, this.linkService);
    }
}
