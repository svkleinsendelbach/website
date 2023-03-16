import { InputError } from './input-error';
import { ErrorLevel } from './error-level';
import { ValidationResult } from './validation-result';
import { Validator } from './validator';

export class InputField<T> {
    private fieldValue: T;

    private isTouched = false;

    private isEvalutated = false;

    public constructor(
        private _initialValue: T,
        private readonly validators?: Validator<T>[]
    ) {
        this.fieldValue = _initialValue;
    }

    public set initialValue(value: T) {
        this._initialValue = value;
        this.fieldValue = value;
    }

    public set inputValue(value: T) {
        this.isTouched = true;
        this.fieldValue = value;
    }

    public get value() : T {
        return this.fieldValue;
    }

    public get error(): InputError | undefined {
        if (this.validators === undefined)
            return undefined;
        if (!this.isTouched && !this.isEvalutated)
            return undefined;
        for (const validator of this.validators) {
            if (validator.isValid(this.fieldValue) === ValidationResult.Invalid)
                return {
                    message: validator.errorMessage,
                    level: ErrorLevel.Error
                };
        }
        return undefined;
    }

    public evaluate(): ValidationResult {
        this.isEvalutated = true;
        if (this.validators === undefined)
            return ValidationResult.Valid;
        for (const validator of this.validators) {
            if (validator.isValid(this.fieldValue) === ValidationResult.Invalid)
                return ValidationResult.Invalid;
        }
        return ValidationResult.Valid;
    }

    public reset() {
        this.fieldValue = this._initialValue;
        this.isTouched = false;
        this.isEvalutated = false;
    }
}
