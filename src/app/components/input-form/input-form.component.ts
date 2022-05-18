import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';

export type Validator<InvalidErrorCodes = 'invalid'> = (textValue: string) => 'valid' | InvalidErrorCodes;

type InvalidErrorCodes<T> = T extends Validator<infer ErrorCodes> ? ErrorCodes : never;

export namespace Validator {
  export const required: Validator = (textValue: string) => {
    if (textValue === '') return 'invalid';
    return 'valid';
  };

  export const empty: Validator = (textValue: string) => {
      if (textValue === '') return 'valid';
      return 'invalid'
  }

  export function min(n: number): Validator<'NaN' | 'invalid'> {
    return (textValue: string) => {
      textValue = textValue.replace(/,/g, '.');
      const v = Number(textValue);
      if (Number.isNaN(v)) return 'NaN';
      if (v < n) return 'invalid';
      return 'valid';
    }
  }

  export function max(n: number): Validator<'NaN' | 'invalid'> {
    return (textValue: string) => {
      textValue = textValue.replace(/,/g, '.');
      const v = Number(textValue);
      if (Number.isNaN(v)) return 'NaN';
      if (v > n) return 'invalid';
      return 'valid';
    };
  }

  export function pattern(regex: RegExp): Validator {
    return (textValue: string) => {
      if (regex.test(textValue)) return 'valid';
      return 'invalid';
    };
  }

  export const email: Validator = Validator.pattern(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
  );

  export const url: Validator = Validator.pattern(
    /^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}[-a-zA-Z0-9()@:%_\+.~#?&\/=]*$/
  );

  export const isoDate: Validator = Validator.pattern(
    /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/
  );

  export const date: Validator = Validator.pattern(
    /^\d{4}-\d{2}-\d{2}$/
  );

  export const time: Validator = Validator.pattern(
    /^\d{2}:\d{2}$/
  );

  export function minLength(length: number): Validator {
    return (textValue: string) => {
      if (textValue.length < length) return 'invalid';
      return 'valid';
    };
  }

  export function maxLength(length: number): Validator {
    return (textValue: string) => {
      if (textValue.length > length) return 'invalid';
      return 'valid';
    };
  }

  export function containsASubstringFromStringSet(stringSet: Set<string>): Validator {
    return (textValue: string) => {
      for (const v of stringSet) {
        if (textValue.includes(v)) return 'valid';
      }
      return 'invalid';
    };
  }

  export const containsAnInteger: Validator = Validator.containsASubstringFromStringSet(
    new Set([...'0123456789'])
  );

  export const containsAnUppercasedCharacter: Validator = Validator.containsASubstringFromStringSet(
    new Set([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']),
  );

  export const containsALowercasedCharacter: Validator = Validator.containsASubstringFromStringSet(
    new Set([...'abcdefghijklmnopqrstuvwxyz']),
  );

  export function isOneOf(validInputs: string[]): Validator {
    return (textValue: string) => {
      return validInputs.includes(textValue) ? 'valid' : 'invalid';
    }
  }

  export function compose<InvalidErrorCodes>(...validators: [Validator<InvalidErrorCodes>, ...Validator<InvalidErrorCodes>[]]): Validator<InvalidErrorCodes> {
    return (textValue: string) => {
      for (const validator of validators) {
        const validation = validator(textValue);
        if (validation !== 'valid') return validation;
      }
      return 'valid';
    }
  }

  export function eitherOne<InvalidErrorCodes>(...validators: [Validator<InvalidErrorCodes>, ...Validator<InvalidErrorCodes>[]]): Validator<InvalidErrorCodes> {
    return (textValue: string) => {
      let lastInvalidErrorCode!: InvalidErrorCodes;
      for (const validator of validators) {
        const validation = validator(textValue);
        if (validation === 'valid') return 'valid';
        lastInvalidErrorCode = validation;
      }
      return lastInvalidErrorCode;
    }
  }

  export function custom<InvalidErrorCodes = 'invalid'>(evaluater: (textValue: string) => 'valid' | InvalidErrorCodes): Validator<InvalidErrorCodes> {
    return evaluater;
  }
}

export class InputField<Validators extends { [key: string]: Validator<any> }> {
  private isTouched: boolean = false;

  private isEvalutated: boolean = false;

  private element?: Element;

  public constructor(private readonly validators?: Validators) {}

  public setElement(element: Element) {
    this.element = element;
    if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName))
      throw new Error(`Element isn't from valid type: ${element.tagName}`);
    element.addEventListener('focusout', () => {
      this.isTouched = true;
    });
  }

