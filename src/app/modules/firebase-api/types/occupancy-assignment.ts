import { Guid } from './guid';

export type OccupancyAssignment = {
    id: Guid;
    locationIds: Guid[];
    title: string;
    startDate: Date;
    endDate: Date;
};

export namespace OccupancyAssignment {
    export type Flatten = {
        id: string;
        locationIds: string[];
        title: string;
        startDate: string;
        endDate: string;
    };

    export function flatten(assignment: OccupancyAssignment): OccupancyAssignment.Flatten;
    export function flatten(assignment: Omit<OccupancyAssignment, 'id'>): Omit<OccupancyAssignment.Flatten, 'id'>;
    export function flatten(assignment: OccupancyAssignment | Omit<OccupancyAssignment, 'id'>): OccupancyAssignment.Flatten | Omit<OccupancyAssignment.Flatten, 'id'> {
        return {
            ...('id' in assignment ? { id: assignment.id.guidString } : {}),
            locationIds: assignment.locationIds.map(id => id.guidString),
            title: assignment.title,
            startDate: assignment.startDate.toISOString(),
            endDate: assignment.endDate.toISOString()
        };
    }

    export function concrete(assignment: OccupancyAssignment.Flatten): OccupancyAssignment;
    export function concrete(assignment: Omit<OccupancyAssignment.Flatten, 'id'>): Omit<OccupancyAssignment, 'id'>;
    export function concrete(assignment: OccupancyAssignment.Flatten | Omit<OccupancyAssignment.Flatten, 'id'>): OccupancyAssignment | Omit<OccupancyAssignment, 'id'> {
        return {
            ...('id' in assignment ? { id: new Guid(assignment.id) } : {}),
            locationIds: assignment.locationIds.map(id => new Guid(id)),
            title: assignment.title,
            startDate: new Date(assignment.startDate),
            endDate: new Date(assignment.endDate)
        };
    }
}
