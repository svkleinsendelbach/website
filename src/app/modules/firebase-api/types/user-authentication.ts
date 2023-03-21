export type UserAuthenticationType = 'editEvents' | 'editReports' | 'authenticateUser' | 'notification';

export type UserAuthentication = {
    state: 'authenticated' | 'unauthenticated';
    firstName: string;
    lastName: string;
};
