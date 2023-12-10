import { FirebaseOptions } from '@angular/fire/app';
import { CryptionKeys, DatabaseType, VerboseType } from 'kleinsendelbach-website-library';

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
    cryptionKeys: CryptionKeys;
    callSecretKey: string;
    production: boolean;
    name: string;
}
