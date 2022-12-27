import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { eventGroupDescription, EventGroupId } from 'src/app/app.component';
import { ContactInfoComponent } from 'src/app/template/components/contact-info/contact-info.component';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-first-team',
  templateUrl: './first-team.component.html',
  styleUrls: ['./first-team.component.sass']
})
export class FirstTeamComponent {
  public eventGroupDescription = eventGroupDescription

  public readonly eventGroupIds: EventGroupId[] = [
    'football-adults/first-team'
  ]

  public readonly teamId = '02EO9A1SNG000000VS5489B2VSAS84KM'

  public readonly contactData: ContactInfoComponent.ContactItem[] = [
    {
      function: 'Abteilungsleiter Fußball',
      name: 'Josef Hoier',
      mobile: {
        number: '017657857884',
        text: '0176 / 57857884'
      }
    },
    {
      function: 'Trainer',
      name: 'Simon Müller',
      mobile: {
        number: '015901094261',
        text: '0159 / 01094261'
      }
    }
  ]

  public readonly mapOptions: google.maps.MapOptions = {
    zoom: 14,
    center: {
      lat: 49.589936,
      lng: 11.162849
    },
    scrollwheel: false,
    maxZoom: 18,
    minZoom: 5
  }

  public readonly mapMarkers: google.maps.LatLngLiteral[] = [
    {
      lat: 49.589936,
      lng: 11.162849
    }
  ]

  public readonly squadParametersPath = 'teamParameters/first-team'

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {
    this.titleService.setTitle('Erste Mannschaft')
  }
}
