import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';

export type Validator<InvalidErrorCodes = 'invalid'> = (textValue: string) => 'valid' | InvalidErrorCodes;

type InvalidErrorCodes<T> = T extends Validator<infer ErrorCodes> ? ErrorCodes : never;

export namespace Validator {
  export const required: Validator = (textValue: string) => {
    if (textValue === '') return 'invalid';
    return 'valid';
  };

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

  export const email: Validator = (textValue: string) => {
    const regex =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    if (regex.test(textValue)) return 'valid';
    return 'invalid';
  };

  export const url: Validator = (textValue: string) => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}[-a-zA-Z0-9()@:%_\+.~#?&\/=]*$/;
    if (regex.test(textValue)) return 'valid';
    return 'invalid';
  };

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

  function containsASubstringFromStringSet(stringSet: Set<string>): Validator {
    return (textValue: string) => {
      for (const v of stringSet) {
        if (textValue.includes(v)) return 'valid';
      }
      return 'invalid';
    };
  }

  export const containsAnInteger: Validator = containsASubstringFromStringSet(
    new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']),
  );

  export const containsAnUppercasedCharacter: Validator = containsASubstringFromStringSet(
    new Set(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])
  );

  export const containsALowercasedCharacter: Validator = containsASubstringFromStringSet(
    new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'])
  );

  export function pattern(regex: RegExp): Validator {
    return (textValue: string) => {
      if (regex.test(textValue)) return 'valid';
      return 'invalid';
    }
  }

  export function compose<InvalidErrorCodes1, InvalidErrorCodes2>(validator1: Validator<InvalidErrorCodes1>, validator2: Validator<InvalidErrorCodes2>): Validator<InvalidErrorCodes1 | InvalidErrorCodes2> {
    return (textValue: string) => {
      const validation1 = validator1(textValue);
      if (validation1 !== 'valid') return validation1;
      return validator2(textValue);
    }
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
