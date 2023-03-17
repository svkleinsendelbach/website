import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireFunctions, REGION } from '@angular/fire/compat/functions';
import { environment } from 'src/environments/environment';
import { FirebaseApiService } from './firebase-api.service';
import { FirebaseFunctions } from '../firebase-functions';
import { DatabaseManagerTestService } from './database-manager.service';
import { DatabaseScheme } from '../database-scheme';
import { UserAuthenticationType } from '../types/user-authentication';
import { Crypter } from '../crypter/Crypter';
import { Guid } from '../types/guid';
import { News } from '../types/news';
import { UserAuthenticationGetAllUnauthenticatedFunction } from '../function-types';

describe('ApiService', () => {
    let firebaseApi: FirebaseApiService<FirebaseFunctions>;
    let database: DatabaseManagerTestService<DatabaseScheme>;
    let firebaseAuth: AngularFireAuth;

    beforeEach(async() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
        expect(environment.name).toBe('test');
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebase)
            ],
            providers: [
                AngularFireFunctions,
                AngularFireDatabase,
                AngularFireAuth,
                { provide: REGION, useValue: 'europe-west1' },
            ]
        });
        firebaseApi = TestBed.inject(FirebaseApiService);
        expect(firebaseApi).toBeTruthy();
        firebaseAuth = TestBed.inject(AngularFireAuth);
        database = TestBed.inject(DatabaseManagerTestService<DatabaseScheme>);
        expect(environment.testUser).not.toBeUndefined();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const credential = await firebaseAuth.signInWithEmailAndPassword(environment.testUser!.email, environment.testUser!.password);
        expect(credential.user).not.toBeNull();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const hashedUserId = Crypter.sha512(credential.user!.uid);
        const authenticationTypes: UserAuthenticationType[] = ['editEvents', 'editNews', 'editReports', 'authenticateUser', 'notification'];
        for (const authenticationType of authenticationTypes) {
            await database.child('users').child('authentication').child(authenticationType).child(hashedUserId).set({
                state: 'authenticated',
                firstName: 'test',
                lastName: 'user'
            }, 'encrypt');
        }
    });

    afterEach(async() => {
        await firebaseAuth.signOut();
        await firebaseApi.function('deleteAllData').call({});
    });

    it('remove event', async() => {
        const eventId = Guid.newGuid();
        await database.child('events').child('general').child(eventId.guidString).set({
            date: new Date().toISOString(),
            title: 'title'
        }, 'encrypt');
        expect(await database.child('events').child('general').child(eventId.guidString).exists()).toBeTrue();
        await firebaseApi.function('event').function('edit').call({
            editType: 'remove',
            groupId: 'general',
            eventId: eventId.guidString,
            event: undefined
        });
        expect(await database.child('events').child('general').child(eventId.guidString).exists()).toBeFalse();
    });

    it('add event', async() => {
        const eventId = Guid.newGuid();
        const date = new Date();
        await firebaseApi.function('event').function('edit').call({
            editType: 'add',
            groupId: 'general',
            eventId: eventId.guidString,
            event: {
                date: date.toISOString(),
                title: 'title'
            }
        });
        const databaseValue = await database.child('events').child('general').child(eventId.guidString).get('decrypt');
        expect(databaseValue).toEqual({
            date: date.toISOString(),
            title: 'title'
        });
    });

    it('update event', async() => {
        const eventId = Guid.newGuid();
        await database.child('events').child('general').child(eventId.guidString).set({
            date: new Date().toISOString(),
            title: 'title'
        }, 'encrypt');
        const date = new Date();
        await firebaseApi.function('event').function('edit').call({
            editType: 'change',
            groupId: 'general',
            eventId: eventId.guidString,
            event: {
                date: date.toISOString(),
                title: 'title2'
            }
        });
        const databaseValue =await database.child('events').child('general').child(eventId.guidString).get('decrypt');
        expect(databaseValue).toEqual({
            date: date.toISOString(),
            title: 'title2'
        });
    });

    it('get event', async() => {
        const date1 = new Date(new Date().getTime() + 50000);
        const eventId1 = Guid.newGuid();
        await database.child('events').child('general').child(eventId1.guidString).set({
            date: date1.toISOString(),
            title: 'event1'
        }, 'encrypt');
        const date2 = new Date(new Date().getTime() + 30000);
        const eventId2 = Guid.newGuid();
        await database.child('events').child('general').child(eventId2.guidString).set({
            date: date2.toISOString(),
            title: 'event2'
        }, 'encrypt');
        const date3 = new Date(new Date().getTime() + 20000);
        const eventId3 = Guid.newGuid();
        await database.child('events').child('football-adults/first-team').child(eventId3.guidString).set({
            date: date3.toISOString(),
            title: 'event3'
        }, 'encrypt');
        const date4 = new Date(new Date().getTime() - 30000);
        const eventId4 = Guid.newGuid();
        await database.child('events').child('football-adults/first-team').child(eventId4.guidString).set({
            date: date4.toISOString(),
            title: 'event4'
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
                        date: date2.toISOString(),
                        title: 'event2'
                    },
                    {
                        id: eventId1.guidString,
                        date: date1.toISOString(),
                        title: 'event1'
                    }
                ]
            },
            {
                groupId: 'football-adults/first-team',
                events: [
                    {
                        id: eventId3.guidString,
                        date: date3.toISOString(),
                        title: 'event3'
                    }
                ]
            }
        ]);
    });

    async function addNews(number: number, disabled: boolean): Promise<News.Flatten> {
        const news = {
            title: `title${number}`,
            subtitle: `subtitle${number}`,
            date: new Date(new Date().getTime() + number * 100000).toISOString(),
            shortDescription: `shortDescription${number}`,
            newsUrl: `newsUrl${number}`,
            disabled: disabled,
            thumbnailUrl: `tumbnailUrl${number}`
        };
        await database.child('news').child(`news_id_${number}`).set(news, 'encrypt');
        return {
            id: `news_id_${number}`,
            ...news
        };
    }

    it('enable news', async () => {
        const news = await addNews(0, true);
        await firebaseApi.function('news').function('disable').call({
            editType: 'enable',
            newsId: news.id
        });
        expect((await database.child('news').child(news.id).get('decrypt')).disabled).toBeFalse();
    });

    it('disable news', async () => {
        const news = await addNews(0, false);
        await firebaseApi.function('news').function('disable').call({
            editType: 'disable',
            newsId: news.id
        });
        expect((await database.child('news').child(news.id).get('decrypt')).disabled).toBeTrue();
    });

    it('remove news', async() => {
        const news = await addNews(0, false);
        const result = await firebaseApi.function('news').function('edit').call({
            editType: 'remove',
            newsId: news.id,
            news: undefined
        });
        expect(result).toEqual(news.id);
        expect(await database.child('news').child(news.id).exists()).toBeFalse();
    });

    it('add news', async() => {
        const date = new Date();
        const result = await firebaseApi.function('news').function('edit').call({
            editType: 'add',
            newsId: 'news_id',
            news: {
                date: date.toISOString(),
                title: 'title',
                newsUrl: 'newsUrls',
                disabled: true,
                thumbnailUrl: 'thumbnailUrl'
            }
        });
        expect(result).toEqual('news_id');
        const databaseValue = await database.child('news').child('news_id').get('decrypt');
        expect(databaseValue).toEqual({
            date: date.toISOString(),
            title: 'title',
            newsUrl: 'newsUrls',
            disabled: true,
            thumbnailUrl: 'thumbnailUrl'
        });
    });

    it('update news', async() => {
        const news = await addNews(1, true);
        const date = new Date();
        const result = await firebaseApi.function('news').function('edit').call({
            editType: 'change',
            newsId: news.id,
            news: {
                date: date.toISOString(),
                title: 'title2',
                newsUrl: 'newsUrls2',
                disabled: false,
                thumbnailUrl: 'thumbnailUrl2'
            }
        });
        expect(result).toEqual('news_id_1');
        const databaseValue = await database.child('news').child(news.id).get('decrypt');
        expect(databaseValue).toEqual({
            date: date.toISOString(),
            title: 'title2',
            newsUrl: 'newsUrls2',
            disabled: false,
            thumbnailUrl: 'thumbnailUrl2'
        });
    });

    it('get news', async() => {
        const news3 = await addNews(3, false);
        const news4 = await addNews(4, false);
        await addNews(5, true);
        const news1 = await addNews(1, false);
        await addNews(2, true);
        const result1 = await firebaseApi.function('news').function('get').call({
            numberNews: undefined,
            alsoDisabled: false
        });
        expect(result1).toEqual({
            hasMore: false,
            news: [news4, news3, news1]
        });
        const result2 = await firebaseApi.function('news').function('get').call({
            numberNews: 5,
            alsoDisabled: false
        });
        expect(result2).toEqual({
            hasMore: false,
            news: [news4, news3, news1]
        });
        const result3 = await firebaseApi.function('news').function('get').call({
            numberNews: 3,
            alsoDisabled: false
        });
        expect(result3).toEqual({
            hasMore: false,
            news: [news4, news3, news1]
        });
        const result4 = await firebaseApi.function('news').function('get').call({
            numberNews: 1,
            alsoDisabled: false
        });
        expect(result4).toEqual({
            hasMore: true,
            news: [news4]
        });
    });

    it('get single news', async() => {
        const news = await addNews(1, false);
        const result = await firebaseApi.function('news').function('getSingle').call({
            newsId: 'news_id_1'
        });
        expect(result).toEqual(news);
    });

    it('accept waiting user', async() => {
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

    it('decline waiting user', async() => {
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

    it('add user for waiting', async() => {
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
        await database.child('users').child('authentication').child('editNews').child(`user_id_${number}`).set({
            firstName: user.firstName,
            lastName: user.lastName,
            state: state
        }, 'encrypt');
        return user;
    }

    it('get unauthenticated users', async() => {
        const user1 = await addUser(1, 'unauthenticated');
        await addUser(2, 'authenticated');
        const user3 = await addUser(3, 'unauthenticated');
        const user4 = await addUser(4, 'unauthenticated');
        await addUser(5, 'authenticated');
        await addUser(6, 'authenticated');
        const result = await firebaseApi.function('userAuthentication').function('getAllUnauthenticated').call({
            authenticationTypes: ['editNews']
        });
        expect(result).toEqual([
            user1, user3, user4
        ]);
    });
});
