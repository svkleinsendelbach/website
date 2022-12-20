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
