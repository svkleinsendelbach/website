import { Component, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';
import { SquadPerson } from './person/person.component';
import { DeviceTypeService } from '../../services/device-type.service';

interface TeamKader {
  kader?: {
    torwart?: TeamKaderPerson[];
    abwehr?: TeamKaderPerson[];
    mittelfeld?: TeamKaderPerson[];
    sturm?: TeamKaderPerson[];
    ohneAngabe?: TeamKaderPerson[];
  };
  coach?: {
    imageId?: number;
    name?: string;
    personParameters?: PersonParameters;
    age?: number;
  };
  stab?: {
    imageId?: number;
    function?: string;
    name?: string;
    personParameters?: PersonParameters;
  }[];
}

interface TeamKaderPerson {
  imageId?: number;
  firstName?: string;
  lastName?: string;
  personParameters?: PersonParameters;
  age?: number;
  inSquad?: number;
  goals?: number;
  assists?: number;
}

interface PersonParameters {
  spielkreis: number;
  personId: number;
}

@Component({
  selector: 'app-component-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.sass'],
})
export class SquadComponent implements OnInit {
  squad?: TeamKader;

  @Input() parametersPath!: string;

  constructor(private fns: AngularFireFunctions, public deviceType: DeviceTypeService) {}

  ngOnInit(): void {
    this.fetchSquad().catch(console.error);
  }

  private async fetchSquad() {
    const callable = this.fns.httpsCallable<any, { value: TeamKader }>('getAnpfiffInfoData');
    this.squad = (
      await lastValueFrom(
        callable({
          website: 'team/kader',
          parameters: 'teamParameters/first-team',
        }),
      )
    ).value;
  }

  public get coachPerson(): SquadPerson {
    return {
      imageId: this.squad?.coach?.imageId,
      name: this.squad?.coach?.name ?? 'n.a.',
      personParameters: this.squad?.coach?.personParameters,
    };
  }

  public squadPerson(person: TeamKaderPerson): SquadPerson {
    let name: string;
    if (person.firstName !== undefined && person.lastName !== undefined) {
      name = `${person.firstName} ${person.lastName}`;
    } else if (person.firstName === undefined && person.lastName !== undefined) {
      name = person.lastName;
    } else if (person.firstName !== undefined && person.lastName === undefined) {
      name = person.firstName;
    } else {
      name = 'n.a.';
    }
    let additionalText: string | undefined;
    if (person.goals !== undefined) {
      additionalText = `${person.goals} Tore`;
    }
    if (person.assists !== undefined) {
      if (additionalText === undefined) {
        additionalText = `${person.assists} Assists`;
      } else {
        additionalText += ` und ${person.assists} Assists`;
      }
    }
    if (person.inSquad !== undefined) {
      if (additionalText === undefined) {
        additionalText = `${person.inSquad} Spiele`;
      } else {
        additionalText += ` in ${person.inSquad} Spielen`;
      }
    }
    return {
      imageId: person.imageId,
      name,
      personParameters: person.personParameters,
      additionalText,
    };
  }

  public staffPerson(person: {
    imageId?: number;
    function?: string;
    name?: string;
    personParameters?: PersonParameters;
  }): SquadPerson {
    return {
      imageId: person.imageId,
      name: person.name ?? 'n.a.',
      personParameters: person.personParameters,
      additionalText: person.function,
    };
  }
}
