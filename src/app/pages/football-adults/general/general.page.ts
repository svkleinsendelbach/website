import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ContactsComponent, EventsComponent, EventGroup, LinksComponent, LinksData, ReportsComponent, ReportGroup, TextSectionComponent, ContactsData, LinkDirective } from 'kleinsendelbach-website-library';
import { InternalPathKey } from '../../../types/internal-paths';
import { contact } from '../../../config/contacts.config';

@Component({
    selector: 'football-adults-page',
    standalone: true,
    imports: [TextSectionComponent, LinksComponent, EventsComponent, ReportsComponent, ContactsComponent, LinkDirective],
    templateUrl: './general.page.html',
    styleUrl: './general.page.sass'
})
export class FootballAdultsGeneralPage {

    public linksData: LinksData<InternalPathKey> = [
        {
            link: 'football-adults/first-team',
            icon: null,
            title: '1. Mannschaft',
            subtitle: '1. Mannschaft der SG Kleinsendelbach / Hetzles'
        },
        {
            link: 'football-adults/second-team',
            icon: null,
            title: '2. Mannschaft',
            subtitle: '2. Mannschaft der SG Kleinsendelbach / Hetzles'
        },
        {
            link: 'football-adults/ah-team',
            icon: null,
            title: 'Alte Herren',
            subtitle: 'Alte Herren des SV Kleinsendelbach'
        }
    ]

    public contactsData: ContactsData = [
        contact('Abteilungsleiter', 'josef-hoier')
    ]

    public eventGroups: EventGroup<never>[] = []; // TODO

    public eventGroupTitle: Record<never, string> = {}; // TODO

    public getCalendarSubscriptionLink: (eventGroupIds: never[]) => string = () => ''; // TODO

    public reportGroups: ReportGroup<never>[] = []; // TODO

    public reportGroupTitle: Record<never, string> = {}; // TODO

    constructor(
        private readonly titleService: Title,
    ) {
        this.titleService.setTitle('Herrenfußball')
    }
}
