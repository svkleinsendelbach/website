import { ValidationResult } from "./validation-result";

export type Validator<T> = (value: T) => ValidationResult;

export namespace Validator {
  export const required: Validator<string> = (value: string) => {
    if (value === '')
      return ValidationResult.Invalid;
    return ValidationResult.Valid;
  };

  export const empty: Validator<string> = (value: string) => {
      if (value === '')
      return ValidationResult.Valid;
    return ValidationResult.Invalid;
  };

  export function min(n: number): Validator<number> {
    return (value: number) => {
      if (value < n)
        return ValidationResult.Invalid;
      return ValidationResult.Valid;
    };
  }

  export function max(n: number): Validator<number> {
    return (value: number) => {
      if (value > n)
        return ValidationResult.Invalid;
      return ValidationResult.Valid;
    };
  }

  export const checked: Validator<boolean> = (value: boolean) => {
    if (value)
      return ValidationResult.Valid;
    return ValidationResult.Invalid;
  };

  export const futureDate: Validator<Date> = (value: Date) => {
    const date = new Date(value);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    if (date >= new Date())
      return ValidationResult.Valid;
    return ValidationResult.Invalid;
  };

  export function pattern(regex: RegExp): Validator<string> {
    return (value: string) => {
      if (regex.test(value))
        return ValidationResult.Valid;
      return ValidationResult.Invalid;
    };
  }

      // eslint-disable-next-line no-control-regex
  export const email: Validator<string>  = Validator.pattern(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/);

  export const url: Validator<string>  = Validator.pattern(/^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}[-a-zA-Z0-9()@:%_+.~#?&/=]*$/);

  export function minLength(length: number): Validator<string>  {
    return (value: string) => {
      if (value.length < length)
        return ValidationResult.Invalid;
      return ValidationResult.Valid;
    };
  }

  export function maxLength(length: number): Validator<string>  {
    return (value: string) => {
      if (value.length > length)
        return ValidationResult.Invalid;
      return ValidationResult.Valid;
    };
  }

  export function containsASubstringFromStringSet(stringSet: Set<string>): Validator<string>  {
    return (value: string) => {
      for (const v of stringSet) {
        if (value.includes(v))
          return ValidationResult.Valid;
      }
      return ValidationResult.Invalid;
    };
  }

  export const containsAnInteger: Validator<string>  = Validator.containsASubstringFromStringSet(new Set([...'0123456789']));

  export const containsAnUppercasedCharacter: Validator<string>  = Validator.containsASubstringFromStringSet(new Set([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']));

  export const containsALowercasedCharacter: Validator<string>  = Validator.containsASubstringFromStringSet(new Set([...'abcdefghijklmnopqrstuvwxyz']));

  export function isOneOf<T>(validInputs: T[]): Validator<T> {
    return (value: T) => {
      return validInputs.includes(value) ? ValidationResult.Valid : ValidationResult.Invalid;
    };
  }

  export function compose<T>(...validators: [Validator<T>, ...Validator<T>[]]): Validator<T> {
    return (value: T) => {
      for (const validator of validators) {
        const validation = validator(value);
        if (validation === ValidationResult.Invalid)
          return ValidationResult.Invalid;
      }
      return ValidationResult.Valid;
    };
  }

  export function eitherOne<T>(...validators: [Validator<T>, ...Validator<T>[]]): Validator<T> {
    return (value: T) => {
      for (const validator of validators) {
        const validation = validator(value);
        if (validation === ValidationResult.Valid)
          return ValidationResult.Valid;
      }
      return ValidationResult.Invalid;
    };
  }

  export function custom<T>(evaluater: (value: T) => boolean): Validator<T>
  export function custom<T>(evaluater: (value: T) => ValidationResult): Validator<T>
  export function custom<T>(evaluater: (value: T) => ValidationResult | boolean): Validator<T> {
    return (value: T) => {
      const result = evaluater(value);
      if (typeof result === 'boolean')
        return result ? ValidationResult.Valid : ValidationResult.Invalid;
      return result;
    };
  }
}
