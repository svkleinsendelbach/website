export type UserAuthenticationType = 'editEvents' | 'editNews' | 'editReports' | 'authenticateUser' | 'notification';

export type UserAuthentication = {
    state: 'authenticated' | 'unauthenticated';
    firstName: string;
    lastName: string;
};
