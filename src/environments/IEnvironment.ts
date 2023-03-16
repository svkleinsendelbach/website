import { FirebaseOptions } from '@angular/fire/app';
import { DatabaseType } from 'src/app/template/classes/database-type';
import { Crypter } from 'src/app/template/crypter/Crypter';
import { ApiService } from 'src/app/template/services/api.service';

export interface IEnvironment {
  firebase: FirebaseOptions,
  googleMaps: {
    apiKey: string
  },
  databaseType: DatabaseType,
  testUser?: {
    email: string,
    password: string
  }
  verbose: ApiService.VerboseType,
  cryptionKeys: Crypter.Keys,
  callSecretKey: string,
  production: boolean,
  name: string
}
