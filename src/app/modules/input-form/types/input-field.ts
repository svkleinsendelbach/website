import { InputError } from './input-error';
import { ErrorLevel } from './error-level';
import { ValidationResult } from './validation-result';
import { Validator } from './validator';
import { EventListener } from 'src/app/types/event-listener';

export class InputField<T> {
    private fieldValue: T;

    private isTouched = false;

    private isEvalutated = false;

    public readonly listeners = new EventListener<T>();

    public constructor(
        private _initialValue: T,
        private readonly validators?: Validator<T>[]
    ) {
        this.fieldValue = _initialValue;
        this.listeners.emitValue(this.fieldValue);
    }

    public set initialValue(value: T) {
        this._initialValue = value;
        this.fieldValue = value;
        this.listeners.emitValue(this.fieldValue);
    }

    public set inputValue(value: T) {
        this.isTouched = true;
        this.fieldValue = value;
        this.listeners.emitValue(this.fieldValue);
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
        this.listeners.emitValue(this.fieldValue);
        this.isTouched = false;
        this.isEvalutated = false;
    }
}
