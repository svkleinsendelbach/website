import { AngularFireFunctions, REGION } from '@angular/fire/compat/functions';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { Crypter } from '../../crypter/services/crypter.service';
import { DatabaseManagerTestService } from '../services/database-manager.service';
import { FirebaseApiService } from '../services/firebase-api.service';
import { Guid } from '../../../types/guid';
import { TestBed } from '@angular/core/testing';
import { UtcDate } from 'src/app/types/utc-date';
import { environment } from 'src/environments/environment';

/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
describe('ApiService', () => {
    let firebaseApi: FirebaseApiService;
    let firebaseAuth: AngularFireAuth;
    let database: DatabaseManagerTestService;

    beforeEach(async () => {
        expect(environment.name).toBe('test');
        TestBed.configureTestingModule({
            imports: [AngularFireModule.initializeApp(environment.firebase)],
            providers: [
                AngularFireFunctions,
                AngularFireDatabase,
                AngularFireAuth,
                { provide: REGION,
                    useValue: 'europe-west1' }
            ]
        });
        firebaseApi = TestBed.inject(FirebaseApiService);
        firebaseAuth = TestBed.inject(AngularFireAuth);
        database = TestBed.inject(DatabaseManagerTestService);
        expect(firebaseApi).toBeTruthy();
        expect(firebaseAuth).toBeTruthy();
        expect(database).toBeTruthy();
        expect(environment.testUser).not.toBeNull();
        const credential = await firebaseAuth.signInWithEmailAndPassword(environment.testUser!.email, environment.testUser!.password);
        expect(credential.user).not.toBeNull();
        const hashedUserId = Crypter.sha512(credential.user!.uid);
        const authenticationTypes: UserAuthenticationType[] = ['editEvents', 'editReports', 'authenticateUser', 'notification'];
        for (const authenticationType of authenticationTypes) {
            // eslint-disable-next-line no-await-in-loop
            await database.child('users').child('authentication')
                .child(authenticationType)
                .child(hashedUserId)
                .set({
                    firstName: 'test',
                    lastName: 'user',
                    state: 'authenticated'
                }, 'encrypt');
        }
    });

    afterEach(async () => {
        await firebaseAuth.signOut();
        await firebaseApi.function('deleteAllData').call({});
    });

    it('remove event', async () => {
        const eventId = Guid.newGuid();
        await database.child('events').child('general')
            .child(eventId.guidString)
            .set({
                date: UtcDate.now.encoded,
                isImportant: false,
                link: null,
                subtitle: null,
                title: 'title'
            }, 'encrypt');
        expect(await database.child('events').child('general')
            .child(eventId.guidString)
            .exists()).toBeTrue();
        await firebaseApi.function('event').function('edit')
            .call({
                editType: 'remove',
                event: null,
                eventId: eventId.guidString,
                groupId: 'general',
                previousGroupId: null
            });
        expect(await database.child('events').child('general')
            .child(eventId.guidString)
            .exists()).toBeFalse();
    });

    it('add event', async () => {
        const eventId = Guid.newGuid();
        const date = UtcDate.now;
        await firebaseApi.function('event').function('edit')
            .call({
                editType: 'add',
                event: {
                    date: date.encoded,
                    isImportant: false,
                    link: null,
                    subtitle: null,
                    title: 'title'
                },
                eventId: eventId.guidString,
                groupId: 'general',
                previousGroupId: null
            });
        const databaseValue = await database.child('events').child('general')
            .child(eventId.guidString)
            .get('decrypt');
        expect(databaseValue).toEqual({
            date: date.encoded,
            isImportant: false,
            link: null,
            subtitle: null,
            title: 'title'
        });
    });

    it('update event', async () => {
        const eventId = Guid.newGuid();
        await database.child('events').child('general')
            .child(eventId.guidString)
            .set({
                date: UtcDate.now.encoded,
                isImportant: false,
                link: null,
                subtitle: null,
                title: 'title'
            }, 'encrypt');
        const date = UtcDate.now;
        await firebaseApi.function('event').function('edit')
            .call({
                editType: 'change',
                event: {
                    date: date.encoded,
                    isImportant: false,
                    link: null,
                    subtitle: null,
                    title: 'title2'
                },
                eventId: eventId.guidString,
                groupId: 'general',
                previousGroupId: 'general'
            });
        const databaseValue = await database.child('events').child('general')
            .child(eventId.guidString)
            .get('decrypt');
        expect(databaseValue).toEqual({
            date: date.encoded,
            isImportant: false,
            link: null,
            subtitle: null,
            title: 'title2'
        });
    });

    it('get event', async () => {
        const date1 = UtcDate.now.advanced({ minute: 50 });
        const eventId1 = Guid.newGuid();
        await database.child('events').child('general')
            .child(eventId1.guidString)
            .set({
                date: date1.encoded,
                isImportant: false,
                link: null,
                subtitle: null,
                title: 'event1'
            }, 'encrypt');
        const date2 = UtcDate.now.advanced({ minute: 30 });
        const eventId2 = Guid.newGuid();
        await database.child('events').child('general')
            .child(eventId2.guidString)
            .set({
                date: date2.encoded,
                isImportant: false,
                link: null,
                subtitle: null,
                title: 'event2'
            }, 'encrypt');
        const date3 = UtcDate.now.advanced({ minute: 20 });
        const eventId3 = Guid.newGuid();
        await database.child('events').child('football-adults/first-team')
            .child(eventId3.guidString)
            .set({
                date: date3.encoded,
                isImportant: false,
                link: null,
                subtitle: null,
                title: 'event3'
            }, 'encrypt');
        const date4 = UtcDate.now.advanced({ minute: -30 });
        const eventId4 = Guid.newGuid();
        await database.child('events').child('football-adults/first-team')
            .child(eventId4.guidString)
            .set({
                date: date4.encoded,
                isImportant: false,
                link: null,
                subtitle: null,
                title: 'event4'
            }, 'encrypt');
        const result = await firebaseApi.function('event').function('get')
            .call({
                groupIds: ['general', 'football-adults/first-team']
            });
        expect(result).toEqual([
            {
                events: [
                    {
                        date: date2.encoded,
                        id: eventId2.guidString,
                        isImportant: false,
                        link: null,
                        subtitle: null,
                        title: 'event2'
                    },
                    {
                        date: date1.encoded,
                        id: eventId1.guidString,
                        isImportant: false,
                        link: null,
                        subtitle: null,
                        title: 'event1'
                    }
                ],
                groupId: 'general'
            },
            {
                events: [
                    {
                        date: date3.encoded,
                        id: eventId3.guidString,
                        isImportant: false,
                        link: null,
                        subtitle: null,
                        title: 'event3'
                    }
                ],
                groupId: 'football-adults/first-team'
            }
        ]);
    });

    it('accept waiting user', async () => {
        await database.child('users').child('authentication')
            .child('editEvents')
            .child('asdf')
            .set({
                firstName: 'first',
                lastName: 'last',
                state: 'unauthenticated'
            }, 'encrypt');
        await firebaseApi.function('userAuthentication').function('acceptDecline')
            .call({
                action: 'accept',
                authenticationTypes: ['editEvents'],
                hashedUserId: 'asdf'
            });
        const databaseValue = await database.child('users').child('authentication')
            .child('editEvents')
            .child('asdf')
            .get('decrypt');
        expect(databaseValue).toEqual({
            firstName: 'first',
            lastName: 'last',
            state: 'authenticated'
        });
    });

    it('decline waiting user', async () => {
        await database.child('users').child('authentication')
            .child('editEvents')
            .child('asdf')
            .set({
                firstName: 'first',
                lastName: 'last',
                state: 'unauthenticated'
            }, 'encrypt');
        await firebaseApi.function('userAuthentication').function('acceptDecline')
            .call({
                action: 'decline',
                authenticationTypes: ['editEvents'],
                hashedUserId: 'asdf'
            });
        const existsValue = await database.child('users').child('authentication')
            .child('editEvents')
            .child('asdf')
            .exists();
        expect(existsValue).toBeFalse();
    });

    it('add user for waiting', async () => {
        const user = await firebaseAuth.currentUser;
        expect(user).not.toBeNull();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const hashedUserId = Crypter.sha512(user!.uid);
        await database.child('users').child('authentication')
            .child('editReports')
            .child(hashedUserId)
            .remove();
        await firebaseApi.function('userAuthentication').function('add')
            .call({
                authenticationTypes: ['editReports'],
                firstName: 'first',
                lastName: 'last'
            });
        const databaseValue = await database.child('users').child('authentication')
            .child('editReports')
            .child(hashedUserId)
            .get('decrypt');
        expect(databaseValue).toEqual({
            firstName: 'first',
            lastName: 'last',
            state: 'unauthenticated'
        });
    });

    async function addUser(number: number, state: 'authenticated' | 'unauthenticated'): Promise<UserAuthenticationGetAllUnauthenticatedFunction.User> {
        const user: UserAuthenticationGetAllUnauthenticatedFunction.User = {
            firstName: `first_${number}`,
            hashedUserId: `user_id_${number}`,
            lastName: `last_${number}`
        };
        await database.child('users').child('authentication')
            .child('editReports')
            .child(`user_id_${number}`)
            .set({
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
        const result = await firebaseApi.function('userAuthentication').function('getAllUnauthenticated')
            .call({
                authenticationTypes: ['editReports']
            });
        expect(result).toEqual([user1, user3, user4]);
    });
});
