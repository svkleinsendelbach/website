export type UserRole = 'admin' | 'occupancyManager' | 'websiteManager';

export namespace UserRole {
    export const all: UserRole[] = ['admin', 'websiteManager', 'occupancyManager'];

    export const title: Record<UserRole, string> = {
        'admin': 'Admin',
        'websiteManager': 'Website Manager',
        'occupancyManager': 'Belegungsplan'
    };
}
