import { Component } from '@angular/core';
import { AuthenticationCheckComponent, AuthenticationService, ButtonComponent, FirebaseApiService, LinkService, NavigationBarComponent, NavigationBarData, OverviewListComponent, OverviewListData, Result, ResultDisplayComponent, SharedDataService, TextSectionComponent, TrackBy, UtcDate } from 'kleinsendelbach-website-library';
import { InternalPathKey } from '../../../../types/internal-paths';
import { Title } from '@angular/platform-browser';
import { FirebaseFunctions } from '../../../../types/firebase-functions';
import { UserRole } from '../../../../types/user-role';
import { Newsletter } from '../../../../types/newsletter';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'editing-newsletter-overview-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, NavigationBarComponent, AuthenticationCheckComponent, ResultDisplayComponent, ButtonComponent, OverviewListComponent],
    templateUrl: './newsletter-overview.page.html',
    styleUrl: './newsletter-overview.page.sass'
})
export class NewsletterOverviewPage {

    public TrackBy = TrackBy;

    public navigationBarData: NavigationBarData<InternalPathKey> = [
        {
            text: 'Zurück',
            alignment: 'left',
            link: 'editing/main',
            action: null
        },
        {
            text: 'Abmelden',
            alignment: 'right',
            link: 'editing/login',
            action: async () => void this.authenticationService.logout()
        }
    ];

    public newsletterResult: Result<Newsletter.Overview[]> | null = null;

    public editNewsletterLoading: boolean = false;

    constructor(
        private readonly titleService: Title,
        private readonly authenticationService: AuthenticationService<UserRole>,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly linkService: LinkService<InternalPathKey>,
        private readonly sharedData: SharedDataService<{
            publishNewsletter: Newsletter.Overview.Flatten;
            editNewsletter: Newsletter.Flatten;
        }>,
    ) {
        this.titleService.setTitle('Newsletter');
    }

    public async getNewsletter() {
        this.newsletterResult = await this.firebaseApi.function('newsletter-getAll').call({});
    }

    public clearSharedData() {
        this.sharedData.removeValue('publishNewsletter');
        this.sharedData.removeValue('editNewsletter');
    }

    public newsletterOverviewListData(newsletter: Newsletter.Overview[]): OverviewListData<InternalPathKey> {
        return newsletter.map(newsletter => ({
            title: `${newsletter.title} | ${newsletter.date.description}`,
            subtitle: `${Newsletter.Month.title[newsletter.month]} ${newsletter.year}`,
            buttons: [
                ...(newsletter.alreadyPublished ? [] : [{
                    title: 'Veröffentlichen',
                    action: () => void this.publishNewsletter(newsletter),
                    link: null,
                    options: null
                }]),
                {
                    title: 'Bearbeiten',
                    action: () => void this.editNewsletter(newsletter),
                    link: null,
                    options: this.editNewsletterLoading ? 'disabled' : null
                },
                {
                    title: 'Löschen',
                    action: () => void this.deleteNewsletter(newsletter),
                    link: null,
                    options: null
                }
            ]
        }));
    }

    public async publishNewsletter(newsletter: Newsletter.Overview) {
        this.sharedData.setValue('publishNewsletter', Newsletter.Overview.flatten(newsletter));
        await this.linkService.navigate('editing/newsletter/publish');
    }

    public async editNewsletter(newsletter: Newsletter.Overview) {
        this.editNewsletterLoading = true;
        const completeNewsletter = (await this.firebaseApi.function('newsletter-get').call({ id: newsletter.id })).value;
        this.editNewsletterLoading = false;
        if (!completeNewsletter)
            return;
        this.sharedData.setValue('editNewsletter', Newsletter.flatten(completeNewsletter));
        await this.linkService.navigate('editing/newsletter/edit');
    }

    public async deleteNewsletter(newsletter: Newsletter.Overview) {
        if (!this.newsletterResult || this.newsletterResult.isFailure())
            return;
        this.newsletterResult = Result.success(this.newsletterResult.value.filter(_newsletter => _newsletter.id !== newsletter.id));
        await this.firebaseApi.function('newsletter-edit').call({
            editType: 'remove',
            newsletter: null,
            newsletterId: newsletter.id
        });
    }
}
