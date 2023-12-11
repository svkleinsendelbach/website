import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ContactsComponent, ContactsData, Link, LinksComponent, LinksData, TextSectionComponent } from 'kleinsendelbach-website-library';
import { InternalPathKey } from '../../../types/internal-paths';

@Component({
    selector: 'managers-page',
    standalone: true,
    imports: [TextSectionComponent, ContactsComponent, LinksComponent],
    templateUrl: './managers.page.html',
    styleUrl: './managers.page.sass'
})
export class ManagersPage {

    public managers: ContactsData = [
        {
            function: '1. Vorsitzender',
            name: 'n.a.',
            profileImageSrc: null,
            phone: null,
            mobile: null,
            email: null
        },
        {
            function: '2. Vorsitzender',
            name: 'Sebastian Schuldes',
            profileImageSrc: null,
            phone: null,
            mobile: null,
            email: null
        },
        {
            function: '3. Vorsitzender',
            name: 'Josef Hoier',
            profileImageSrc: null,
            phone: null,
            mobile: null,
            email: null
        }
    ];

    public linksData: LinksData<InternalPathKey> = [
        {
            link: 'sportshome',
            icon: null,
            title: 'Sportheim',
            subtitle: 'Öffnungszeiten des Sportheims in Kleinsendelbach'
        },
        {
            link: Link.external('Onlineshop', 'https://sv-kleinsendelbach.fan12.de'),
            icon: null,
            title: 'Onlineshop',
            subtitle: 'Besuchen Sie unseren Onlineshop'
        },
        {
            link: 'chronicle',
            icon: null,
            title: 'Chronik',
            subtitle: 'Chronik des Sportverein Kleinsendelbach'
        },
        {
            link: 'statute',
            icon: null,
            title: 'Satzung',
            subtitle: 'Satzung des SV Kleinsendelbach e.V.'
        },
        {
            link: 'sponsors',
            icon: null,
            title: 'Unsere Sponsoren',
            subtitle: 'Die Sponsoren des SV Kleinsendelbach'
        },
        {
            link: 'privacy',
            icon: null,
            title: 'Datenschutz',
            subtitle: 'Datenschutzerklärung des Sportverein Kleinsendelbach'
        },
        {
            link: 'request',
            icon: null,
            title: 'Mitgliedsantrag',
            subtitle: 'Jetzt Mitglied werden'
        }
    ]

    constructor(
        private readonly titleService: Title
    ) {
        this.titleService.setTitle('Vorstandschaft')
    }
}
