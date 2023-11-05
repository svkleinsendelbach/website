import { compactMap, recordEntries } from '../../../../types/record-array';
import { TrackBy } from 'src/app/types/track-by';
import { Component, Input } from '@angular/core';
import { Newsletter } from 'src/app/types/newletter';
import { recordValues } from 'src/app/types/record-array';
import { EventGroupId } from 'src/app/types/event';
import { UtcDate } from 'src/app/types/utc-date';
import { sponsorsConfig } from 'src/app/config/sponsors-config';
import { Sponsor, Sponsors } from 'src/app/types/sponsors';
import { Link } from 'src/app/types/link';

interface SocialMediaItem {
    image: string;
    name: string;
    title: string;
    link: string;
    displayLink: string;
}

@Component({
    selector: 'app-newsletter',
    styleUrls: ['./newsletter.component.sass'],
    templateUrl: './newsletter.component.html'
})
export class NewsletterComponent { // TODO: Abmelden
    public TrackBy = TrackBy;

    public Month = Newsletter.Month;

    public Department = Newsletter.Department;

    public EventGroup = EventGroupId;

    @Input() public newsletter!: Newsletter;

    @Input() public scaling: 'newsletter' | 'website' = 'newsletter';

    public socialMediaItems: SocialMediaItem[] = [
        {
            image: 'assets/images/svk-logo-dark.png',
            name: 'Website',
            title: 'SV Kleinsendelbach e.V.',
            link: 'https://www.svkleinsendelbach.de',
            displayLink: 'svkleinsendelbach.de'
        },
        {
            image: 'assets/images/facebook-logo.png',
            name: 'Facebook',
            title: 'SV Kleinsendelbach e.V.',
            link: 'https://www.facebook.com/svkleinsendelbach',
            displayLink: 'facebook.com/svkleinsendelbach'
        },
        {
            image: 'assets/images/discord-logo.png',
            name: 'Discord',
            title: 'SV Kleinsendelbach e.V.',
            link: 'https://www.discord.gg/gpJMrajz7q',
            displayLink: 'discord.gg/gpJMrajz7q'
        },
        {
            image: 'assets/images/instagram-logo.png',
            name: 'Instagram',
            title: 'SG Kleinsendelbach / Hetzles',
            link: 'https://www.instagram.com/svkleinsendelbach',
            displayLink: 'instagram.com/svkleinsendelbach'
        },
        {
            image: 'assets/images/sg-logo.png',
            name: 'Website der SG',
            title: 'SG Kleinsendelbach / Hetzles',
            link: 'https://www.sg-kh.de',
            displayLink: 'sg-kh.de'
        }
    ];

    public get existsDepartmentsContent(): boolean {
        return recordValues(this.newsletter.departments)
            .some(department => department !== null);
    }

    public get departments(): {
        id: Newsletter.Department;
        content: {
            title: string;
            description: string;
        }[];
    }[] {
        return compactMap(recordEntries(this.newsletter.departments), department => {
            if (department.value === null)
                return null;
            return {
                id: department.key,
                content: department.value
            };
        });
    }

    public get existsEventsContent(): boolean {
        return recordValues(this.newsletter.events)
            .some(eventGroup => eventGroup !== null);
    }

    public get eventGroups(): {
        groupId: EventGroupId;
        events: {
            date: UtcDate;
            title: string;
            subtitle: string | null;
        }[];
    }[] {
        return compactMap(recordEntries(this.newsletter.events), eventGroup => {
            if (eventGroup.value === null)
                return null;
            return {
                groupId: eventGroup.key,
                events: eventGroup.value
            };
        });
    }

    public get socialMediaList(): SocialMediaItem[][] {
        return this.group(this.socialMediaItems, 2);
    }

    public get existsSponsors(): boolean {
        return recordValues(sponsorsConfig)
            .some(sponsors => sponsors !== null);
    }

    public get sponsors(): Record<keyof Sponsors, Sponsor[][] | null> {
        return {
            mainSponsors: sponsorsConfig.mainSponsors ? this.group(sponsorsConfig.mainSponsors, 3) : null,
            premiumSponsors: sponsorsConfig.premiumSponsors ? this.group(sponsorsConfig.premiumSponsors, 3) : null,
            partners: sponsorsConfig.partners ? this.group(sponsorsConfig.partners, 4) : null
        };
    }

    private group<T>(list: T[], count: number): T[][] {
        return list.reduce<T[][]>((newList, item) => {
            if (newList.length === 0 || newList[newList.length - 1].length === count)
                newList.push([]);
            newList[newList.length - 1].push(item);
            return newList;
        }, []);
    }

    public absoluteUrl(relativeUrl: string): string {
        const baseUrl = 'https://svkleinsendelbach-website.web.app';
        if (relativeUrl.startsWith('/'))
            return baseUrl + relativeUrl;
        return `${baseUrl}/${relativeUrl}`;
    }
}
