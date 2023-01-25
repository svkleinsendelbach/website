import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.sass']
})
export class DriveComponent {
  public faPhone = faPhone;

  public readonly mapOptions: google.maps.MapOptions = {
    zoom: 14,
    center: {
      lat: 49.59223121455868,
      lng: 11.15793746762878,
    },
    scrollwheel: false,
    maxZoom: 18,
    minZoom: 5
  };

  public readonly mapMarkers: google.maps.LatLngLiteral[] = [
    {
      lat: 49.59223121455868,
      lng: 11.15793746762878,
    }
  ];

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {
    this.titleService.setTitle('Anfahrt');
  }
}
