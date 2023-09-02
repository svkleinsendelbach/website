import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationStatus } from '../types/authentication-status';
import { Crypter } from '../../firebase-api/crypter/Crypter';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { Injectable } from '@angular/core';
import { LoginError } from '../types/login-error';
import { OAuthProvider } from '@angular/fire/auth';
import { RegistrationStatus } from '../types/registration-status';
import { UserAuthenticationType } from 'src/app/modules/firebase-api/types/user-authentication';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public constructor(
        private readonly firebaseAuth: AngularFireAuth,
        private readonly firebaseApiService: FirebaseApiService
    ) {}

    public async loginWithEmail(authenticationTypes: UserAuthenticationType[], email: string, password: string): Promise<RegistrationStatus> {
        const credential = await this.firebaseAuth
            .signInWithEmailAndPassword(email, password)
            .catch(async reason => {
                this.handleEmailError(reason);
                return this.signInWithEmail(email, password);
            });
        return this.handleLoginCredential(authenticationTypes, credential);
    }

    public async loginWithApple(authenticationTypes: UserAuthenticationType[]): Promise<RegistrationStatus> {
        const provider = new OAuthProvider('apple.com');
        const credential = await this.firebaseAuth
            .signInWithPopup(provider)
            // eslint-disable-next-line @typescript-eslint/unbound-method
            .catch(this.handlePopupError);
        return this.handleLoginCredential(authenticationTypes, credential);
    }

    public async loginWithGoogle(authenticationTypes: UserAuthenticationType[]): Promise<RegistrationStatus> {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await this.firebaseAuth
            .signInWithPopup(provider)
            // eslint-disable-next-line @typescript-eslint/unbound-method
            .catch(this.handlePopupError);
        return this.handleLoginCredential(authenticationTypes, credential);
    }

    public async logOut() {
        localStorage.removeItem('userAuthentication');
        await this.firebaseAuth.signOut();
    }

    public async isLoggedIn(authenticationTypes: UserAuthenticationType[]): Promise<boolean> {
        const storedAuthentication = localStorage.getItem('userAuthentication');
        if (storedAuthentication !== null) {
            const crypter = new Crypter(environment.cryptionKeys);
            const storedAuthenticationTypes: UserAuthenticationType[] = crypter.decryptDecode(storedAuthentication);
            let authenticated = true;
            for (const authentication of authenticationTypes) {
                if (storedAuthenticationTypes.includes(authentication))
                    continue;
                authenticated = false;
                break;
            }
            if (authenticated)
                return true;
        }
        const authenticated = await this.checkAuthentication(authenticationTypes);
        return authenticated === 'authenticated';
    }

    public async isLoggedOut(authenticationTypes: UserAuthenticationType[]): Promise<boolean> {
        return !await this.isLoggedIn(authenticationTypes);
    }

    public async addUserForWaiting(authenticationTypes: UserAuthenticationType[], firstName: string, lastName: string) {
        const user = await this.firebaseAuth.currentUser;
        if (user === null)
            throw new LoginError('unknown');
        await this.firebaseApiService.function('userAuthentication').function('add')
            .call({
                authenticationTypes: authenticationTypes,
                firstName: firstName,
                lastName: lastName
            });
    }

    public async removeRegistration() {
        await this.logOut();
    }

    private async signInWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return this.firebaseAuth
            .createUserWithEmailAndPassword(email, password)
            .catch(() => {
                throw new LoginError('unknown');
            });
    }

    private handleEmailError(error: unknown) {
        if (typeof error !== 'object' || error === null || !('code' in error))
            throw new LoginError('unknown');
        if (error.code === 'auth/user-not-found')
            return;
        switch (error.code) {
        case 'auth/invalid-email':
            throw new LoginError('invalid-email');
        case 'auth/user-disabled':
            throw new LoginError('user-disabled');
        case 'auth/wrong-password':
            throw new LoginError('wrong-password');
        default:
            throw new LoginError('unknown');
        }
    }

    private handlePopupError(error: unknown): never {
        if (typeof error !== 'object' || error === null || !('code' in error))
            throw new LoginError('unknown');
        switch (error.code) {
        case 'auth/account-exists-with-different-credential':
            throw new LoginError('unknown');
        case 'auth/auth-domain-config-required':
            throw new LoginError('unknown');
        case 'auth/cancelled-popup-request':
            throw new LoginError('popup-blocked');
        case 'auth/operation-not-allowed':
            throw new LoginError('unknown');
        case 'auth/operation-not-supported-in-this-environment':
            throw new LoginError('unknown');
        case 'auth/popup-blocked':
            throw new LoginError('popup-blocked');
        case 'auth/popup-closed-by-user':
            throw new LoginError('popup-closed');
        case 'auth/unauthorized-domain':
            throw new LoginError('unknown');
        default:
            throw new LoginError('unknown');
        }
    }

    private async checkAuthentication(authenticationTypes: UserAuthenticationType[]): Promise<AuthenticationStatus> {
        const status = await this.firebaseApiService.function('userAuthentication').function('check')
            .call({
                authenicationTypes: authenticationTypes
            })
            .then(() => 'authenticated' as const)
            .catch(() => 'unauthenticated' as const);
        if (status === 'authenticated') {
            const crypter = new Crypter(environment.cryptionKeys);
            localStorage.setItem('userAuthentication', crypter.encodeEncrypt(authenticationTypes));
        } else
            localStorage.removeItem('userAuthentication');

        return status;
    }

    private async handleLoginCredential(authenticationTypes: UserAuthenticationType[], credential: firebase.auth.UserCredential): Promise<RegistrationStatus> {
        if (credential.user === null)
            throw new LoginError('unknown');
        const authenticated = await this.checkAuthentication(authenticationTypes);
        return authenticated === 'authenticated' ? 'registered' : 'unregistered';
    }
}
