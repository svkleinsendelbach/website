export type User = {
    firstName: string;
    lastName: string;
    hashedUserId: string;
    roles: User.Role[] | 'unauthenticated';
};

export namespace User {
    export type Role = 'admin' | 'occupancyManager' | 'websiteManager';

    export namespace Role {
        export const all: Role[] = ['admin', 'websiteManager', 'occupancyManager'];

        export function description(role: Role): string {
            switch (role) {
            case 'admin':
                return 'Admin';
            case 'websiteManager':
                return 'Website Manager';
            case 'occupancyManager':
                return 'Belegungsplan';
            default:
                return '';
            }
        }
    }
}
