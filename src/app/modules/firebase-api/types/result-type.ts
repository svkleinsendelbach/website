import { FunctionsErrorCodeCore } from '@angular/fire/functions';
import { Result } from './result';

export interface FirebaseFunctionError {
    name: 'FirebaseFunctionError';
    code: FunctionsErrorCodeCore;
    message: string;
    details?: unknown;
    stack?: string;
}

export type ResultType<T> = Result<T, FirebaseFunctionError>;

