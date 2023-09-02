import { AngularFireFunctionsModule, REGION } from '@angular/fire/compat/functions';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [
        AngularFireFunctionsModule,
        CommonModule
    ],
    providers: [
        { provide: REGION,
            useValue: 'europe-west1' }
    ]
})
export class FirebaseApiModule { }
