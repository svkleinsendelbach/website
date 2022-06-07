import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchHomeTopService {
  constructor(private fns: AngularFireFunctions) {}

  public async fetch(): Promise<HomeTopProperties> {
    const callable = this.fns.httpsCallable('getHomeTop');
    const data = await lastValueFrom(callable({}));
    return data;
  }
}

export type HomeTopProperties = [
    {
        player: DBPlayer;
        image?: string;
    }[],
    {
        last: TeamSpieleSpiele | null;
        next: TeamSpieleSpiele | null;
    },
    {
        last: TeamSpieleSpiele | null;
        next: TeamSpieleSpiele | null;
    },
];

export interface DBPlayer {
  id: number;
  name: string;
  dateOfBirth: Datum;
}

export interface TeamSpieleSpiele {
  date?: FullDatum;
  logoId?: number;
  homeAway?: 'H' | 'A';
  opponent?: string;
  result?: {
    homeTeam: number;
    awayTeam: number;
  };
  resultParameters?: ResultParameters;
  sonderwertung?: boolean;
}

export interface FullDatum {
  datum: Datum;
  time: Time;
}

export namespace FullDatum {
  export function fromDate(value: Date): FullDatum {
    return {
      datum: Datum.fromDate(value),
      time: Time.fromDate(value),
    };
  }
  export function description(datum: FullDatum): string {
    return `${Datum.description(datum.datum)}, ${Time.description(datum.time)}`;
  }
}

export interface Datum {
  year: number;
  month: number;
  day: number;
}

export namespace Datum {
  export function fromDate(date: Date): Datum {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    };
  }

  export function shortDescription(datum: Datum): string {
    const monthNames = [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ];
    return `${datum.day}. ${monthNames[datum.month]}`;
  }

  export function description(datum: Datum): string {
    return `${shortDescription(datum)} ${datum.year}`;
  }

  export function age(dateOfBirth: Datum): number {
    const today = new Date();
    return (
      today.getFullYear() -
      dateOfBirth.year -
      ([today.getMonth(), today.getDay()] < [dateOfBirth.month, dateOfBirth.day] ? 1 : 0)
    );
  }
}

export interface Time {
  hour: number;
  minute: number;
}

export namespace Time {
  export function fromDate(date: Date): Time {
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
  }

  export function description(time: Time): string {
    const minute = time.minute <= 9 ? `0${time.minute}` : time.minute.toString();
    return `${time.hour}:${minute} Uhr`;
  }
}

export interface ResultParameters {
  spielkreis: number;
  liga: number;
  spiel: number;
  verein: number;
  teamHeim: number;
  teamAway: number;
  top: number;
  ticker: number;
  men: number;
}
