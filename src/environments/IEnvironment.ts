import { Crypter } from 'src/app/modules/firebase-api/crypter/Crypter';
import { DatabaseType } from 'src/app/modules/firebase-api/types/database-type';
import { FirebaseOptions } from '@angular/fire/app';
import { VerboseType } from 'src/app/modules/firebase-api/types/verbose-type';

export interface IEnvironment {
    firebase: FirebaseOptions;
    googleMaps: {
        apiKey: string;
    };
    databaseType: DatabaseType;
    recaptchaApiKey: string;
    testUser: {
        email: string;
        password: string;
    } | null;
    verbose: VerboseType;
    cryptionKeys: Crypter.Keys;
    callSecretKey: string;
    production: boolean;
    name: string;
}
