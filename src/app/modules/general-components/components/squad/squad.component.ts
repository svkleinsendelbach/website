import { Component, Input, OnInit } from '@angular/core';
import { DeviceTypeService } from '../../../../services/device-type.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { SquadPerson } from '../../types/squad-person';
import { StyleConfigService } from '../../../../services/style-config.service';
import { TeamSquad } from 'src/app/types/team-squad';
import { TrackBy } from 'src/app/types/track-by';
import { AnpfiffInfoTeamParameters } from 'src/app/types/anpfiff-info-parameters';
import { FirebaseFunctionResult } from 'src/app/modules/firebase-api/types/firebase-function-result';

@Component({
    selector: 'squad',
    styleUrls: ['./squad.component.sass'],
    templateUrl: './squad.component.html'
})
export class SquadComponent implements OnInit {
    @Input() public parametersType!: AnpfiffInfoTeamParameters.Type;

    public TrackBy = TrackBy;

    public fetchedSquad: FirebaseFunctionResult<TeamSquad> | null = null;

    public constructor(
        private readonly firebaseApiService: FirebaseApiService,
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {}

    public async ngOnInit() {
        this.fetchedSquad = await this.firebaseApiService.function('bfvData-teamSquad').call({
            type: this.parametersType
        });
    }

    public squadPersonInfo(person: TeamSquad.Person): SquadPerson {
        let additionalText: string | null = null;
        if (person.goals !== null)
            additionalText = `${person.goals} Tore`;
        if (person.assists !== null) {
            if (additionalText === null)
                additionalText = `${person.assists} Assists`;
            else
                additionalText += ` und ${person.assists} Assists`;
        }
        if (person.countInSquad !== null) {
            if (additionalText === null)
                additionalText = `${person.countInSquad} Spiele`;
            else
                additionalText += ` in ${person.countInSquad} Spielen`;
        }
        return {
            additionalText: additionalText,
            imageId: person.imageId,
            name: this.getFullName(person),
            personParameters: person.personParameters
        };
    }

    public coachPersonInfo(person: TeamSquad.Coach): SquadPerson {
        return {
            additionalText: null,
            imageId: person.imageId,
            name: person.name ?? 'n.a.',
            personParameters: person.personParameters
        };
    }

    public staffPersonInfo(person: TeamSquad.StabPerson): SquadPerson {
        return {
            additionalText: person.function,
            imageId: person.imageId,
            name: person.name ?? 'n.a.',
            personParameters: person.personParameters
        };
    }

    private getFullName(person: { firstName: string | null; lastName: string | null }): string {
        if (person.firstName !== null && person.lastName !== null)
            return `${person.firstName} ${person.lastName}`;
        else if (person.firstName === null && person.lastName !== null)
            return person.lastName;
        else if (person.firstName !== null && person.lastName === null)
            return person.firstName;

        return 'n.a.';
    }
}
