import { compactMap, recordEntries } from './../../../../types/record-array';
import { TrackBy } from 'src/app/types/track-by';
import { Component, Input } from '@angular/core';
import { Newsletter } from 'src/app/types/newletter';
import { recordValues } from 'src/app/types/record-array';
import { EventGroupId } from 'src/app/types/event';
import { UtcDate } from 'src/app/types/utc-date';
import { sponsorsConfig } from 'src/app/config/sponsors-config';
import { Sponsors } from 'src/app/types/sponsors';

@Component({
    selector: 'app-newletter',
    styleUrls: ['./newletter.component.sass'],
    templateUrl: './newletter.component.html'
})
export class NewletterComponent {
    public TrackBy = TrackBy;

    public Month = Newsletter.Month;

    public Department = Newsletter.Department;

    public EventGroup = EventGroupId;

    @Input() public newsletter!: Omit<Newsletter, 'id'>;

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

    public get existsSponsors(): boolean {
        return recordValues(sponsorsConfig)
            .some(sponsors => sponsors !== null);
    }

    public get sponsors(): Sponsors {
        return sponsorsConfig;
    }

    public absoluteUrl(relativeUrl: string): string {
        const baseUrl = 'https://svkleinsendelbach-website.web.app';
        if (relativeUrl.startsWith('/'))
            return baseUrl + relativeUrl;
        return `${baseUrl}/${relativeUrl}`;
    }
}
