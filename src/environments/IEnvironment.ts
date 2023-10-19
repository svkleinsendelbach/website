import { CrypterService } from 'src/app/modules/crypter/services/crypter.service';
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
    cryptionKeys: CrypterService.Keys;
    callSecretKey: string;
    production: boolean;
    name: string;
}
