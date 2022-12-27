import { Component, Input, OnInit } from '@angular/core';
import { FetchState } from '../../classes/fetch-state';
import { DeviceTypeService } from '../../services/device-type.service';
import { SquadFetcherService } from '../../services/squad-fetcher.service';
import { StyleConfigService } from '../../services/style-config.service';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.sass']
})
export class SquadComponent implements OnInit {
  public FetchState = FetchState

  @Input() public parametersPath!: string

  public fetchedSquad: FetchState<SquadFetcherService.Squad> = FetchState.loading

  public constructor(
    private readonly squadFetcher: SquadFetcherService,
    public readonly styleConfig: StyleConfigService,
    public readonly deviceType: DeviceTypeService
  ) {}

  public ngOnInit() {
    this.squadFetcher.fetchSquad(this.parametersPath)
      .then(news => {
        this.fetchedSquad = FetchState.success(news)
      })
      .catch(reason => {
        this.fetchedSquad = FetchState.failure(reason)
      })
  }

  private getFullName(person: { firstName?: string, lastName?: string}): string {
    if (person.firstName !== undefined && person.lastName !== undefined) {
      return `${person.firstName} ${person.lastName}`
    } else if (person.firstName === undefined && person.lastName !== undefined) {
      return person.lastName
    } else if (person.firstName !== undefined && person.lastName === undefined) {
      return person.firstName
    } else {
      return 'n.a.'
    }
  }

  public squadPersonInfo(person: SquadFetcherService.SquadPerson): SquadComponent.SquadPersonInfo {
    let additionalText: string | undefined;
    if (person.goals !== undefined) {
      additionalText = `${person.goals} Tore`
    }
    if (person.assists !== undefined) {
      if (additionalText === undefined) {
        additionalText = `${person.assists} Assists`
      } else {
        additionalText += ` und ${person.assists} Assists`
      }
    }
    if (person.inSquad !== undefined) {
      if (additionalText === undefined) {
        additionalText = `${person.inSquad} Spiele`
      } else {
        additionalText += ` in ${person.inSquad} Spielen`
      }
    }
    return {
      imageId: person.imageId,
      name: this.getFullName(person),
      personParameters: person.personParameters,
      additionalText,
    }
  }

  public coachPersonInfo(person: SquadFetcherService.Coach): SquadComponent.SquadPersonInfo {
    return {
      imageId: person.imageId,
      name: person.name ?? 'n.a.',
      personParameters: person.personParameters,
    };
  }

  public staffPersonInfo(person: SquadFetcherService.StaffPerson): SquadComponent.SquadPersonInfo {
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
    imageId?: number,
    name: string,
    additionalText?: string,
    personParameters?: SquadFetcherService.PersonParameters
  }
}
