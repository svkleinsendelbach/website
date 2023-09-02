import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { FirebaseApiService } from './firebase-api.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireFunctions, REGION } from '@angular/fire/compat/functions';
import { DatabaseManagerTestService } from './database-manager.service';
import { TestBed } from '@angular/core/testing';
import { Crypter } from '../crypter/Crypter';
import { UserAuthenticationType } from '../types/user-authentication';
import { Guid } from '../types/guid';
import { UserAuthenticationGetAllUnauthenticatedFunction } from '../function-types';
import { UtcDate } from 'src/app/types/utc-date';

/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
describe('ApiService', () => {
    let firebaseApi: FirebaseApiService;
    let firebaseAuth: AngularFireAuth;
    let database: DatabaseManagerTestService;

    beforeEach(async () => {
        expect(environment.name).toBe('test');
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebase)
            ],
            providers: [
                AngularFireFunctions,
                AngularFireDatabase,
                AngularFireAuth,
                { provide: REGION, useValue: 'europe-west1' }
            ]
        });
        firebaseApi = TestBed.inject(FirebaseApiService);
        firebaseAuth = TestBed.inject(AngularFireAuth);
        database = TestBed.inject(DatabaseManagerTestService);
        expect(firebaseApi).toBeTruthy();
        expect(firebaseAuth).toBeTruthy();
        expect(database).toBeTruthy();
        expect(environment.testUser).not.toBeUndefined();
        const credential = await firebaseAuth.signInWithEmailAndPassword(environment.testUser!.email, environment.testUser!.password);
        expect(credential.user).not.toBeNull();
        const hashedUserId = Crypter.sha512(credential.user!.uid);
        const authenticationTypes: UserAuthenticationType[] = ['editEvents', 'editReports', 'authenticateUser', 'notification'];
        for (const authenticationType of authenticationTypes) {
            await database.child('users').child('authentication').child(authenticationType).child(hashedUserId).set({
                state: 'authenticated',
                firstName: 'test',
                lastName: 'user'
            }, 'encrypt');
        }
    });

    afterEach(async () => {
        await firebaseAuth.signOut();
        await firebaseApi.function('deleteAllData').call({});
    });

    it('remove event', async () => {
        const eventId = Guid.newGuid();
        await database.child('events').child('general').child(eventId.guidString).set({
            date: UtcDate.now.encoded,
            title: 'title',
            isImportant: false
        }, 'encrypt');
        expect(await database.child('events').child('general').child(eventId.guidString).exists()).toBeTrue();
        await firebaseApi.function('event').function('edit').call({
            editType: 'remove',
            groupId: 'general',
            previousGroupId: undefined,
            eventId: eventId.guidString,
            event: undefined
        });
        expect(await database.child('events').child('general').child(eventId.guidString).exists()).toBeFalse();
    });

    it('add event', async () => {
        const eventId = Guid.newGuid();
        const date = UtcDate.now;
        await firebaseApi.function('event').function('edit').call({
            editType: 'add',
            groupId: 'general',
            previousGroupId: undefined,
            eventId: eventId.guidString,
            event: {
                date: date.encoded,
                title: 'title',
                isImportant: false
            }
        });
        const databaseValue = await database.child('events').child('general').child(eventId.guidString).get('decrypt');
        expect(databaseValue).toEqual({
            date: date.encoded,
            title: 'title',
            isImportant: false
        });
    });

    it('update event', async () => {
        const eventId = Guid.newGuid();
        await database.child('events').child('general').child(eventId.guidString).set({
            date: UtcDate.now.encoded,
            title: 'title',
            isImportant: false
        }, 'encrypt');
        const date = UtcDate.now;
        await firebaseApi.function('event').function('edit').call({
            editType: 'change',
            groupId: 'general',
            previousGroupId: 'general',
            eventId: eventId.guidString,
            event: {
                date: date.encoded,
                title: 'title2',
                isImportant: false
            }
        });
        const databaseValue = await database.child('events').child('general').child(eventId.guidString).get('decrypt');
        expect(databaseValue).toEqual({
            date: date.encoded,
            title: 'title2',
            isImportant: false
        });
    });

    it('get event', async () => {
        const date1 = UtcDate.now.advanced({ minute: 50 });
        const eventId1 = Guid.newGuid();
        await database.child('events').child('general').child(eventId1.guidString).set({
            date: date1.encoded,
            title: 'event1',
            isImportant: false
        }, 'encrypt');
        const date2 = UtcDate.now.advanced({ minute: 30 });
        const eventId2 = Guid.newGuid();
        await database.child('events').child('general').child(eventId2.guidString).set({
            date: date2.encoded,
            title: 'event2',
            isImportant: false
        }, 'encrypt');
        const date3 = UtcDate.now.advanced({ minute: 20 });
        const eventId3 = Guid.newGuid();
        await database.child('events').child('football-adults/first-team').child(eventId3.guidString).set({
            date: date3.encoded,
            title: 'event3',
            isImportant: false
        }, 'encrypt');
        const date4 = UtcDate.now.advanced({ minute: -30 });
        const eventId4 = Guid.newGuid();
        await database.child('events').child('football-adults/first-team').child(eventId4.guidString).set({
            date: date4.encoded,
            title: 'event4',
            isImportant: false
        }, 'encrypt');
        const result = await firebaseApi.function('event').function('get').call({
            groupIds: ['general', 'football-adults/first-team']
        });
        expect(result).toEqual([
            {
                groupId: 'general',
                events: [
                    {
                        id: eventId2.guidString,
                        date: date2.encoded,
                        title: 'event2',
                        isImportant: false
                    },
                    {
                        id: eventId1.guidString,
                        date: date1.encoded,
                        title: 'event1',
                        isImportant: false
                    }
                ]
            },
            {
                groupId: 'football-adults/first-team',
                events: [
                    {
                        id: eventId3.guidString,
                        date: date3.encoded,
                        title: 'event3',
                        isImportant: false
                    }
                ]
            }
        ]);
    });

    it('accept waiting user', async () => {
        await database.child('users').child('authentication').child('editEvents').child('asdf').set({
            state: 'unauthenticated',
            firstName: 'first',
            lastName: 'last'
        }, 'encrypt');
        await firebaseApi.function('userAuthentication').function('acceptDecline').call({
            authenticationTypes: ['editEvents'],
            hashedUserId: 'asdf',
            action: 'accept'
        });
        const databaseValue = await database.child('users').child('authentication').child('editEvents').child('asdf').get('decrypt');
        expect(databaseValue).toEqual({
            state: 'authenticated',
            firstName: 'first',
            lastName: 'last'
        });
    });

    it('decline waiting user', async () => {
        await database.child('users').child('authentication').child('editEvents').child('asdf').set({
            state: 'unauthenticated',
            firstName: 'first',
            lastName: 'last'
        }, 'encrypt');
        await firebaseApi.function('userAuthentication').function('acceptDecline').call({
            authenticationTypes: ['editEvents'],
            hashedUserId: 'asdf',
            action: 'decline'
        });
        const existsValue = await database.child('users').child('authentication').child('editEvents').child('asdf').exists();
        expect(existsValue).toBeFalse();
    });

    it('add user for waiting', async () => {
        const user = await firebaseAuth.currentUser;
        expect(user).not.toBeNull();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const hashedUserId = Crypter.sha512(user!.uid);
        await database.child('users').child('authentication').child('editReports').child(hashedUserId).remove();
        await firebaseApi.function('userAuthentication').function('add').call({
            authenticationTypes: ['editReports'],
            firstName: 'first',
            lastName: 'last'
        });
        const databaseValue = await database.child('users').child('authentication').child('editReports').child(hashedUserId).get('decrypt');
        expect(databaseValue).toEqual({
            state: 'unauthenticated',
            firstName: 'first',
            lastName: 'last'
        });
    });

    async function addUser(number: number, state: 'authenticated' | 'unauthenticated'): Promise<UserAuthenticationGetAllUnauthenticatedFunction.User> {
        const user: UserAuthenticationGetAllUnauthenticatedFunction.User = {
            hashedUserId: `user_id_${number}`,
            firstName: `first_${number}`,
            lastName: `last_${number}`
        };
        await database.child('users').child('authentication').child('editReports').child(`user_id_${number}`).set({
            firstName: user.firstName,
            lastName: user.lastName,
            state: state
        }, 'encrypt');
        return user;
    }

    it('get unauthenticated users', async () => {
        const user1 = await addUser(1, 'unauthenticated');
        await addUser(2, 'authenticated');
        const user3 = await addUser(3, 'unauthenticated');
        const user4 = await addUser(4, 'unauthenticated');
        await addUser(5, 'authenticated');
        await addUser(6, 'authenticated');
        const result = await firebaseApi.function('userAuthentication').function('getAllUnauthenticated').call({
            authenticationTypes: ['editReports']
        });
        expect(result).toEqual([
            user1, user3, user4
        ]);
    });
});
