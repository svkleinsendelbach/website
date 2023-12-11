import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MapsComponent, TextSectionComponent } from 'kleinsendelbach-website-library';
import { environment } from '../../environment/environment';
import { mapsConfig } from '../../config/maps.config';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'drive-page',
    standalone: true,
    imports: [TextSectionComponent, MapsComponent, FontAwesomeModule],
    templateUrl: './drive.page.html',
    styleUrl: './drive.page.sass'
})
export class DrivePage {

    public googleMapsApiKey =  environment.googleMaps.apiKey;

    public mapOptions: google.maps.MapOptions = {
        ...mapsConfig.options,
        center: mapsConfig.coordinates['sportshome']
    }

    public mapMarkers = [
        mapsConfig.coordinates['sportshome']
    ]

    constructor(
        private readonly titleService: Title,
        private readonly faIconLibrary: FaIconLibrary
    ) {
        this.faIconLibrary.addIconPacks(fas, far, fab);
        this.titleService.setTitle('Anfahrt')
    }
}
