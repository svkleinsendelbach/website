import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { Crypter } from '../../crypter/Crypter';

@Injectable({
    providedIn: 'root'
})
export class DatabaseManagerTestService {
    public constructor(
    private readonly firebaseDatabase: AngularFireDatabase
    ) {}

    public async setValue(referencePath: string, value: DatabaseManagerTestService.ValueType) {
        const reference = this.firebaseDatabase.database.ref(referencePath);
        await reference.set(value);
    }

    public async getOptionalValue<T>(referencePath: string): Promise<T | null> {
        const reference = this.firebaseDatabase.database.ref(referencePath);
        const snapshot = await reference.once('value');
        if (!snapshot.exists()) return null;
        return snapshot.val();
    }

    public async getValue<T>(referencePath: string): Promise<T> {
        const optionalValue = await this.getOptionalValue<T>(referencePath);
        if (optionalValue === null)
            throw new Error('No data in snapshot');
        return optionalValue;
    }

    public async getDecryptedOptionalValue<T>(referencePath: string): Promise<T | null> {
        const crypter = new Crypter(environment.cryptionKeys);
        const encryptedValue = await this.getOptionalValue<string>(referencePath);
        if (encryptedValue === null) return null;
        return crypter.decryptDecode(encryptedValue) as T;
    }

    public async getDecryptedValue<T>(referencePath: string): Promise<T> {
        const crypter = new Crypter(environment.cryptionKeys);
        const encryptedValue = await this.getValue<string>(referencePath);
        return crypter.decryptDecode(encryptedValue) as T;
    }

    public async existsValue(referencePath: string): Promise<boolean> {
        return (await this.getOptionalValue(referencePath)) !== null;
    }

    public async removeValue(referencePath: string) {
        const reference = this.firebaseDatabase.database.ref(referencePath);
        await reference.remove();
    }
}

export namespace DatabaseManagerTestService {
  export type ValueType = ValueType.TrivialType | ValueType[] | {
      [key: string]: ValueType;
  };

  export namespace ValueType {
      export type TrivialType = null | boolean | string | number;
  }
}
