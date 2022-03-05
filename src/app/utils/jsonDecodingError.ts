export class JsonDecodingError implements Error {
  public readonly name = "JsonDecodingError";
  public constructor(public readonly message: string) {}
}
