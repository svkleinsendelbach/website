import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { CallSecret } from '../types/call-secret';
import { Crypter } from '../crypter/Crypter';
import { DatabaseType } from '../types/database-type';
import { FirebaseFunctions as FFunctions } from '../firebase-functions';
import { FirebaseFunctionsType } from '../types/firebase-functions-type';
import { FunctionType } from '../types/function-type';
import { Injectable } from '@angular/core';
import { ResultType } from '../types/result-type';
import { UtcDate } from 'src/app/types/utc-date';
import { VerboseType } from '../types/verbose-type';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

class FirebaseFunctions<FFunctions extends FirebaseFunctionsType> {
    public constructor(
        private readonly firebaseFunctions: AngularFireFunctions,
        private readonly functionName: string
    ) {}

    public function<Key extends (FFunctions extends FunctionType<unknown, unknown> ? never : (string & keyof FFunctions))>(key: Key): FirebaseFunctions<FFunctions extends FunctionType<unknown, unknown> ? never : FFunctions[Key]> {
        return new FirebaseFunctions(this.firebaseFunctions, `${this.functionName}-${key}`);
    }

    public async call(parameters: FFunctions extends FunctionType<unknown, unknown> ? FunctionType.Parameters<FFunctions> : never): Promise<FFunctions extends FunctionType<unknown, unknown> ? FunctionType.ReturnType<FFunctions> : never> {
        const crypter = new Crypter(environment.cryptionKeys);
        const expiresAtUtcDate = UtcDate.now.advanced({ minute: 1 });
        const functionName = environment.databaseType === 'release' ? this.functionName : `debug-${this.functionName}`;
        const callableFunction = this.firebaseFunctions.httpsCallable<{
            verbose: VerboseType;
            databaseType: DatabaseType;
            callSecret: CallSecret.Flatten;
            parameters: string;
        }, { result: string; context: unknown }>(functionName);
        const returnValue = await lastValueFrom(callableFunction({
            callSecret: {
                expiresAt: expiresAtUtcDate.encoded,
                hashedData: Crypter.sha512(expiresAtUtcDate.encoded, environment.callSecretKey)
            },
            databaseType: environment.databaseType,
            parameters: crypter.encodeEncrypt(parameters),
            verbose: environment.verbose
        }));
        const result = crypter.decryptDecode<ResultType<FFunctions extends FunctionType<unknown, unknown> ? FunctionType.ReturnType<FFunctions> : never>>(returnValue.result);
        if (result.state === 'failure')
            throw result.error;
        return result.value;
    }
}

@Injectable({
    providedIn: 'root'
})
export class FirebaseApiService {
    public constructor(
        private readonly firebaseFunctions: AngularFireFunctions
    ) {}

    public function<Key extends keyof FFunctions>(key: Key): FirebaseFunctions<FFunctions[Key]> {
        return new FirebaseFunctions(this.firebaseFunctions, key);
    }
}
