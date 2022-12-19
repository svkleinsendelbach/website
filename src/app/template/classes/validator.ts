export type Validator<InvalidErrorCodes = 'invalid'> = (textValue: string) => 'valid' | InvalidErrorCodes;

export type InvalidErrorCodes<T> = T extends Validator<infer ErrorCodes> ? ErrorCodes : never;

export namespace Validator {
  export const required: Validator = (textValue: string) => {
    if (textValue === '') return 'invalid';
    return 'valid';
  };

  export const empty: Validator = (textValue: string) => {
      if (textValue === '') return 'valid';
      return 'invalid'
  }

  export function min(n: number): Validator<'NaN' | 'invalid'> {
    return (textValue: string) => {
      textValue = textValue.replace(/,/g, '.');
      const v = Number(textValue);
      if (Number.isNaN(v)) return 'NaN';
      if (v < n) return 'invalid';
      return 'valid';
    }
  }

  export function max(n: number): Validator<'NaN' | 'invalid'> {
    return (textValue: string) => {
      textValue = textValue.replace(/,/g, '.');
      const v = Number(textValue);
      if (Number.isNaN(v)) return 'NaN';
      if (v > n) return 'invalid';
      return 'valid';
    };
  }

  export const checked: Validator = (textValue: string) => {
    if (textValue === 'checked') return 'valid';
    return 'invalid';
  };

  export function pattern(regex: RegExp): Validator {
    return (textValue: string) => {
      if (regex.test(textValue)) return 'valid';
      return 'invalid';
    };
  }

  export const email: Validator = Validator.pattern(
      // eslint-disable-next-line no-control-regex
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
  );

  export const url: Validator = Validator.pattern(
    /^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}[-a-zA-Z0-9()@:%_+.~#?&/=]*$/
  );

  export const isoDate: Validator = Validator.pattern(
    /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/
  );

  export const date: Validator = Validator.pattern(
    /^\d{4}-\d{2}-\d{2}$/
  );

  export const time: Validator = Validator.pattern(
    /^\d{2}:\d{2}$/
  );

  export function minLength(length: number): Validator {
    return (textValue: string) => {
      if (textValue.length < length) return 'invalid';
      return 'valid';
    };
  }

  export function maxLength(length: number): Validator {
    return (textValue: string) => {
      if (textValue.length > length) return 'invalid';
      return 'valid';
    };
  }

  export function containsASubstringFromStringSet(stringSet: Set<string>): Validator {
    return (textValue: string) => {
      for (const v of stringSet) {
        if (textValue.includes(v)) return 'valid';
      }
      return 'invalid';
    };
  }

  export const containsAnInteger: Validator = Validator.containsASubstringFromStringSet(
    new Set([...'0123456789'])
  );

  export const containsAnUppercasedCharacter: Validator = Validator.containsASubstringFromStringSet(
    new Set([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']),
  );

  export const containsALowercasedCharacter: Validator = Validator.containsASubstringFromStringSet(
    new Set([...'abcdefghijklmnopqrstuvwxyz']),
  );

  export function isOneOf(validInputs: string[]): Validator {
    return (textValue: string) => {
      return validInputs.includes(textValue) ? 'valid' : 'invalid';
    }
  }

  export function compose<InvalidErrorCodes>(...validators: [Validator<InvalidErrorCodes>, ...Validator<InvalidErrorCodes>[]]): Validator<InvalidErrorCodes> {
    return (textValue: string) => {
      for (const validator of validators) {
        const validation = validator(textValue);
        if (validation !== 'valid') return validation;
      }
      return 'valid';
    }
  }

  export function eitherOne<InvalidErrorCodes>(...validators: [Validator<InvalidErrorCodes>, ...Validator<InvalidErrorCodes>[]]): Validator<InvalidErrorCodes> {
    return (textValue: string) => {
      let lastInvalidErrorCode!: InvalidErrorCodes;
      for (const validator of validators) {
        const validation = validator(textValue);
        if (validation === 'valid') return 'valid';
        lastInvalidErrorCode = validation;
      }
      return lastInvalidErrorCode;
    }
  }

  export function custom<InvalidErrorCodes = 'invalid'>(evaluater: (textValue: string) => 'valid' | InvalidErrorCodes): Validator<InvalidErrorCodes> {
    return evaluater;
  }
}
