import { Guid } from './guid';
import { Color } from './color';
import { type HexByte } from './hex-byte';

export type OccupancyLocation = {
    id: Guid;
    name: string;
    color: Color<HexByte>;
};

export namespace OccupancyLocation {
    export type Flatten = {
        id: string;
        name: string;
        color: string;
    };

    export function flatten(location: OccupancyLocation): OccupancyLocation.Flatten;
    export function flatten(location: Omit<OccupancyLocation, 'id'>): Omit<OccupancyLocation.Flatten, 'id'>;
    export function flatten(location: OccupancyLocation | Omit<OccupancyLocation, 'id'>): OccupancyLocation.Flatten | Omit<OccupancyLocation.Flatten, 'id'> {
        return {
            ...('id' in location ? { id: location.id.guidString } : {}),
            name: location.name,
            color: Color.flatten(location.color)
        };
    }

    export function concrete(location: OccupancyLocation.Flatten): OccupancyLocation;
    export function concrete(location: Omit<OccupancyLocation.Flatten, 'id'>): Omit<OccupancyLocation, 'id'>;
    export function concrete(location: OccupancyLocation.Flatten | Omit<OccupancyLocation.Flatten, 'id'>): OccupancyLocation | Omit<OccupancyLocation, 'id'> {
        return {
            ...('id' in location ? { id: new Guid(location.id) } : {}),
            name: location.name,
            color: Color.concrete(location.color)
        };
    }
}
