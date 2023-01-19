import { InputField } from "./input-field";

export class InputForm<
  Fields extends Record<string, InputField>,
  ExtraStatus extends PropertyKey = never
> {
  private _status: 'valid' | 'invalidInput' | ExtraStatus = 'valid';

  private resetTimeout: number | undefined = undefined;

  public constructor(
    private readonly inputFields: Fields,
    private readonly statusMessages: Record<'invalidInput' | ExtraStatus, {
        message: string,
        level: InputForm.StatusLevel
      }>
  ) {}

  public setElements(rootElement: HTMLElement) {
    for (const entry of Object.entries(this.inputFields)) {
      const element = rootElement.querySelector<HTMLElement>(`[formId=${entry[0]}]`);
      if (element === null)
        throw new Error(`Couldn't get element with id: '${entry[0]}'`);
      entry[1].setElement(element);
    }
  }

  public field<Key extends keyof Fields>(key: Key): Fields[Key] {
    return this.inputFields[key];
  }

  public get fields(): {
    id: keyof Fields,
    field: InputField
  }[] {
    return Object.entries(this.inputFields).map(entry => {
      return {
        id: entry[0] as keyof Fields,
        field: entry[1]
      };
    });
  }

  public get validationOfAllFields(): 'valid' | 'invalid' {
    for (const field of Object.values(this.inputFields)) {
      if (field.evaluate() === 'invalid') {
        this.setStatus('invalidInput');
        return 'invalid';
      }
    }
    return 'valid';
  }

  public setStatus(status: 'valid' | 'invalidInput' | ExtraStatus) {
    this._status = status;
    this.resetStatusAfterTimeout();
  }

  private resetStatusAfterTimeout() {
    if (this.resetTimeout !== undefined)
      clearTimeout(this.resetTimeout);
    this.resetTimeout = window.setTimeout(() => {
      this._status = 'valid';
    }, 5000);
  }

  public resetAll() {
    if (this.resetTimeout !== undefined)
      clearTimeout(this.resetTimeout);
    this._status = 'valid';
    for (const inputField of Object.values(this.inputFields)) {
      inputField.reset();
    }
  }

  public get status(): 'valid' | 'invalidInput' | ExtraStatus {
    return this._status;
  }

  public get statusMessage(): { message: string, level: InputForm.StatusLevel } | undefined {
    if (this._status === 'valid')
    return undefined
    return this.statusMessages[this._status]
  }
}

export namespace InputForm {
  export enum StatusLevel {
    Error,
    Info,
    Success
  }
}
