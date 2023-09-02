import { GetCryptedScheme, IsCryptedScheme, SchemeType } from '../types/scheme-type';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Crypter } from '../crypter/Crypter';
import { DatabaseScheme } from '../database-scheme';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

class FirebaseDatabase<Scheme extends SchemeType> {
    public constructor(
        private readonly firebaseDatabase: AngularFireDatabase,
        private readonly path: string
    ) {}

    public child<Key extends true extends IsCryptedScheme<Scheme> ? never : (string & keyof Scheme)>(key: Key): FirebaseDatabase<Scheme extends Record<string, SchemeType> ? Scheme[Key] : never> {
        return new FirebaseDatabase(this.firebaseDatabase, `${this.path}/${key.replaceAll('/', '_')}`);
    }

    public async set(value: GetCryptedScheme<Scheme>, crypted: 'encrypt'): Promise<void>;
    public async set(value: true extends IsCryptedScheme<Scheme> ? never : Scheme): Promise<void>;
    public async set(value: GetCryptedScheme<Scheme> | Scheme, crypted: 'encrypt' | 'plain' = 'plain'): Promise<void> {
        if (crypted === 'encrypt') {
            const crypter = new Crypter(environment.cryptionKeys);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, no-param-reassign
            value = crypter.encodeEncrypt(value) as any;
        }
        const reference = this.firebaseDatabase.database.ref(this.path);
        await reference.set(value);
    }

    public async get(crypted: 'decrypt'): Promise<true extends IsCryptedScheme<Scheme> ? GetCryptedScheme<Scheme> : never>;
    public async get(): Promise<true extends IsCryptedScheme<Scheme> ? never : Scheme>;
    public async get(crypted: 'decrypt' | 'plain' = 'plain'): Promise<GetCryptedScheme<Scheme> | Scheme> {
        if (crypted === 'decrypt') {
            const crypter = new Crypter(environment.cryptionKeys);
            return crypter.decryptDecode<GetCryptedScheme<Scheme>>(await this.value() as string);
        }
        return await this.value() as Scheme;
    }

    public async remove() {
        const reference = this.firebaseDatabase.database.ref(this.path);
        await reference.remove();
    }

    public async exists(): Promise<boolean> {
        const reference = this.firebaseDatabase.database.ref(this.path);
        const snapshot = await reference.once('value');
        return snapshot.exists();
    }

    private async value(): Promise<unknown> {
        const reference = this.firebaseDatabase.database.ref(this.path);
        const snapshot = await reference.once('value');
        if (!snapshot.exists())
            throw new Error('No data in snapshot.');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return snapshot.val();
    }
}

@Injectable({
    providedIn: 'root'
})
export class DatabaseManagerTestService {
    public constructor(
        private readonly firebaseDatabase: AngularFireDatabase
    ) {}

    public child<Key extends keyof DatabaseScheme>(key: Key): FirebaseDatabase<DatabaseScheme[Key]> {
        return new FirebaseDatabase(this.firebaseDatabase, key.replaceAll('/', '_'));
    }
}
