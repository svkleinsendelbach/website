export {};

declare global {
  interface Array<T> {
    compactMap<U, This = undefined>(
      callback: (value: T, index: number, array: T[]) => U | undefined | null,
      thisArg?: This,
    ): U[];
  }
}

Array.prototype.compactMap = function <U, This = undefined>(
  callback: (value: any, index: number, array: any[]) => U | undefined | null,
  thisArg?: This,
): U[] {
  return this.flatMap((value, index, array) => {
    return callback(value, index, array) ?? [];
  }, thisArg);
};
