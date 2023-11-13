import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { FirebaseFunctionResult } from 'src/app/modules/firebase-api/types/firebase-function-result';
import { NewsletterGetAllFunctionType } from 'src/app/modules/firebase-api/types/firebase-functions-types';
import { FunctionType } from 'src/app/modules/firebase-api/types/function-type';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { internalLinks } from 'src/app/types/internal-link-path';
import { Link } from 'src/app/types/link';
import { Newsletter } from 'src/app/types/newletter';
import { TrackBy } from 'src/app/types/track-by';

@Component({
    selector: 'app-newsletter-overview',
    templateUrl: './newsletter-overview.page.html',
    styleUrls: ['./newsletter-overview.page.sass']
})
export class NewsletterOverviewPage implements OnInit {
    public TrackBy = TrackBy;

    public Month = Newsletter.Month;

    public subscribeNewsletterLink = internalLinks['newsletter/anmelden'];

    public unsubscribeNewsletterLink = internalLinks['newsletter/abmelden'];

    public fetchedNewsletter: FirebaseFunctionResult<FunctionType.ReturnType<NewsletterGetAllFunctionType>> | null = null;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService
    ) {
        this.titleService.setTitle('Alle Newsletter');
    }

    public async ngOnInit() {
        this.fetchedNewsletter = await this.firebaseApiService.function('newsletter-getAll').call({});
    }

    public newsletterLink(newsletter: { id: string; month: Newsletter.Month; year: number }): Link {
        return Link.internalParam(`${Newsletter.Month.title[newsletter.month]}-${newsletter.year}`, 'newsletter', newsletter.id);
    }
}
