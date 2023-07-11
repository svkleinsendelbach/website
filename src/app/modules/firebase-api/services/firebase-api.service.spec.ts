import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireFunctions, REGION } from '@angular/fire/compat/functions';
import { environment } from 'src/environments/environment';
import { FirebaseApiService } from './firebase-api.service';
import { DatabaseManagerTestService } from './database-manager.service';
import { UserAuthenticationType } from '../types/user-authentication';
import { Crypter } from '../crypter/Crypter';
import { Guid } from '../types/guid';
import { UserAuthenticationGetAllUnauthenticatedFunction } from '../function-types';
import { OccupancyAssignment } from '../types/occupancy-assignment';

fdescribe('ApiService', () => {
    let firebaseApi: FirebaseApiService;
    let database: DatabaseManagerTestService;
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
        database = TestBed.inject(DatabaseManagerTestService);
        expect(environment.testUser).not.toBeUndefined();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const credential = await firebaseAuth.signInWithEmailAndPassword(environment.testUser!.email, environment.testUser!.password);
        expect(credential.user).not.toBeNull();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const hashedUserId = Crypter.sha512(credential.user!.uid);
        const authenticationTypes: UserAuthenticationType[] = ['editEvents', 'editReports', 'authenticateUser', 'editOccupancy'];
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
            previousGroupId: undefined,
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
            previousGroupId: undefined,
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
            previousGroupId: 'general',
            eventId: eventId.guidString,
            event: {
                date: date.toISOString(),
                title: 'title2'
            }
        });
        const databaseValue = await database.child('events').child('general').child(eventId.guidString).get('decrypt');
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
        await database.child('users').child('authentication').child('editReports').child(`user_id_${number}`).set({
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
            authenticationTypes: ['editReports']
        });
        expect(result).toEqual([
            user1, user3, user4
        ]);
    });

    it('remove occupancy location', async() => {
        const locationId = Guid.newGuid();
        await database.child('occupancy').child('locations').child(locationId.guidString).set({
            name: 'sportshome',
            color: '#AB4503'
        }, 'encrypt');
        expect(await database.child('occupancy').child('locations').child(locationId.guidString).exists()).toBeTrue();
        await firebaseApi.function('occupancy').function('location').function('edit').call({
            editType: 'remove',
            locationId: locationId.guidString,
            location: undefined
        });
        expect(await database.child('occupancy').child('locations').child(locationId.guidString).exists()).toBeFalse();
    });

    it('add occupancy location', async() => {
        const locationId = Guid.newGuid();
        await firebaseApi.function('occupancy').function('location').function('edit').call({
            editType: 'add',
            locationId: locationId.guidString,
            location: {
                name: 'sportshome',
                color: '#AB4503'
            }
        });
        const databaseValue = await database.child('occupancy').child('locations').child(locationId.guidString).get('decrypt');
        expect(databaseValue).toEqual({
            name: 'sportshome',
            color: '#AB4503'
        });
    });

    it('update occupancy location', async() => {
        const locationId = Guid.newGuid();
        await database.child('occupancy').child('locations').child(locationId.guidString).set({
            name: 'sportshome',
            color: '#AB4503'
        }, 'encrypt');
        const date = new Date();
        await firebaseApi.function('occupancy').function('location').function('edit').call({
            editType: 'change',
            locationId: locationId.guidString,
            location: {
                name: 'field',
                color: '#012344'
            }
        });
        const databaseValue = await database.child('occupancy').child('locations').child(locationId.guidString).get('decrypt');
        expect(databaseValue).toEqual({
            name: 'field',
            color: '#012344'
        });
    });

    it('remove occupancy assignment', async() => {
        const assignmentId = Guid.newGuid();
        await database.child('occupancy').child('assignments').child(assignmentId.guidString).set({
            title: 'assignment 1',
            locationIds: [Guid.newGuid().guidString],
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString()
        }, 'encrypt');
        expect(await database.child('occupancy').child('assignments').child(assignmentId.guidString).exists()).toBeTrue();
        await firebaseApi.function('occupancy').function('assignment').function('edit').call({
            editType: 'remove',
            assignmentId: assignmentId.guidString,
            assignment: undefined
        });
        expect(await database.child('occupancy').child('assignments').child(assignmentId.guidString).exists()).toBeFalse();
    });

    it('add occupancy assignment', async() => {
        const assignmentId = Guid.newGuid();
        const assignment: Omit<OccupancyAssignment, 'id'> = {
            title: 'assignment 1',
            locationIds: [Guid.newGuid()],
            startDate: new Date(),
            endDate: new Date()
        }
        await firebaseApi.function('occupancy').function('assignment').function('edit').call({
            editType: 'add',
            assignmentId: assignmentId.guidString,
            assignment: OccupancyAssignment.flatten(assignment)
        });
        const databaseValue = await database.child('occupancy').child('assignments').child(assignmentId.guidString).get('decrypt');
        expect(databaseValue).toEqual(OccupancyAssignment.flatten(assignment));
    });

    it('update occupancy assignment', async() => {
        const assignmentId = Guid.newGuid();
        await database.child('occupancy').child('assignments').child(assignmentId.guidString).set({
            title: 'assignment 1',
            locationIds: [Guid.newGuid().guidString],
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString()
        }, 'encrypt');
        const assignment: Omit<OccupancyAssignment, 'id'> = {
            title: 'assignment 2',
            locationIds: [Guid.newGuid()],
            startDate: new Date(),
            endDate: new Date()
        }
        await firebaseApi.function('occupancy').function('assignment').function('edit').call({
            editType: 'change',
            assignmentId: assignmentId.guidString,
            assignment: OccupancyAssignment.flatten(assignment)
        });
        const databaseValue = await database.child('occupancy').child('assignments').child(assignmentId.guidString).get('decrypt');
        expect(databaseValue).toEqual(OccupancyAssignment.flatten(assignment));
    });

    it('get occupancy assignment', async () => {
        const locationId1 = Guid.newGuid();
        await database.child('occupancy').child('locations').child(locationId1.guidString).set({
            name: 'location 1',
            color: '#3A894F'
        }, 'encrypt');
        const locationId2 = Guid.newGuid();
        await database.child('occupancy').child('locations').child(locationId2.guidString).set({
            name: 'location 2',
            color: '#A842BB'
        }, 'encrypt');
        const endDate = new Date(new Date().getTime() + 100000);
        const date1 = new Date(new Date().getTime() + 50000);
        const assignmentId1 = Guid.newGuid();
        await database.child('occupancy').child('assignments').child(assignmentId1.guidString).set({
            locationIds: [locationId1.guidString],
            title: 'assignment 1',
            startDate: date1.toISOString(),
            endDate: endDate.toISOString()
        }, 'encrypt');
        const date2 = new Date(new Date().getTime() + 30000);
        const assignmentId2 = Guid.newGuid();
        await database.child('occupancy').child('assignments').child(assignmentId2.guidString).set({
            locationIds: [locationId2.guidString],
            title: 'assignment 2',
            startDate: date2.toISOString(),
            endDate: endDate.toISOString()
        }, 'encrypt');
        const date3 = new Date(new Date().getTime() + 20000);
        const assignmentId3 = Guid.newGuid();
        await database.child('occupancy').child('assignments').child(assignmentId3.guidString).set({
            locationIds: [locationId2.guidString],
            title: 'assignment 3',
            startDate: date3.toISOString(),
            endDate: endDate.toISOString()
        }, 'encrypt');
        const date4 = new Date(new Date().getTime() - 30000);
        const assignmentId4 = Guid.newGuid();
        await database.child('occupancy').child('assignments').child(assignmentId4.guidString).set({
            locationIds: [locationId1.guidString, locationId2.guidString],
            title: 'assignment 4',
            startDate: date4.toISOString(),
            endDate: endDate.toISOString()
        }, 'encrypt');
        const result = await firebaseApi.function('occupancy').function('assignment').function('get').call({});
        expect(result).toEqual({
            locations: {
                [locationId1.guidString]: {
                    name: 'location 1',
                    color: '#3A894F'
                },
                [locationId2.guidString]: {
                    name: 'location 2',
                    color: '#A842BB'
                }
            },
            assignments: [
                {
                    id: assignmentId4.guidString,
                    locationIds: [locationId1.guidString, locationId2.guidString],
                    title: 'assignment 4',
                    startDate: date4.toISOString(),
                    endDate: endDate.toISOString()
                },
                {
                    id: assignmentId3.guidString,
                    locationIds: [locationId2.guidString],
                    title: 'assignment 3',
                    startDate: date3.toISOString(),
                    endDate: endDate.toISOString()
                },
                {
                    id: assignmentId2.guidString,
                    locationIds: [locationId2.guidString],
                    title: 'assignment 2',
                    startDate: date2.toISOString(),
                    endDate: endDate.toISOString()
                },
                {
                    id: assignmentId1.guidString,
                    locationIds: [locationId1.guidString],
                    title: 'assignment 1',
                    startDate: date1.toISOString(),
                    endDate: endDate.toISOString()
                }
            ]
        });
    });
});
