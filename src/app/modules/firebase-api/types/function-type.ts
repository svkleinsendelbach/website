export interface FunctionType<Parameters, ReturnType> {
    parameters: Parameters;
    return: ReturnType;
}

export declare namespace FunctionType {
  type Parameters<T extends FunctionType<unknown, unknown>> = T extends FunctionType<infer Parameters, unknown> ? Parameters : never;
  type ReturnType<T extends FunctionType<unknown, unknown>> = T extends FunctionType<unknown, infer ReturnType> ? ReturnType : never;
}
