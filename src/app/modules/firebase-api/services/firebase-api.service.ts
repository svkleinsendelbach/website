import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Crypter } from '../crypter/Crypter';
import { CallSecret } from '../types/call-secret';
import { DatabaseType } from '../types/database-type';
import { FirebaseFunctionsType } from '../types/firebase-functions-type';
import { FunctionType } from '../types/function-type';
import { ResultType } from '../types/result-type';
import { VerboseType } from '../types/verbose-type';
import { FirebaseFunctions as FFunctions } from '../firebase-functions';

@Injectable({
    providedIn: 'root'
})
export class FirebaseApiService  {
    public constructor(
        private readonly firebaseFunctions: AngularFireFunctions
    ) {}

    public function<Key extends keyof FFunctions & string>(key: Key): FirebaseFunctions<FFunctions[Key]> {
        return new FirebaseFunctions(this.firebaseFunctions, key);
    }
}

class FirebaseFunctions<FFunctions extends FirebaseFunctionsType>  {
    public constructor(
        private readonly firebaseFunctions: AngularFireFunctions,
        private readonly functionName: string
    ) {}

    public function<Key extends (FFunctions extends FunctionType<unknown, unknown> ? never : (keyof FFunctions & string))>(key: Key): FirebaseFunctions<FFunctions extends FunctionType<unknown, unknown> ? never : FFunctions[Key]> {
        return new FirebaseFunctions(this.firebaseFunctions, `${this.functionName}-${key}`);
    }

    public async call(parameters: FFunctions extends FunctionType<unknown, unknown> ? FunctionType.Parameters<FFunctions> : never): Promise<FFunctions extends FunctionType<unknown, unknown> ? FunctionType.ReturnType<FFunctions> : never> {
        const crypter = new Crypter(environment.cryptionKeys);
        const expiresAtIsoDate = new Date(new Date().getTime() + 60000).toISOString();
        const callableFunction = this.firebaseFunctions.httpsCallable<{
            verbose: VerboseType;
            databaseType: DatabaseType;
            callSecret: CallSecret.Flatten;
            parameters: string;
        }, string>(this.functionName ?? '');
        const encryptedResult = await lastValueFrom(callableFunction({
            verbose: environment.verbose,
            databaseType: environment.databaseType,
            callSecret: {
                expiresAt: expiresAtIsoDate,
                hashedData: Crypter.sha512(expiresAtIsoDate, environment.callSecretKey)
            },
            parameters: crypter.encodeEncrypt(parameters)
        }));
        const result = crypter.decryptDecode<ResultType<FFunctions extends FunctionType<unknown, unknown> ? FunctionType.ReturnType<FFunctions> : never>>(encryptedResult);
        if (result.state === 'failure')
            throw result.error;
        return result.value;
    }
}
