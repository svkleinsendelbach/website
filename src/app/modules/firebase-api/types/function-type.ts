export interface FunctionType<FlattenParameters, FlattenReturnType, ReturnType = undefined> {
    flattenParameters: FlattenParameters;
    flattenReturnType: FlattenReturnType;
    returnType: ReturnType;
}

export declare namespace FunctionType {
    export type FlattenParameters<T extends FunctionType<unknown, unknown, unknown>> = T extends FunctionType<infer _FlattenParameters, unknown, unknown> ? _FlattenParameters : never;

    export type FlattenReturnType<T extends FunctionType<unknown, unknown, unknown>> = T extends FunctionType<unknown, infer _FlattenReturnType, unknown> ? _FlattenReturnType : never;

    export type ReturnType<T extends FunctionType<unknown, unknown, unknown>> = T extends FunctionType<unknown, unknown, infer _ReturnType> ? (_ReturnType extends undefined ? FlattenReturnType<T> : _ReturnType) : never;
}
