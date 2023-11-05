import { Component, OnInit } from '@angular/core';
import { Newsletter } from 'src/app/types/newletter';
import { FirebaseFunctionResult } from '../firebase-api/types/firebase-function-result';
import { FirebaseApiService } from '../firebase-api/services/firebase-api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.newsletter.component.html',
    styleUrls: ['./app.newsletter.component.sass']
})
export class AppNewsletterComponent implements OnInit {
    public fetchedNewsletter: FirebaseFunctionResult<Newsletter | null> | null = null;

    public newsletterId = '2023-November';

    public constructor(
        private readonly firebaseApi: FirebaseApiService
    ) {}

    public async ngOnInit() {
        this.fetchedNewsletter = await this.firebaseApi.function('newsletter-get').call({
            id: this.newsletterId
        });
    }
}
