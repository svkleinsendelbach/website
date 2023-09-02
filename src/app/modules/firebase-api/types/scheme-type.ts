// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
type Scheme = SchemeType[] | boolean | number | string | { [key: string]: SchemeType } | null;

export interface CryptedScheme<T extends Scheme> {
    value: T;
    crypted: true;
}

export type SchemeType = CryptedScheme<Scheme>   | Scheme;

export type DatabaseSchemeType<T extends SchemeType> = T;

export type GetCryptedScheme<T extends SchemeType> = T extends CryptedScheme<infer _Scheme> ? _Scheme : never;

export type IsCryptedScheme<T extends SchemeType> = T extends CryptedScheme<Scheme> ? true : never;
