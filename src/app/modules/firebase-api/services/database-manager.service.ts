import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { Crypter } from '../crypter/Crypter';
import { DatabaseScheme } from '../database-scheme';
import { GetCryptedScheme, IsCryptedScheme, SchemeType } from '../types/scheme-type';

@Injectable({
    providedIn: 'root'
})
export class DatabaseManagerTestService {
    public constructor(
        private readonly firebaseDatabase: AngularFireDatabase
    ) {}

    public child<Key extends keyof DatabaseScheme & string>(key: Key): FirebaseDatabase<DatabaseScheme[Key]> {
        return new FirebaseDatabase(this.firebaseDatabase, key.replaceAll('/', '_'));
    }
}

class FirebaseDatabase<Scheme extends SchemeType> {
    public constructor(
      private readonly firebaseDatabase: AngularFireDatabase,
        private readonly path: string
    ) {}

    public child<Key extends true extends IsCryptedScheme<Scheme> ? never : (keyof Scheme & string)>(key: Key): FirebaseDatabase<Scheme extends Record<string, SchemeType> ? Scheme[Key] : never> {
        return new FirebaseDatabase(this.firebaseDatabase, `${this.path}/${key.replaceAll('/', '_')}`);
    }

    public async set(value: GetCryptedScheme<Scheme>, crypted: 'encrypt'): Promise<void>;
    public async set(value: true extends IsCryptedScheme<Scheme> ? never : Scheme): Promise<void>;
    public async set(value: Scheme | GetCryptedScheme<Scheme>, crypted: 'plain' | 'encrypt' = 'plain'): Promise<void> {
        if (crypted === 'encrypt') {
            const crypter = new Crypter(environment.cryptionKeys);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value = crypter.encodeEncrypt(value) as any;
        }
        const reference = this.firebaseDatabase.database.ref(this.path);
        await reference.set(value);
    }

    private async value(): Promise<unknown> {
        const reference = this.firebaseDatabase.database.ref(this.path);
        const snapshot = await reference.once('value');
        if (!snapshot.exists())
            throw new Error('No data in snapshot.');
        return snapshot.val();
    }

    public async get(crypted: 'decrypt'): Promise<true extends IsCryptedScheme<Scheme> ? GetCryptedScheme<Scheme> : never>;
    public async get(): Promise<true extends IsCryptedScheme<Scheme> ? never : Scheme>;
    public async get(crypted: 'plain' | 'decrypt' = 'plain'): Promise<Scheme | GetCryptedScheme<Scheme>> {
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
}
