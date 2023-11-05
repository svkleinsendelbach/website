import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'app-newsletter-unsubscribe-with-id',
    templateUrl: './newsletter-unsubscribe-with-id.page.html',
    styleUrls: ['./newsletter-unsubscribe-with-id.page.sass']
})
export class NewsletterUnsubscribeWithIdPage implements OnInit {
    public state: 'loading' | 'no-id' | 'failed' | 'success' = 'loading';

    public constructor(
        public readonly titleService: Title,
        public readonly route: ActivatedRoute,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService
    ) {
        this.titleService.setTitle('Newsletter Abmeldung');
    }

    public async ngOnInit() {
        const params = await firstValueFrom(this.route.params);
        if (!('id' in params) || typeof params['id'] !== 'string') {
            this.state = 'no-id';
            return;
        }
        const result = await this.firebaseApiService.function('newsletter-subscription-unsubscribe').call({
            id: params['id'],
            email: null
        });
        if (result.isSuccess())
            this.state = 'success';
        else
            this.state = 'failed';
    }
}
