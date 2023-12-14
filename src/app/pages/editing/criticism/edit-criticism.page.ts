import { Criticism } from './../../../types/criticism';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationCheckComponent, AuthenticationService, FirebaseApiService, Guid, NavigationBarComponent, NavigationBarData, OverviewListComponent, OverviewListData, Result, ResultDisplayComponent, TextSectionComponent } from 'kleinsendelbach-website-library';
import { FirebaseFunctions } from '../../../types/firebase-functions';
import { UserRole } from '../../../types/user-role';
import { InternalPathKey } from '../../../types/internal-paths';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'edit-criticism-page',
    standalone: true,
    imports: [CommonModule, ResultDisplayComponent, NavigationBarComponent, TextSectionComponent, OverviewListComponent, AuthenticationCheckComponent],
    templateUrl: './edit-criticism.page.html',
    styleUrl: './edit-criticism.page.sass'
})
export class EditCriticismPage {

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

    public criticismResult: Result<Criticism[]> | null = null;

    public expandedCriticismId: Guid | null = null;

    constructor(
        private readonly titleService: Title,
        private readonly authenticationService: AuthenticationService<UserRole>,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>
    ) {
        this.titleService.setTitle('Kritik und Vorschläge');
    }

    public async getCriticism() {
        this.criticismResult = await this.firebaseApi.function('criticism-get').call({
            workedOff: null
        });
        if (this.criticismResult.isSuccess())
            this.criticismResult.value.sort((a, b) => a.workedOff ? 1 : -1);
    }

    public criticismOverviewListData(criticism: Criticism[]): OverviewListData<InternalPathKey> {
        return criticism.map(criticism => ({
            title: (criticism.workedOff ? 'Bereits abgearbeitet: ' : '') + criticism.title,
            subtitle: this.expandedCriticismId?.guidString === criticism.id.guidString ? criticism.description : null,
            buttons: [
                {
                    title: this.expandedCriticismId?.guidString === criticism.id.guidString ? 'Einklappen' : 'Anzeigen',
                    link: null,
                    action: () => this.expandCriticism(criticism),
                    options: null
                },
                {
                    title: criticism.workedOff ? 'Rückgängig' : 'Abgearbeitet',
                    link: null,
                    action: () => void this.editWorkedOff(criticism),
                    options: criticism.workedOff ? null : 'prominent',
                }
            ]
        }));
    }

    public async editWorkedOff(criticism: Criticism) {
        if (!this.criticismResult ||this.criticismResult.isFailure())
            return;
        criticism.workedOff = !criticism.workedOff;
        this.criticismResult.value.sort((a, b) => a.workedOff ? 1 : -1);
        await this.firebaseApi.function('criticism-edit').call({
            criticism: Criticism.flatten(criticism),
            criticismId: criticism.id.guidString,
            editType: 'change'
        });
    }

    public expandCriticism(criticism: Criticism) {
        if (this.expandedCriticismId?.guidString === criticism.id.guidString)
            this.expandedCriticismId = null;
        else
            this.expandedCriticismId = criticism.id;
    }
}
