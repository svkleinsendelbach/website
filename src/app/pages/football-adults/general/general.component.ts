import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventGroupId, InternalPath } from 'src/app/app.component';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { eventGroupDescription } from 'src/app/app.component'
import { ContactInfoComponent } from 'src/app/template/components/contact-info/contact-info.component';
import { LinksComponent } from 'src/app/template/components/links/links.component';
import { Link } from 'src/app/template/classes/link';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.sass']
})
export class GeneralComponent {
  public eventGroupDescription = eventGroupDescription

  public readonly links: LinksComponent.LinkData<InternalPath>[] = [
    {
      id: 'first-team',
      link: Link.internal('1. Mannschaft', 'fussball/herren/erste-mannschaft'),
      title: '1. Mannschaft',
      subtitle: '1. Mannschaft der SG Kleinsendelbach / Hetzles'
    },
    {
      id: 'second-team',
      link: Link.internal('2. Mannschaft', 'fussball/herren/zweite-mannschaft'),
      title: '2. Mannschaft',
      subtitle: '2. Mannschaft der SG Kleinsendelbach / Hetzles'
    },
    {
      id: 'ah-team',
      link: Link.internal('Alte Herren', 'fussball/herren/alte-herren'),
      title: 'Alte Herren',
      subtitle: 'Alte Herren des SV Kleinsendelbach'
    }
  ]

  public readonly eventGroupIds: EventGroupId[] = [
    'football-adults/general',
    'football-adults/first-team',
    'football-adults/second-team',
    'football-adults/ah-team',
  ]

  public readonly contactData: ContactInfoComponent.ContactItem[] = [
    {
      function: 'Abteilungsleiter Fußball',
      name: 'Josef Hoier',
      mobile: {
        number: '017657857884',
        text: '0176 / 57857884'
      }
    }
  ]

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {
    this.titleService.setTitle('Herrenfußball')
  }
}
