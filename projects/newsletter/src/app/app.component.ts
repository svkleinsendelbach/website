import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentService, FirebaseApiService, LinkService, StyleConfigService, DeviceTypeService, Result, TextSectionComponent, NewsletterComponent, ResultDisplayComponent, NewsletterData } from 'kleinsendelbach-website-library';
import { baseUrl, colorConfig } from '../../../../src/app/config/setup.config';
import { environment } from '../../../../src/app/environment/environment';
import { Environment } from '../../../../src/app/types/environment';
import { FirebaseFunctions, firebaseFunctionResultMappers } from '../../../../src/app/types/firebase-functions';
import { InternalPathKey, internalPaths } from '../../../../src/app/types/internal-paths';
import { Newsletter } from '../../../../src/app/types/newsletter';

@Component({
    selector: 'newsletter-root',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, NewsletterComponent, ResultDisplayComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass'
})
export class AppComponent {

    public newsletterResult: Result<Newsletter | null> | null = null;

    constructor(
        private readonly environmentService: EnvironmentService<Environment>,
        private readonly firebaseApiService: FirebaseApiService<FirebaseFunctions>,
        private readonly linkService: LinkService<InternalPathKey>,
        private readonly styleConfigService: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {
        this.environmentService.setup(environment);
        this.firebaseApiService.setup(firebaseFunctionResultMappers);
        this.linkService.setup(internalPaths, baseUrl);
        this.styleConfigService.setup(colorConfig);
        void this.fetchNewsletter();
    }

    private async fetchNewsletter() {
        this.newsletterResult = await this.firebaseApiService.function('newsletter-get').call({
            id: '2023-dezember'
        });
    }

    public newsletterData(newsletter: Newsletter): NewsletterData {
        return Newsletter.newsletterData(newsletter, true, this.linkService);
    }
}
