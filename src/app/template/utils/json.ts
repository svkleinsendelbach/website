import { guid } from '../classes/guid';

export namespace Json {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function stringify(data: any, space?: string | number): string | undefined {
      if (data === undefined) return undefined;
      return JSON.stringify(data, (_, v) => {
          if (typeof v === 'bigint') return `${v}#bigint`;
          if (v instanceof guid) return v.guidString;
          return v;
      }, space);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function parse(data: string | undefined): any {
      if (data === undefined) return undefined;
      return JSON.parse(data, (_, v) => typeof v === 'string' && v.endsWith('#bigint') ? BigInt(v.replace(/#bigint$/, '')) : v);
  }
}
