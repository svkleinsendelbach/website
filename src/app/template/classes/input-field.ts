import { Validators } from "./validators";

export class InputField {
  private isTouched = false;

  private isEvalutated = false;

  private element?: HTMLElement;

  public constructor(
    public readonly label: string,
    public readonly type: InputField.Type,
    private readonly validators?: Validators
  ) {}

  public setElement(element: HTMLElement) {
    this.element = element;
    if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName))
      throw new Error(`Element isn't a valid type: ${element.tagName}`);
    element.addEventListener('blur', () => {
      this.isTouched = true;
    });
  }

  public get textValue(): string {
    if (this.element === undefined)
      return '';
    switch (this.element.tagName) {
      case 'INPUT':
        if ((this.element as HTMLInputElement).type === 'checkbox')
          return (this.element as HTMLInputElement).checked ? 'checked' : 'unchecked';
        return (this.element as HTMLInputElement).value;
      case 'TEXTAREA':
        return (this.element as HTMLTextAreaElement).value;
      case 'SELECT':
        return (this.element as HTMLSelectElement).value;
    }
    return '';
  }

  public set textValue(value: string) {
    if (this.element === undefined)
      return;
    switch (this.element.tagName) {
      case 'INPUT':
        if ((this.element as HTMLInputElement).type === 'checkbox')
          (this.element as HTMLInputElement).checked = value === 'checked';
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
    if (this.validators === undefined)
      return undefined
    if (!this.isTouched && !this.isEvalutated)
      return undefined
    for (const value of Object.values(this.validators)) {
      if (value.validator(this.textValue) === 'invalid')
        return value.errorMessage
    }
    return undefined
  }

  public evaluate(): 'valid' | 'invalid' {
    this.isEvalutated = true
    if (this.validators === undefined)
      return 'valid'
    for (const value of Object.values(this.validators)) {
      if (value.validator(this.textValue) === 'invalid')
        return 'invalid'
    }
    return 'valid'
  }

  public reset() {
    this.isTouched = false;
    this.isEvalutated = false;
    this.textValue = '';
  }
}

export namespace InputField {
  export type Type = Type.InputText | Type.Textarea | Type.Select

  export namespace Type {
    export interface InputText {
      type: 'inputText',
      placeholder: string,
      option?: {
        type: 'password'
      } | {
        type: 'date',
        min?: string,
        max?: string
      } | {
        type: 'time'
      }
    }

    export interface Textarea {
      type: 'textarea',
      placeholder: string
    }

    export interface Select {
      type: 'select',
      options: {
        type: 'ungrouped'
        options: {
          id: string,
          text: string
        }[]
      } | {
        type: 'grouped',
        groups: {
          groupText: string,
          options: {
            id: string,
            text: string
          }[]
        }[]
      }
    }

    export function inputText(placeholder: string): Type.InputText {
      return {
        type: 'inputText',
        placeholder: placeholder
      }
    }

    export function secureText(placeholder: string): Type.InputText {
      return {
        type: 'inputText',
        placeholder: placeholder,
        option: {
          type: 'password'
        }
      }
    }

    export function date(placeholder: string, min?: string, max?: string): Type.InputText {
      return {
        type: 'inputText',
        placeholder: placeholder,
        option: {
          type: 'date',
          min: min,
          max: max
        }
      }
    }

    export function time(placeholder: string): Type.InputText {
      return {
        type: 'inputText',
        placeholder: placeholder,
        option: {
          type: 'time'
        }
      }
    }

    export function textarea(placeholder: string): Type.Textarea {
      return {
        type: 'textarea',
        placeholder: placeholder
      }
    }

    export function select(options: {
      id: string,
      text: string
    }[]): Type.Select {
      return {
        type: 'select',
        options: {
          type: 'ungrouped',
          options: options
        }
      }
    }

    export function selectGrouped(groups: {
      groupText: string,
      options: {
        id: string,
        text: string
      }[]
    }[]): Type.Select {
      return {
        type: 'select',
        options: {
          type: 'grouped',
          groups: groups
        }
      }
    }
  }
}
