import { ButtonComponent, DeviceTypeService, FirebaseApiService, LinkService, OverviewListComponent, OverviewListData, Result, ResultDisplayComponent, TextSectionComponent } from 'kleinsendelbach-website-library';
import { Component } from '@angular/core';
import { Newsletter } from '../../../types/newsletter';
import { Title } from '@angular/platform-browser';
import { FirebaseFunctions } from '../../../types/firebase-functions';
import { CommonModule } from '@angular/common';
import { InternalPathKey } from '../../../types/internal-paths';

@Component({
    selector: 'newsletter-overview-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, OverviewListComponent, ResultDisplayComponent, ButtonComponent],
    templateUrl: './newsletter-overview.page.html',
    styleUrl: './newsletter-overview.page.sass'
})
export class NewsletterOverviewPage {

    public newsletterResult: Result<Newsletter.Overview[]> | null = null

    constructor(
        private readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly linkService: LinkService<InternalPathKey>
    ) {
        this.titleService.setTitle('Newsletter');
        void this.fetchNewsletter();
    }

    private async fetchNewsletter() {
        this.newsletterResult = await this.firebaseApi.function('newsletter-getAll').call({});
        if (this.newsletterResult.isSuccess())
            this.newsletterResult = Result.success(this.newsletterResult.value.filter(newsletter => newsletter.alreadyPublished));
    }

    public newsletterOverviewListData(newsletter: Newsletter.Overview[]): OverviewListData<InternalPathKey> {
        return newsletter.map(newsletter => ({
            title: `${newsletter.title} | ${Newsletter.Month.title[newsletter.month]} ${newsletter.year}`,
            subtitle: newsletter.description,
            buttons: [{
                title: 'Anzeigen',
                action: null,
                link: this.linkService.paramLink('newsletter/:id', { id: newsletter.id }),
                options: null
            }]
        }));
    }
}
