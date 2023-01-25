import { InputField } from "./input-field";
import { Error } from "./error";
import { ValidationResult } from "./validation-result";

export class InputForm<
  InputFields extends Record<string, InputField<unknown>>,
  ExtraStatus extends PropertyKey = never
> {
  public status: 'valid' | 'invalidInput' | ExtraStatus = 'valid';

  public constructor(
    private readonly inputFields: InputFields,
    private readonly statusMessages: Record<'invalidInput' | ExtraStatus, Error>
  ) {}

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

  public get error(): Error | undefined {
    if (this.status === 'valid')
      return undefined;
    return this.statusMessages[this.status];
  }
}
