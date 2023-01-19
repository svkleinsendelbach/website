export type Validators = Record<PropertyKey, {
    validator: Validator,
    errorMessage: string
  }
>

export type Validator = (value: string) => 'valid' | 'invalid';

export namespace Validator {
  export const required: Validator = (value: string) => {
    if (value === '')
      return 'invalid';
    return 'valid';
  };

  export const empty: Validator = (value: string) => {
      if (value === '')
      return 'valid';
    return 'invalid';
  }

  export function min(n: number): Validator {
    return (value: string) => {
      value = value.replace(/,/g, '.');
      const v = Number(value);
      if (Number.isNaN(v))
        return 'invalid';
      if (v < n)
        return 'invalid';
      return 'valid';
    }
  }

  export function max(n: number): Validator {
    return (value: string) => {
      value = value.replace(/,/g, '.');
      const v = Number(value);
      if (Number.isNaN(v))
        return 'invalid';
      if (v > n)
        return 'invalid';
      return 'valid';
    };
  }

  export const checked: Validator = (value: string) => {
    if (value === 'checked')
      return 'valid';
    return 'invalid';
  };

  export function pattern(regex: RegExp): Validator {
    return (value: string) => {
      if (regex.test(value))
        return 'valid';
      return 'invalid';
    };
  }

      // eslint-disable-next-line no-control-regex
  export const email: Validator = Validator.pattern(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/);

  export const url: Validator = Validator.pattern(/^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}[-a-zA-Z0-9()@:%_+.~#?&/=]*$/);

  export const isoDate: Validator = Validator.pattern(/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/);

  export const date: Validator = Validator.pattern(/^\d{4}-\d{2}-\d{2}$/);

  export const time: Validator = Validator.pattern(/^\d{2}:\d{2}$/);

  export function minLength(length: number): Validator {
    return (value: string) => {
      if (value.length < length)
        return 'invalid';
      return 'valid';
    };
  }

  export function maxLength(length: number): Validator {
    return (value: string) => {
      if (value.length > length)
        return 'invalid';
      return 'valid';
    };
  }

  export function containsASubstringFromStringSet(stringSet: Set<string>): Validator {
    return (value: string) => {
      for (const v of stringSet) {
        if (value.includes(v))
          return 'valid';
      }
      return 'invalid';
    };
  }

  export const containsAnInteger: Validator = Validator.containsASubstringFromStringSet(new Set([...'0123456789']));

  export const containsAnUppercasedCharacter: Validator = Validator.containsASubstringFromStringSet(new Set([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']));

  export const containsALowercasedCharacter: Validator = Validator.containsASubstringFromStringSet(new Set([...'abcdefghijklmnopqrstuvwxyz']));

  export function isOneOf(validInputs: string[]): Validator {
    return (value: string) => {
      return validInputs.includes(value) ? 'valid' : 'invalid';
    }
  }

  export function compose(...validators: [Validator, ...Validator[]]): Validator {
    return (value: string) => {
      for (const validator of validators) {
        const validation = validator(value);
        if (validation === 'invalid')
          return 'invalid';
      }
      return 'valid';
    }
  }

  export function eitherOne(...validators: [Validator, ...Validator[]]): Validator {
    return (value: string) => {
      for (const validator of validators) {
        const validation = validator(value);
        if (validation === 'valid')
          return 'valid';
      }
      return 'invalid';
    }
  }

  export function custom(evaluater: (value: string) => 'valid' | 'invalid'): Validator {
    return evaluater;
  }
}
