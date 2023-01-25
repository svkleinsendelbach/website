import { Error } from "./error";
import { ErrorLevel } from "./error-level";
import { ValidationResult } from "./validation-result";
import { Validators } from "./validators";

export class InputField<T> {
  private fieldValue: T;

  private isTouched = false;

  private isEvalutated = false;

  public constructor(
    private readonly initialValue: T,
    private readonly validators?: Validators<T>
  ) {
    this.fieldValue = initialValue;
  }

  public set inputValue(value: T) {
    this.isTouched = true;
    this.fieldValue = value;
  }

  public get value() : T {
    return this.fieldValue;
  }

  public get error(): Error | undefined {
    if (this.validators === undefined)
      return undefined;
    if (!this.isTouched && !this.isEvalutated)
      return undefined;
    for (const validator of Object.values(this.validators)) {
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
    for (const validator of Object.values(this.validators)) {
      if (validator.isValid(this.fieldValue) === ValidationResult.Invalid)
        return ValidationResult.Invalid;
    }
    return ValidationResult.Valid;
  }

  public reset() {
    this.fieldValue = this.initialValue;
    this.isTouched = false;
    this.isEvalutated = false;
  }
}
