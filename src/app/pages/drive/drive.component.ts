import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { HeaderIntransparentService } from 'src/app/services/header-intransparent.service';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.sass'],
})
export class DriveComponent {
  public map: {
    zoom: number;
    center: google.maps.LatLngLiteral | google.maps.LatLng;
    options: google.maps.MapOptions;
    marker: (google.maps.LatLngLiteral | google.maps.LatLng)[];
  } = {
    zoom: 14,
    center: {
      lat: 49.59223121455868,
      lng: 11.15793746762878,
    },
    options: {
      scrollwheel: false,
      maxZoom: 18,
      minZoom: 5,
    },
    marker: [
      {
        lat: 49.59223121455868,
        lng: 11.15793746762878,
      },
    ],
  };

  constructor(
    private headerIntransparentService: HeaderIntransparentService,
    private titleService: Title,
    public deviceType: DeviceTypeService,
  ) {
    this.headerIntransparentService.makeIntransparent();
    this.titleService.setTitle('Anfahrt');
  }
}
