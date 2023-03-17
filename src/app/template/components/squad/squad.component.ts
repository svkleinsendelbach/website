import { Component, Input, OnInit } from '@angular/core';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { AnpfiffInfoPersonParameters } from 'src/app/modules/firebase-api/types/anpfiff-info-person-parameters';
import { AnpfiffInfoTeamParameters } from 'src/app/modules/firebase-api/types/anpfiff-info-team-parameters';
import { TeamSquad } from 'src/app/modules/firebase-api/types/team-squad';
import { FetchState } from 'src/app/types/fetch-state';
import { DeviceTypeService } from '../../../services/device-type.service';
import { StyleConfigService } from '../../../services/style-config.service';

@Component({
    selector: 'app-squad',
    templateUrl: './squad.component.html',
    styleUrls: ['./squad.component.sass']
})
export class SquadComponent implements OnInit {
  @Input() public parametersType!: AnpfiffInfoTeamParameters.Type;

  public fetchedSquad: FetchState<TeamSquad> = FetchState.loading;

  public constructor(
    private readonly firebaseApiService: FirebaseApiService,
    public readonly styleConfig: StyleConfigService,
    public readonly deviceType: DeviceTypeService
  ) {}

  public ngOnInit() {
      this.firebaseApiService.function('bfvData').function('teamSquad').call({
          type: this.parametersType
      }).then(squad => {
          this.fetchedSquad = FetchState.success(squad);
      }).catch(reason => {
          this.fetchedSquad = FetchState.failure(reason);
      });
  }

  private getFullName(person: { firstName: string | null; lastName: string | null }): string {
      if (person.firstName !== null && person.lastName !== null) {
          return `${person.firstName} ${person.lastName}`;
      } else if (person.firstName === null && person.lastName !== null) {
          return person.lastName;
      } else if (person.firstName !== null && person.lastName === null) {
          return person.firstName;
      } else {
          return 'n.a.';
      }
  }

  public squadPersonInfo(person: TeamSquad.Person): SquadComponent.SquadPersonInfo {
      let additionalText: string | null = null;
      if (person.goals !== null) {
          additionalText = `${person.goals} Tore`;
      }
      if (person.assists !== null) {
          if (additionalText === null) {
              additionalText = `${person.assists} Assists`;
          } else {
              additionalText += ` und ${person.assists} Assists`;
          }
      }
      if (person.countInSquad !== null) {
          if (additionalText === null) {
              additionalText = `${person.countInSquad} Spiele`;
          } else {
              additionalText += ` in ${person.countInSquad} Spielen`;
          }
      }
      return {
          imageId: person.imageId,
          name: this.getFullName(person),
          personParameters: person.personParameters,
          additionalText,
      };
  }

  public coachPersonInfo(person: TeamSquad.Coach): SquadComponent.SquadPersonInfo {
      return {
          imageId: person.imageId,
          name: person.name ?? 'n.a.',
          personParameters: person.personParameters,
          additionalText: null
      };
  }

  public staffPersonInfo(person: TeamSquad.StabPerson): SquadComponent.SquadPersonInfo {
      return {
          imageId: person.imageId,
          name: person.name ?? 'n.a.',
          personParameters: person.personParameters,
          additionalText: person.function,
      };
  }
}

export namespace SquadComponent {
  export interface SquadPersonInfo {
    imageId: number | null;
    name: string;
    additionalText: string | null;
    personParameters: AnpfiffInfoPersonParameters | null;
  }
}
