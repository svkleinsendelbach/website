export type UserAuthenticationType = 'authenticateUser' | 'editEvents' | 'editReports' | 'notification';

export type UserAuthentication = {
    state: 'authenticated' | 'unauthenticated';
    firstName: string;
    lastName: string;
};

export namespace UserAuthenticationType {
    export const all: UserAuthenticationType[] = ['editEvents', 'editReports', 'authenticateUser', 'notification'];
}
