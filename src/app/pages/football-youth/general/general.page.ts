import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TextSectionComponent, LinksComponent, EventsComponent, ReportsComponent, ContactsComponent, LinkDirective, LinksData, ContactsData, EventGroup, ReportGroup, Link } from 'kleinsendelbach-website-library';
import { InternalPathKey } from '../../../types/internal-paths';
import { contact } from '../../../config/contacts.config';

@Component({
    selector: 'football-youth-page',
    standalone: true,
    imports: [TextSectionComponent, LinksComponent, EventsComponent, ReportsComponent, ContactsComponent, LinkDirective],
    templateUrl: './general.page.html',
    styleUrl: './general.page.sass'
})
export class FootballYouthGeneralPage {

    public linksData: LinksData<InternalPathKey> = [
        {
            link: 'football-youth/a-youth',
            icon: null,
            title: 'A-Jugend',
            subtitle: 'A-Jugend der SG Schwabachtal'
        },
        {
            link: 'football-youth/b-youth',
            icon: null,
            title: 'B-Jugend',
            subtitle: 'B-Jugend der SG Schwabachtal'
        },
        {
            link: 'football-youth/c-youth',
            icon: null,
            title: 'C-Jugend',
            subtitle: 'C-Jugend der SG Schwabachtal'
        },
        {
            link: 'football-youth/d-youth',
            icon: null,
            title: 'D-Jugend',
            subtitle: 'D-Jugend der SG Schwabachtal'
        },
        {
            link: 'football-youth/e-youth',
            icon: null,
            title: 'E-Jugend',
            subtitle: 'E-Jugend des SV Kleinsendelbach'
        },
        {
            link: 'football-youth/f-youth',
            icon: null,
            title: 'F-Jugend',
            subtitle: 'F-Jugend des SV Kleinsendelbach'
        },
        {
            link: 'football-youth/g-youth',
            icon: null,
            title: 'G-Jugend',
            subtitle: 'G-Jugend des SV Kleinsendelbach'
        }
    ]

    public contactsData: ContactsData = [
        contact('Jugendleiter Großfeld', 'tim-kellermann'),
        contact('Jugendleiter Kleinfeld', 'matthias-iberl'),
        contact('Jugendleiter Kleinfeld', 'stefan-seubert')
    ]

    public eventGroups: EventGroup<never>[] = []; // TODO

    public eventGroupTitle: Record<never, string> = {}; // TODO

    public getCalendarSubscriptionLink: (eventGroupIds: never[]) => string = () => ''; // TODO

    public reportGroups: ReportGroup<never>[] = []; // TODO

    public reportGroupTitle: Record<never, string> = {}; // TODO

    constructor(
        private readonly titleService: Title,
    ) {
        this.titleService.setTitle('Jugendfußball')
    }
}
