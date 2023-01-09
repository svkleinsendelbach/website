import { Validator } from "./validator";

export class InputField<Validators extends {
  [key: string]: {
    validator: Validator<any>, // eslint-disable-line @typescript-eslint/no-explicit-any
    errorMessage: string
  }
}> {
  private isTouched = false;

  private isEvalutated = false;

  private element?: Element;

  public constructor(
    private readonly validators?: Validators
  ) {}

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
        if ((this.element as HTMLInputElement).type === 'checkbox')
          return (this.element as HTMLInputElement).checked ? 'checked' : 'unchecked';
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
        if ((this.element as HTMLInputElement).type === 'checkbox')
          (this.element as HTMLInputElement).checked = value == 'checked';
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

  public get errorMessage(): string | undefined {
    if (this.validators === undefined) return undefined
    if (!this.isTouched && !this.isEvalutated) return undefined
    for (const value of Object.values(this.validators)) {
      if (value.validator(this.textValue) !== 'valid') {
        return value.errorMessage
      }
    }
    return undefined
  }

  public reset() {
    this.isTouched = false;
    this.isEvalutated = false;
    this.textValue = '';
  }

  public evaluate(): 'valid' | 'invalid' {
    this.isEvalutated = true
    if (this.validators === undefined) return 'valid'
    for (const value of Object.values(this.validators)) {
      if (value.validator(this.textValue) !== 'valid') {
        return 'invalid'
      }
    }
    return 'valid'
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class InputFields<Fields extends { [key: string]: InputField<any> }, ExtraStatus extends string = never> {
  private _status: 'valid' | 'invalidInput' | ExtraStatus = 'valid';

  private resetTimeout: number | undefined = undefined;

  public constructor(
    private readonly inputFields: Fields,
    private readonly statusMessages: {
      [key in 'invalidInput' | ExtraStatus]: {
        message: string,
        level: InputFields.StatusLevel
      }
    }
  ) {}

  public setElements(rootElement: HTMLElement) {
    for (const entry of Object.entries(this.inputFields)) {
      const element = rootElement.querySelector(`[formId=${entry[0]}]`);
      if (element === null) throw new Error(`Couldn't get element with id: '${entry[0]}'`);
      entry[1].setElement(element);
    }
  }

  public field<Key extends keyof Fields>(key: Key): Fields[Key] {
    return this.inputFields[key];
  }

  public get validationOfAllFields(): 'valid' | 'invalid' {
    let validation: 'valid' | 'invalid' = 'valid';
    for (const field of Object.values(this.inputFields)) {
      if (field.evaluate() === 'invalid') {
        validation = 'invalid';
      }
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

  public get statusMessage(): {
    message: string,
    level: InputFields.StatusLevel
  } | undefined {
    if (this._status === 'valid') return undefined
    return this.statusMessages[this._status]
  }
}

export namespace InputFields {
  export enum StatusLevel {
    Error,
    Info,
    Success
  }
}
