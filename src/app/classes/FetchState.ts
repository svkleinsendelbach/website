export type FetchState<Content, Failure = Error> =
  | FetchState.Loading
  | FetchState.Success<Content>
  | FetchState.Failure<Failure>;

export namespace FetchState {
  export interface Loading {
    state: 'loading';
  }

  export interface Success<Content> {
    state: 'success';
    content: Content;
  }

  export interface Failure<Failure = Error> {
    state: 'failure';
    error: Failure;
  }

  export const loading: FetchState.Loading = {
    state: 'loading',
  };

  export function success<Content>(content: Content): FetchState.Success<Content> {
    return {
      state: 'success',
      content: content,
    };
  }

  export function failure<Failure = Error>(error: Failure): FetchState.Failure<Failure> {
    return {
      state: 'failure',
      error: error,
    };
  }

  export function isLoading<Content, Failure = Error>(
    state: FetchState<Content, Failure>,
  ): state is FetchState.Loading {
    return state.state === 'loading';
  }

  export function isSuccess<Content, Failure = Error>(
    state: FetchState<Content, Failure>,
  ): state is FetchState.Success<Content> {
    return state.state === 'success';
  }

  export function isFailure<Content, Failure = Error>(
    state: FetchState<Content, Failure>,
  ): state is FetchState.Failure<Failure> {
    return state.state === 'failure';
  }

  export function getContent(state: FetchState.Loading): undefined;
  export function getContent<Content>(state: FetchState.Success<Content>): Content;
  export function getContent<Failure = Error>(state: FetchState.Failure<Failure>): undefined;
  export function getContent<Content, Failure = Error>(state: FetchState<Content, Failure>): Content | undefined;
  export function getContent<Content, Failure = Error>(state: FetchState<Content, Failure>): Content | undefined {
    if (FetchState.isSuccess(state)) return state.content;
    return undefined;
  }

  export function getError(state: FetchState.Loading): undefined;
  export function getError<Content>(state: FetchState.Success<Content>): undefined;
  export function getError<Failure = Error>(state: FetchState.Failure<Failure>): Failure;
  export function getError<Content, Failure = Error>(state: FetchState<Content, Failure>): Failure | undefined;
  export function getError<Content, Failure = Error>(state: FetchState<Content, Failure>): Failure | undefined {
    if (FetchState.isFailure(state)) return state.error;
    return undefined;
  }
}
