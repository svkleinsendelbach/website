import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CrypterService } from '../../crypter/services/crypter.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { Injectable } from '@angular/core';
import { OAuthProvider } from '@angular/fire/auth';
import { User } from 'src/app/types/user';
import firebase from 'firebase/compat/app';
import { CookieService } from 'ngx-cookie-service';
import { includesAll } from 'src/app/types/record-array';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public constructor(
        private readonly firebaseAuth: AngularFireAuth,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly cookieService: CookieService,
        private readonly crypter: CrypterService
    ) {}

    public async logIn(method: 'google' | 'apple' | { email: string; password: string }): Promise<'registered' | 'unregistered'> {
        let credential: firebase.auth.UserCredential;
        if (method === 'google' || method === 'apple') {
            const provider = method === 'google' ? new firebase.auth.GoogleAuthProvider() : new OAuthProvider('apple.com');
            credential = await this.firebaseAuth.signInWithPopup(provider);
        } else {
            credential = await this.firebaseAuth.signInWithEmailAndPassword(method.email, method.password).catch(async (error: unknown) => {
                if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'auth/user-not-found')
                    return this.firebaseAuth.createUserWithEmailAndPassword(method.email, method.password);
                throw error;
            });
        }
        if (credential.user === null)
            throw new Error('Login failed, no user in credential.');
        const authenticated = await this.checkRoles([]);
        return authenticated === 'authenticated' ? 'registered' : 'unregistered';
    }

    public async logOut() {
        this.cookieService.delete('userRoles');
        await this.firebaseAuth.signOut();
    }

    public async isLoggedIn(): Promise<boolean> {
        return await this.firebaseAuth.currentUser !== null;
    }

    public async hasRoles(expectedRoles: User.Role[]): Promise<boolean> {
        if (expectedRoles.length === 0)
            return true;
        if (this.cookieService.check('userRoles')) {
            const storedRoles: User.Role[] = this.crypter.decryptDecode(this.cookieService.get('userRoles'));
            if (includesAll(storedRoles, expectedRoles))
                return true;
        }
        return await this.checkRoles(expectedRoles) === 'authenticated';
    }

    private async checkRoles(expectedRoles: User.Role[]): Promise<'authenticated' | 'unauthenticated'> {
        const hasRoles = (await this.firebaseApiService.function('user-checkRoles')
            .call({ roles: expectedRoles }))
            .mapResult(() => true, () => false);
        if (hasRoles && expectedRoles.length !== 0)
            this.cookieService.set('userRoles', this.crypter.encodeEncrypt(expectedRoles));
        else
            this.cookieService.delete('userRoles');
        return hasRoles ? 'authenticated' : 'unauthenticated';
    }

    public async requestAccess(firstName: string, lastName: string) {
        if (!await this.firebaseAuth.currentUser)
            return;
        await this.firebaseApiService.function('user-requestAccess').call({
            firstName: firstName,
            lastName: lastName
        });
    }
}
