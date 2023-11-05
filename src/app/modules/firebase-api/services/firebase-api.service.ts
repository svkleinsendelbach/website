import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { CallSecret } from '../types/call-secret';
import { DatabaseType } from '../types/database-type';
import { FirebaseFunctions, firebaseFunctionMapResultValues } from '../types/firebase-functions';
import { FunctionType } from '../types/function-type';
import { Injectable } from '@angular/core';
import { FirebaseFunctionResult } from '../types/firebase-function-result';
import { UtcDate } from 'src/app/types/utc-date';
import { VerboseType } from '../types/verbose-type';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { Result } from '../../../types/result';
import { CrypterService } from '../../crypter/services/crypter.service';
import { FirebaseApiModule } from '../firebase-api.module';

@Injectable({
    providedIn: FirebaseApiModule
})
export class FirebaseApiService {
    public constructor(
        private readonly crypter: CrypterService,
        private readonly angularFireFunctions: AngularFireFunctions
    ) {}

    public function<Key extends keyof FirebaseFunctions>(key: Key): FirebaseFunction<Key> {
        return new FirebaseFunction(this.crypter, this.angularFireFunctions, key);
    }
}

export class FirebaseFunction<Key extends keyof FirebaseFunctions> {
    public constructor(
        private readonly crypter: CrypterService,
        private readonly angularFireFunctions: AngularFireFunctions,
        private readonly key: Key
    ) {}

    public async call(flattenParameters: FunctionType.FlattenParameters<FirebaseFunctions[Key]>): Promise<FirebaseFunctionResult<FunctionType.ReturnType<FirebaseFunctions[Key]>>> {
        const expiresAtUtcDate = UtcDate.now.advanced({ minute: 1 });
        const functionName = environment.databaseType === 'release' ? this.key : `debug-${this.key}`;
        const callableFunction = this.angularFireFunctions.httpsCallable<{
            verbose: VerboseType;
            databaseType: DatabaseType;
            callSecret: CallSecret.Flatten;
            parameters: string;
        }, { result: string; context: unknown }>(functionName);
        const encryptedReturnValue = await lastValueFrom(callableFunction({
            callSecret: {
                expiresAt: expiresAtUtcDate.encoded,
                hashedData: this.crypter.sha512(expiresAtUtcDate.encoded, environment.callSecretKey)
            },
            databaseType: environment.databaseType,
            parameters: this.crypter.encodeEncrypt(flattenParameters),
            verbose: environment.verbose
        }));
        const returnValue: FirebaseFunctionResult<FunctionType.FlattenReturnType<FirebaseFunctions[Key]>> = Result.fromObject(this.crypter.decryptDecode(encryptedReturnValue.result));
        if (returnValue.isFailure())
            console.error(returnValue.error);
        return returnValue.map(content => firebaseFunctionMapResultValues[this.key](content));
    }
}
