import { FirebaseFunctionError } from './../../../modules/firebase-api/types/firebase-function-result';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Newsletter } from 'src/app/types/newletter';
import { Result } from 'src/app/types/result';

type FetchNewsletterResult = Result<Newsletter, FirebaseFunctionError | 'no-id' | 'not-found'>;

@Component({
    selector: 'app-newsletter-page',
    templateUrl: './newsletter.page.html',
    styleUrls: ['./newsletter.page.sass']
})
export class NewsletterPage implements OnInit {
    public fetchedNewsletter: FetchNewsletterResult | null = null;

    public constructor(
        public readonly titleService: Title,
        public readonly route: ActivatedRoute,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService
    ) {
        this.titleService.setTitle('Newsletter');
    }

    public async ngOnInit() {
        const params = await firstValueFrom(this.route.params);
        if (!('id' in params) || typeof params['id'] !== 'string') {
            this.fetchedNewsletter = Result.failure('no-id');
            return;
        }
        this.fetchedNewsletter = (await this.firebaseApiService.function('newsletter-get').call({
            id: params['id']
        })).mapResult<FetchNewsletterResult>(newsletter => {
            if (newsletter === null)
                return Result.failure('not-found');
            return Result.success(newsletter);
        }, error => Result.failure(error));
        if (this.fetchedNewsletter.isSuccess())
            this.titleService.setTitle(this.title);
    }

    public get title(): string {
        if (this.fetchedNewsletter && this.fetchedNewsletter.isSuccess())
            return `Newsletter ${Newsletter.Month.title[this.fetchedNewsletter.value.titlePage.month]} ${this.fetchedNewsletter.value.titlePage.year}`;
        return 'Newsletter';
    }
}
