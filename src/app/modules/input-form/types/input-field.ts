import { ErrorLevel } from './error-level';
import { EventListener } from 'src/app/types/event-listener';
import { InputError } from './input-error';
import { ValidationResult } from './validation-result';
import { Validator } from './validator';

export class InputField<T> {
    public readonly listeners = new EventListener<T>();

    private fieldValue: T;

    private isTouched = false;

    private isEvalutated = false;

    public constructor(
        private myInitialValue: T,
        private readonly validators: Validator<T>[] = []
    ) {
        this.fieldValue = myInitialValue;
        this.listeners.emitValue(this.fieldValue);
    }

    public get value(): T {
        return this.fieldValue;
    }

    public get error(): InputError | null {
        if (!this.isTouched && !this.isEvalutated)
            return null;
        for (const validator of this.validators) {
            if (validator.isValid(this.fieldValue) === ValidationResult.Invalid) {
                return {
                    level: ErrorLevel.Error,
                    message: validator.errorMessage
                };
            }
        }
        return null;
    }

    public set initialValue(value: T) {
        this.myInitialValue = value;
        this.fieldValue = value;
        this.listeners.emitValue(this.fieldValue);
    }

    public set inputValue(value: T) {
        this.isTouched = true;
        this.fieldValue = value;
        this.listeners.emitValue(this.fieldValue);
    }

    public evaluate(): ValidationResult {
        this.isEvalutated = true;
        for (const validator of this.validators) {
            if (validator.isValid(this.fieldValue) === ValidationResult.Invalid)
                return ValidationResult.Invalid;
        }
        return ValidationResult.Valid;
    }

    public reset() {
        this.fieldValue = this.myInitialValue;
        this.listeners.emitValue(this.fieldValue);
        this.isTouched = false;
        this.isEvalutated = false;
    }
}
