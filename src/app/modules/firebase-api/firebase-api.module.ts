import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/compat/functions';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AngularFireFunctionsModule
    ],
    providers: [
        { provide: REGION, useValue: 'europe-west1' },
    ]
})
export class FirebaseApiModule { }
