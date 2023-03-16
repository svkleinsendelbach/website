import { Component, Input, OnInit } from '@angular/core';
import { FetchState } from '../../classes/fetch-state';
import { PersonParameters, TeamSquad } from '../../classes/team-squad';
import { AnpfiffInfoTeamParameters } from '../../services/api-functions-types';
import { ApiService } from '../../services/api.service';
import { DeviceTypeService } from '../../services/device-type.service';
import { StyleConfigService } from '../../services/style-config.service';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.sass']
})
export class SquadComponent implements OnInit {
  public FetchState = FetchState;

  @Input() public parametersType!: AnpfiffInfoTeamParameters.Type;

  public fetchedSquad: FetchState<TeamSquad> = FetchState.loading;

  public constructor(
    private readonly apiService: ApiService,
    public readonly styleConfig: StyleConfigService,
    public readonly deviceType: DeviceTypeService
  ) {}

  public ngOnInit() {
    this.apiService
      .teamSquadGet({
        type: this.parametersType
      })
      .then(squad => {
        this.fetchedSquad = FetchState.success(squad);
      })
      .catch(reason => {
        this.fetchedSquad = FetchState.failure(reason);
      });
  }

  private getFullName(person: { firstName: string | null, lastName: string | null }): string {
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
    imageId: number | null,
    name: string,
    additionalText: string | null,
    personParameters: PersonParameters | null
  }
}
