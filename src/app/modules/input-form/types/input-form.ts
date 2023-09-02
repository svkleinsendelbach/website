import { InputField } from './input-field';
import { InputError } from './input-error';
import { ValidationResult } from './validation-result';

export class InputForm<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    InputFields extends Record<string, InputField<any>>,
    ExtraStatus extends PropertyKey = never
> {
    public status: ExtraStatus | 'invalidInput' | 'valid' = 'valid';

    public constructor(
        private readonly inputFields: InputFields,
        private readonly statusMessages: Record<ExtraStatus | 'invalidInput', InputError>
    ) {}

    public get error(): InputError | undefined {
        if (this.status === 'valid')
            return undefined;
        return this.statusMessages[this.status];
    }

    public field<Key extends keyof InputFields>(key: Key): InputFields[Key] {
        return this.inputFields[key];
    }

    public evaluate(): ValidationResult {
        this.status = 'valid';
        let result = ValidationResult.Valid;
        for (const field of Object.values(this.inputFields)) {
            if (field.evaluate() === ValidationResult.Invalid) {
                this.status = 'invalidInput';
                result = ValidationResult.Invalid;
            }
        }
        return result;
    }

    public reset() {
        this.status = 'valid';
        for (const inputField of Object.values(this.inputFields)) {
            inputField.reset();
        }
    }
}
