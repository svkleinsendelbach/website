import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OccupancyAssignmentGetFunctionType } from 'src/app/modules/firebase-api/function-types';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { FunctionType } from 'src/app/modules/firebase-api/types/function-type';
import { OccupancyLocation } from 'src/app/modules/firebase-api/types/occupancy-location';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { FetchState } from 'src/app/types/fetch-state';
import { InternalLink } from 'src/app/types/internal-path';

@Component({
    selector: 'app-occupancy',
    templateUrl: './occupancy.page.html',
    styleUrls: ['./occupancy.page.sass']
})
export class OccupancyPage {
    public Object = Object;

    public allInternalLinks = InternalLink.all;

    public locationsResult: FetchState<OccupancyLocation.Flatten[]> = FetchState.loading;

    public occupancyResult: FetchState<FunctionType.ReturnType<OccupancyAssignmentGetFunctionType>> = FetchState.loading;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService
    ) {
        this.titleService.setTitle('Bearbeiten');
        this.getOccupancy();
    }

    private async getOccupancy() {
        await this.firebaseApiService.function('occupancy').function('assignment').function('get').call({}).then(result => {
            const locations = Object.entries(result.locations).map(entry => {
                return { ...entry[1], id: entry[0] };
            });
            locations.sort((a, b) => a.name < b.name ? -1 : 1);
            this.locationsResult = FetchState.success(locations);
            this.occupancyResult = FetchState.success(result);
        }).catch(reason => {
            this.locationsResult = FetchState.failure(reason);
            this.occupancyResult = FetchState.failure(reason);
        });
    }

    public clicked(id: number) {
        console.log('clicked', id);
    }
}
