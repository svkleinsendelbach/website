import { Component } from '@angular/core';
import { Newsletter } from 'src/app/types/newletter';
import { UtcDate } from 'src/app/types/utc-date';

@Component({
    selector: 'app-root',
    templateUrl: './app.newsletter.component.html',
    styleUrls: ['./app.newsletter.component.sass']
})
export class AppNewsletterComponent {
    public newsletter: Newsletter = {
        id: '2023-oktober',
        date: UtcDate.now,
        titlePage: {
            title: 'New Record',
            description: 'Aaron Loeb has won again over his opponent Teddy Yu. He set a new record during the last tennis match. Visit our website for more details.',
            month: 'october',
            year: 2023
        },
        departments: {
            'football-adults/general': null,
            'football-adults/first-team': [
                {
                    title: 'Lorem ipsum',
                    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
                }
            ],
            'football-adults/second-team': null,
            'football-youth/big-field': [
                {
                    title: 'Lorem ipsum dolor sit amet',
                    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
                },
                {
                    title: 'Lorem ipsum',
                    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
                }
            ],
            'football-youth/small-field': [
                {
                    title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
                    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
                }
            ],
            'gymnastics': null,
            'dancing': null
        },
        events: {
            'general': [
                {
                    date: new UtcDate(2024, 6, 3, 15, 0),
                    title: 'Lorem ipsum',
                    subtitle: null
                }
            ],
            'football-adults/general': null,
            'football-adults/first-team': [
                {
                    date: new UtcDate(2024, 7, 13, 10, 15),
                    title: 'Lorem ipsum dolor sit amet',
                    subtitle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
                },
                {
                    date: new UtcDate(2024, 7, 14, 13, 0),
                    title: 'Lorem ipsum',
                    subtitle: null
                }
            ],
            'football-adults/second-team': null,
            'football-adults/ah-team': null,
            'football-youth/general': null,
            'football-youth/c-youth': [
                {
                    date: new UtcDate(2024, 6, 25, 13, 30),
                    title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
                    subtitle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
                }
            ],
            'football-youth/e-youth': null,
            'football-youth/f-youth': null,
            'football-youth/g-youth': null,
            'gymnastics': null,
            'dancing': null
        }
    };
}
