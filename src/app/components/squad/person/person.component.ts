import { Component, Input } from '@angular/core';

export interface SquadPerson {
  imageId?: number;
  name: string;
  additionalText?: string;
  personParameters?: PersonParameters;
}

interface PersonParameters {
  spielkreis: number;
  personId: number;
}

@Component({
  selector: 'app-squad-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.sass'],
})
export class PersonComponent {
  @Input() person!: SquadPerson;

  constructor() {}
}