  public get textValue(): string {
    if (this.element === undefined) return '';
    switch (this.element.tagName) {
      case 'INPUT':
        return (this.element as HTMLInputElement).value;
      case 'TEXTAREA':
        return (this.element as HTMLTextAreaElement).value;
      case 'SELECT':
        return (this.element as HTMLSelectElement).value;
      default:
        return '';
    }
  }

  public set textValue(value: string) {
    if (this.element === undefined) return;
    switch (this.element.tagName) {
      case 'INPUT':
        (this.element as HTMLInputElement).value = value;
        break;
      case 'TEXTAREA':
        (this.element as HTMLTextAreaElement).value = value;
        break;
      case 'SELECT':
        (this.element as HTMLSelectElement).value = value;
        break;
    }
  }

  public get firstErrorKey(): keyof Validators | undefined {
    this.isEvalutated = true;
    if (this.validators === undefined) return undefined;
    const value = this.textValue;
    for (const entry of Object.entries(this.validators)) {
      if (entry[1](value) !== 'valid') return entry[0];
    }
    return undefined;
  }

  public get hasError(): boolean {
    return this.firstErrorKey !== undefined;
  }

  public errorOf<Key extends keyof Validators>(key: Key): 'valid' | InvalidErrorCodes<Validators[Key]> {
    this.isEvalutated = true;
    if (this.validators === undefined) return 'valid';
    return this.validators[key](this.textValue);
  }

  public errorFirstOf<Key extends keyof Validators>(
    key: Key,
  ): undefined | 'valid' | InvalidErrorCodes<Validators[Key]> {
    if (this.firstErrorKey !== key) return undefined;
    return this.errorOf<Key>(key);
  }

  public errorFirstIfTouchedOf<Key extends keyof Validators>(
    key: Key,
  ): undefined | 'valid' | InvalidErrorCodes<Validators[Key]> {
    if (!this.touched) return undefined;
    return this.errorFirstOf<Key>(key);
  }

  public reset() {
    this.isTouched = false;
    this.isEvalutated = false;
  }

  public get touched(): boolean {
    return this.isTouched || this.isEvalutated;
  }

  public get touchedInvalid(): boolean {
    return this.touched && this.hasError;
  }
}

export class InputFields<Fields extends { [key: string]: InputField<any> }, ExtraStatus = never> {
  private _status: 'valid' | 'invalidInput' | ExtraStatus;

  private resetTimeout: number | undefined = undefined;

  public constructor(private readonly inputFields: Fields, status?: 'valid' | 'invalidInput' | ExtraStatus) {
    this._status = status ?? 'valid';
  }

  public setElements(rootElement: HTMLElement) {
    for (const entry of Object.entries(this.inputFields)) {
      const element = rootElement.querySelector(`[formId=${entry[0]}]`);
      if (element === null) throw new Error(`Couldn\'t get element with id: '${entry[0]}'`);
      entry[1].setElement(element);
    }
  }

  public field<Key extends keyof Fields>(key: Key): Fields[Key] {
    return this.inputFields[key];
  }

  public get validationOfAllFields(): 'valid' | 'invalid' {
    let validation: 'valid' | 'invalid' = 'valid';
    for (const field of Object.values(this.inputFields)) {
      if (field.hasError) validation = 'invalid';
    }
    if (validation === 'invalid') this.setStatus('invalidInput');
    return validation;
  }

  public setStatus(status: 'valid' | 'invalidInput' | ExtraStatus) {
    this._status = status;
    this.resetStatusAfterTimeout();
  }

  private resetStatusAfterTimeout() {
    if (this.resetTimeout !== undefined) clearTimeout(this.resetTimeout);
    this.resetTimeout = window.setTimeout(() => {
      this._status = 'valid';
    }, 5000);
  }

  public resetAll() {
    if (this.resetTimeout !== undefined) clearTimeout(this.resetTimeout);
    this._status = 'valid';
    for (const inputField of Object.values(this.inputFields)) {
      inputField.reset();
    }
  }

  public get status(): 'valid' | 'invalidInput' | ExtraStatus {
    return this._status;
  }
}

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.sass'],
})
export class InputFormComponent implements AfterViewInit {
  @Input() inputFields!: InputFields<any, any>;

  @ViewChild('form') formElement!: ElementRef<HTMLFormElement>;

  constructor() {}

  ngAfterViewInit() {
    this.inputFields.setElements(this.formElement.nativeElement);
  }
}
