import { UtcDate } from 'src/app/types/utc-date';
import { ValidationResult } from './validation-result';

export interface Validator<T> {
    errorMessage: string;
    isValid(value: T): ValidationResult;
}

export namespace Validator {
    function validator<T>(errorMessage: string, isValid: (value: T) => ValidationResult): Validator<T> {
        return {
            errorMessage: errorMessage,
            isValid: isValid
        };
    }

    export function required(errorMessage: string): Validator<string> {
        return validator(errorMessage, (value: string) => {
            if (value === '')
                return ValidationResult.Invalid;
            return ValidationResult.Valid;
        });
    }

    export function empty(errorMessage: string): Validator<string> {
        return validator(errorMessage, (value: string) => {
            if (value === '')
                return ValidationResult.Valid;
            return ValidationResult.Invalid;
        });
    }

    export function minLength(length: number, errorMessage: string): Validator<string> {
        return validator(errorMessage, (value: string) => {
            if (value.length < length)
                return ValidationResult.Invalid;
            return ValidationResult.Valid;
        });
    }

    export function maxLength(length: number, errorMessage: string): Validator<string> {
        return validator(errorMessage, (value: string) => {
            if (value.length > length)
                return ValidationResult.Invalid;
            return ValidationResult.Valid;
        });
    }

    export function min(n: number, errorMessage: string): Validator<number> {
        return validator(errorMessage, (value: number) => {
            if (value < n)
                return ValidationResult.Invalid;
            return ValidationResult.Valid;
        });
    }

    export function max(n: number, errorMessage: string): Validator<number> {
        return validator(errorMessage, (value: number) => {
            if (value > n)
                return ValidationResult.Invalid;
            return ValidationResult.Valid;
        });
    }

    export function checked(errorMessage: string): Validator<boolean> {
        return validator(errorMessage, (value: boolean) => {
            if (value)
                return ValidationResult.Valid;
            return ValidationResult.Invalid;
        });
    }

    export function futureDate(errorMessage: string): Validator<UtcDate> {
        return validator(errorMessage, (value: UtcDate) => {
            if (value.compare(UtcDate.now) !== 'less')
                return ValidationResult.Valid;
            return ValidationResult.Invalid;
        });
    }

    export function pattern(regex: RegExp, errorMessage: string): Validator<string> {
        return validator(errorMessage, (value: string) => {
            if (regex.test(value))
                return ValidationResult.Valid;
            return ValidationResult.Invalid;
        });
    }

    export function email(errorMessage: string): Validator<string> {
        // eslint-disable-next-line no-control-regex
        return Validator.pattern(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(?:2(?:5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(?:2(?:5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/u, errorMessage);
    }

    export function url(errorMessage: string): Validator<string> {
        return Validator.pattern(/^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}[-a-zA-Z0-9()@:%_+.~#?&/=]*$/u, errorMessage);
    }

    export function containsASubstringFromStringSet(stringSet: Set<string>, errorMessage: string): Validator<string> {
        return validator(errorMessage, (value: string) => {
            for (const v of stringSet) {
                if (value.includes(v))
                    return ValidationResult.Valid;
            }
            return ValidationResult.Invalid;
        });
    }

    export function containsAnInteger(errorMessage: string): Validator<string> {
        return Validator.containsASubstringFromStringSet(new Set([...'0123456789']), errorMessage);
    }

    export function containsAnUppercasedCharacter(errorMessage: string): Validator<string> {
        return Validator.containsASubstringFromStringSet(new Set([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']), errorMessage);
    }

    export function containsALowercasedCharacter(errorMessage: string): Validator<string> {
        return Validator.containsASubstringFromStringSet(new Set([...'abcdefghijklmnopqrstuvwxyz']), errorMessage);
    }

    export function isOneOf<T>(validInputs: T[], errorMessage: string): Validator<T> {
        return validator(errorMessage, (value: T) => {
            if (validInputs.includes(value))
                return ValidationResult.Valid;
            return ValidationResult.Invalid;
        });
    }

    export function compose<T>(errorMessage: string, ...validators: [Validator<T>, ...Validator<T>[]]): Validator<T> {
        return validator(errorMessage, (value: T) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            for (const validator of validators) {
                const validation = validator.isValid(value);
                if (validation === ValidationResult.Invalid)
                    return ValidationResult.Invalid;
            }
            return ValidationResult.Valid;
        });
    }

    export function eitherOne<T>(errorMessage: string, ...validators: [Validator<T>, ...Validator<T>[]]): Validator<T> {
        return validator(errorMessage, (value: T) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            for (const validator of validators) {
                const validation = validator.isValid(value);
                if (validation === ValidationResult.Valid)
                    return ValidationResult.Valid;
            }
            return ValidationResult.Invalid;
        });
    }

    export function custom<T>(evaluater: (value: T) => ValidationResult | boolean, errorMessage: string): Validator<T> {
        return validator(errorMessage, (value: T) => {
            const result = evaluater(value);
            if (typeof result === 'boolean')
                return result ? ValidationResult.Valid : ValidationResult.Invalid;
            return result;
        });
    }
}
