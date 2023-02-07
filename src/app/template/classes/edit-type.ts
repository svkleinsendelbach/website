export class EditType {
  public constructor(
    public readonly value: EditType.Value
  ) {}
}

export namespace EditType {
  export type Value = 'add' | 'change' | 'remove';
}
