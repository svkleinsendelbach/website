interface IResult<Content, Failure = never> {
    value: Content | null;
    error: Failure | null;

    isSuccess(): this is Result.Success<Content>;
    isFailure(): this is Result.Failure<Failure>;

    get(): Content;

    map<NewContent>(mapper: (value: Content) => NewContent): IResult<NewContent, Failure>;
    mapError<NewFailure>(mapper: (error: Failure) => NewFailure): IResult<Content, NewFailure>;
    mapResult<T>(mapSuccess: (value: Content) => T, mapFailure: (error: Failure) => T): T;
}

export type Result<Content, Failure = never> = Result.Success<Content> | Result.Failure<Failure>;

export namespace Result {
    export class Success<Content> implements IResult<Content, never> {
        public readonly error = null;

        public constructor(
            public readonly value: Content
        ) {}

        public isSuccess(): this is Result.Success<Content> {
            return true;
        }

        public isFailure(): this is Result.Failure<never> {
            return false;
        }

        public get(): Content {
            return this.value;
        }

        public map<NewContent>(mapper: (value: Content) => NewContent): Result.Success<NewContent> {
            return new Result.Success(mapper(this.value));
        }

        public mapError<T>(mapper: (error: never) => T): Result.Success<Content> {
            return this;
        }

        public mapResult<T>(mapSuccess: (value: Content) => T, mapFailure: (error: never) => T): T {
            return mapSuccess(this.value);
        }
    }

    export class Failure<Failure = never> implements IResult<never, Failure> {
        public readonly value = null;

        public constructor(
            public readonly error: Failure
        ) {}

        public isSuccess(): this is Result.Success<never> {
            return false;
        }

        public isFailure(): this is Result.Failure<Failure> {
            return true;
        }

        public get(): never {
            throw this.error;
        }

        public map<T>(mapper: (value: never) => T): Result.Failure<Failure> {
            return this;
        }

        public mapError<NewFailure>(mapper: (error: Failure) => NewFailure): Result.Failure<NewFailure> {
            return new Result.Failure(mapper(this.error));
        }

        public mapResult<T>(mapSuccess: (value: never) => T, mapFailure: (error: Failure) => T): T {
            return mapFailure(this.error);
        }
    }

    export function fromObject<Content, Failure>(object: { state: 'success'; value: Content } | { state: 'failure'; error: Failure }): Result<Content, Failure> {
        if (object.state === 'success')
            return Result.success(object.value);
        return Result.failure(object.error);
    }

    export function success<Content>(value: Content): Result.Success<Content>;
    export function success(): Result.Success<void>;
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    export function success<Content>(value?: Content): Result.Success<Content | void> {
        return new Result.Success(value);
    }

    export function failure<Failure>(error: Failure): Result.Failure<Failure> {
        return new Result.Failure(error);
    }
}
