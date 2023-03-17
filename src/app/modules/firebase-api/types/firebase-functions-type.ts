import { FunctionType } from './function-type';

export type FirebaseFunctionsType = FunctionType<unknown, unknown> | {
    [key: string]: FirebaseFunctionsType;
};
