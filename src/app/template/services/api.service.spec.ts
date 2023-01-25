import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireFunctions, REGION } from '@angular/fire/compat/functions';
import { environment } from 'src/environments/environment';
import { guid } from '../classes/guid';
import { News } from '../classes/news';
import { Crypter } from '../crypter/Crypter';
import { ApiService } from './api.service';
import { DatabaseManagerTestService } from './test-services/database-manager.service';
import { teamSquadData } from 'src/test/dataset/teamSquadData';
import { GetUnauthenticatedUsersFunction } from './api-functions-types';

type ArrayElement<T> = T extends (infer Element)[] ? Element : never;

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
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
    service = TestBed.inject(ApiService);
    expect(service).toBeTruthy();
    const firebaseAuth = TestBed.inject(AngularFireAuth);
    const databaseManager = TestBed.inject(DatabaseManagerTestService);
    expect(environment.testUser).not.toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const credential = await firebaseAuth.signInWithEmailAndPassword(environment.testUser!.email, environment.testUser!.password);
    expect(credential.user).not.toBeNull();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const hashedUserId = Crypter.sha512(credential.user!.uid);
    const crypter = new Crypter(environment.cryptionKeys);
    await databaseManager.setValue(`users/authentication/websiteEditing/${hashedUserId}`, crypter.encodeEncrypt({
        state: 'authenticated',
        firstName: 'test',
        lastName: 'user'
    }));
  });

  afterEach(async () => {
    const firebaseAuth = TestBed.inject(AngularFireAuth);
    await firebaseAuth.signOut();
    await service.deleteAllData({});
  });

  it('accept waiting user', async () => {
    const databaseManager = TestBed.inject(DatabaseManagerTestService);
    const crypter = new Crypter(environment.cryptionKeys);
    await databaseManager.setValue('users/authentication/websiteEditing/asdf', crypter.encodeEncrypt({
        state: 'unauthenticated',
        firstName: 'first',
        lastName: 'last'
    }));
    await service.acceptDeclineWaitingUser({
        type: 'websiteEditing',
        hashedUserId: 'asdf',
        action: 'accept'
    });
    const databaseValue = await databaseManager.getDecryptedValue<{
      state: 'authenticated' | 'unauthenticated',
      firstName: string,
      lastName: string
    }>('users/authentication/websiteEditing/asdf');
    expect(databaseValue).toEqual({
        state: 'authenticated',
        firstName: 'first',
        lastName: 'last'
    });
  });

  it('decline waiting user', async () => {
    const databaseManager = TestBed.inject(DatabaseManagerTestService);
    const crypter = new Crypter(environment.cryptionKeys);
    await databaseManager.setValue('users/authentication/websiteEditing/asdf', crypter.encodeEncrypt({
        state: 'unauthenticated',
        firstName: 'first',
        lastName: 'last'
    }));
    await service.acceptDeclineWaitingUser({
        type: 'websiteEditing',
        hashedUserId: 'asdf',
        action: 'decline'
    });
    const existsValue = await databaseManager.existsValue('users/authentication/websiteEditing/asdf');
    expect(existsValue).toBeFalse();
  });

  it('add user for waiting', async () => {
    const firebaseAuth = TestBed.inject(AngularFireAuth);
    const databaseManager = TestBed.inject(DatabaseManagerTestService);
    const user = await firebaseAuth.currentUser;
    expect(user).not.toBeNull();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const hashedUserId = Crypter.sha512(user!.uid);
    await databaseManager.removeValue(`users/authentication/websiteEditing/${hashedUserId}`);
    await service.addUserForWaiting({
        type: 'websiteEditing',
        firstName: 'first',
        lastName: 'last'
    });
    const databaseValue = await databaseManager.getDecryptedValue<{
      state: 'authenticated' | 'unauthenticated',
      firstName: string,
      lastName: string
    }>(`users/authentication/websiteEditing/${hashedUserId}`);
    expect(databaseValue).toEqual({
        state: 'unauthenticated',
        firstName: 'first',
        lastName: 'last'
    });

  });

  it('remove event', async () => {
    const databaseManager = TestBed.inject(DatabaseManagerTestService);
    const eventId = guid.newGuid();
    await databaseManager.setValue(`events/general/${eventId.guidString}`, {
        date: new Date().toISOString(),
        title: 'title'
    });
    expect(await databaseManager.existsValue(`events/general/${eventId.guidString}`)).toBeTrue();
    await service.editEvent({
        editType: 'remove',
        groupId: 'general',
        eventId: eventId.guidString,
        event: undefined
    });
    expect(await databaseManager.existsValue(`events/general/${eventId.guidString}`)).toBeFalse;
  });

  it('add event', async () => {
    const databaseManager = TestBed.inject(DatabaseManagerTestService);
    const eventId = guid.newGuid();
    const date = new Date();
    await service.editEvent({
        editType: 'add',
        groupId: 'general',
        eventId: eventId.guidString,
        event: {
            date: date.toISOString(),
            title: 'title'
        }
    });
    const databaseValue = await databaseManager.getValue(`events/general/${eventId.guidString}`);
    expect(databaseValue).toEqual({
        date: date.toISOString(),
        title: 'title'
    });
  });

  it('update event', async () => {
    const databaseManager = TestBed.inject(DatabaseManagerTestService);
    const eventId = guid.newGuid();
    await databaseManager.setValue(`events/general/${eventId.guidString}`, {
        date: new Date().toISOString(),
        title: 'title'
    });
    const date = new Date();
    await service.editEvent({
        editType: 'change',
        groupId: 'general',
        eventId: eventId.guidString,
        event: {
            date: date.toISOString(),
            title: 'title2'
        }
    });
    const databaseValue = await databaseManager.getValue(`events/general/${eventId.guidString}`);
    expect(databaseValue).toEqual({
        date: date.toISOString(),
        title: 'title2'
    });
  });

  it('remove news', async () => {
    const databaseManager = TestBed.inject(DatabaseManagerTestService);
    await databaseManager.setValue('news/news_id', {
        date: new Date().toISOString(),
        title: 'title'
    });
    expect(await databaseManager.existsValue('news/news_id')).toBeTrue();
    const result = await service.editNews({
        editType: 'remove',
        id: 'news_id',
        news: undefined
    });
    expect(result).toEqual('news_id');
    expect(await databaseManager.existsValue('news/news_id')).toBeFalse();
  });

  it('add news', async () => {
    const databaseManager = TestBed.inject(DatabaseManagerTestService);
    const date = new Date();
    const result = await service.editNews({
        editType: 'add',
        id: 'news_id',
        news: {
            date: date.toISOString(),
            title: 'title',
            newsUrl: 'newsUrls',
            disabled: true,
            thumbnailUrl: 'thumbnailUrl'
        }
    });
    expect(result).toEqual('news_id');
    const databaseValue = await databaseManager.getValue('news/news_id');
    expect(databaseValue).toEqual({
        date: date.toISOString(),
        title: 'title',
        newsUrl: 'newsUrls',
        disabled: true,
        thumbnailUrl: 'thumbnailUrl'
    });
  });

  it('update news', async () => {
    const databaseManager = TestBed.inject(DatabaseManagerTestService);
    await databaseManager.setValue('news/news_id', {
        date: new Date().toISOString(),
        title: 'title',
        newsUrl: 'newsUrls',
        disabled: true,
        thumbnailUrl: 'thumbnailUrl'
    });
    const date = new Date();
    const result = await service.editNews({
        editType: 'change',
        id: 'news_id',
        news: {
            date: date.toISOString(),
            title: 'title2',
            newsUrl: 'newsUrls2',
            disabled: false,
            thumbnailUrl: 'thumbnailUrl2'
        }
    });
    expect(result).toEqual('news_id');
    const databaseValue = await databaseManager.getValue('news/news_id');
    expect(databaseValue).toEqual({
        date: date.toISOString(),
        title: 'title2',
        newsUrl: 'newsUrls2',
        disabled: false,
        thumbnailUrl: 'thumbnailUrl2'
    });
  });

  it('get events', async () => {
    const databaseManager = TestBed.inject(DatabaseManagerTestService);
    const crypter = new Crypter(environment.cryptionKeys);
    const date1 = new Date(new Date().getTime() + 50000);
    const eventId1 = guid.newGuid();
    await databaseManager.setValue(`events/general/${eventId1.guidString}`, crypter.encodeEncrypt({
      date: date1.toISOString(),
      title: 'event1'
    }));
    const date2 = new Date(new Date().getTime() + 30000);
    const eventId2 = guid.newGuid();
    await databaseManager.setValue(`events/general/${eventId2.guidString}`, crypter.encodeEncrypt({
      date: date2.toISOString(),
      title: 'event2'
    }));
    const date3 = new Date(new Date().getTime() + 20000);
    const eventId3 = guid.newGuid();
    await databaseManager.setValue(`events/football-adults/first-team/${eventId3.guidString}`, crypter.encodeEncrypt({
      date: date3.toISOString(),
      title: 'event3'
    }));
    const date4 = new Date(new Date().getTime() - 30000);
    const eventId4 = guid.newGuid();
    await databaseManager.setValue(`events/football-adults/first-team/${eventId4.guidString}`, crypter.encodeEncrypt({
      date: date4.toISOString(),
      title: 'event4'
    }));
    const result = await service.getEvents({
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

  async function addNews(number: number, disabled: boolean): Promise<News.ReturnType> {
    const databaseManager = TestBed.inject(DatabaseManagerTestService);
      const crypter = new Crypter(environment.cryptionKeys);
      const news = {
          title: `title${number}`,
          subtitle: `subtitle${number}`,
          date: new Date(new Date().getTime() + number * 100000).toISOString(),
          shortDescription: `shortDescription${number}`,
          newsUrl: `newsUrl${number}`,
          disabled: disabled,
          thumbnailUrl: `tumbnailUrl${number}`
      };
      await databaseManager.setValue(`news/news_id_${number}`, crypter.encodeEncrypt(news));
      return {
          id: `news_id_${number}`,
          ...news
      };
  }

  it('get news', async () => {
    const news3 = await addNews(3, false);
    const news4 = await addNews(4, false);
    await addNews(5, true);
    const news1 = await addNews(1, false);
    await addNews(2, true);
    const result1 = await service.getNews({});
    expect(result1).toEqual({
        hasMore: false,
        news: [news4, news3, news1]
    });
    const result2 = await service.getNews({
        numberNews: 5
    });
    expect(result2).toEqual({
        hasMore: false,
        news: [news4, news3, news1]
    });
    const result3 = await service.getNews({
        numberNews: 3
    });
    expect(result3).toEqual({
        hasMore: false,
        news: [news4, news3, news1]
    });
    const result4 = await service.getNews({
        numberNews: 1
    });
    expect(result4).toEqual({
        hasMore: true,
        news: [news4]
    });
  });

  it('get single news', async () => {
    const news = await addNews(1, false);
    const result = await service.getSingleNews({
        newsId: 'news_id_1'
    });
    expect(result).toEqual(news);
  });

  it('get disabled single news', async () => {
    await addNews(1, true);
    const result = await service.getSingleNews({
        newsId: 'news_id_1'
    });
    expect(result).toBeNull();
  });

  it('get not existing single news', async () => {
    const result = await service.getSingleNews({
        newsId: 'news_id_1'
    });
    expect(result).toBeNull();
  });

  it('get team squad', async () => {
    const databaseManager = TestBed.inject(DatabaseManagerTestService);
    await databaseManager.setValue('anpfiffTeamParameter/first-team', {
        ligaId: 28,
        men: 19,
        saisonId: 124,
        spielkreis: 2,
        teamId: 30675,
        vereinId: 294
    });
    const result = await service.getTeamSquad({
        type: 'first-team'
    });
    expect(result).toEqual(teamSquadData);
  });

  async function addUser(number: number, state: 'authenticated' | 'unauthenticated'): Promise<ArrayElement<GetUnauthenticatedUsersFunction.ReturnType>> {
    const databaseManager = TestBed.inject(DatabaseManagerTestService);
      const crypter = new Crypter(environment.cryptionKeys);
      const user = {
          hashedUserId: `user_id_${number}`,
          firstName: `first_${number}`,
          lastName: `last_${number}`
      };
      await databaseManager.setValue(`users/authentication/websiteEditing/user_id_${number}`, crypter.encodeEncrypt({
          firstName: user.firstName,
          lastName: user.lastName,
          state: state
      }));
      return user;
  }

  it('get unauthenticated users', async () => {
      const user1 = await addUser(1, 'unauthenticated');
      await addUser(2, 'authenticated');
      const user3 = await addUser(3, 'unauthenticated');
      const user4 = await addUser(4, 'unauthenticated');
      await addUser(5, 'authenticated');
      await addUser(6, 'authenticated');
      const result = await service.getUnauthenticatedUsers({
          type: 'websiteEditing'
      });
      expect(result).toEqual([
          user1, user3, user4
      ]);
  });
});
