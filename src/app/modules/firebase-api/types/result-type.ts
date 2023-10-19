import { FunctionsErrorCodeCore } from '@angular/fire/functions';
import { Result } from '../../../types/result';

export interface FirebaseFunctionError extends Error {
    name: 'FirebaseFunctionError';
    code: FunctionsErrorCodeCore;
    message: string;
    details: unknown;
    stack?: string;
}

export type ResultType<T> = Result<T, FirebaseFunctionError>;

