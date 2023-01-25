import { ValidationResult } from "./validation-result";

export type Validators<T> = Record<PropertyKey, {
  isValid(value: T): ValidationResult,
  errorMessage: string
}>
