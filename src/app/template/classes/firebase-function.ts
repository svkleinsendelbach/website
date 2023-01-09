import { FunctionsErrorCodeCore } from '@angular/fire/functions'
import { Result } from './result';

export namespace FirebaseFunction {
  export interface Error {
      code: FunctionsErrorCodeCore,
      message: string,
      details?: unknown,
      stack?: string,
  }

  export type ResultType<T> = Result<T, FirebaseFunction.Error>;
}
