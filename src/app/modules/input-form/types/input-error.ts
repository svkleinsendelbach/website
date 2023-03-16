import { ErrorLevel } from './error-level';

export class InputError {
    public constructor(
        public readonly message: string,
        public readonly level: ErrorLevel = ErrorLevel.Error,
    ) {}
}
