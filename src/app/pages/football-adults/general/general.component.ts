import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventGroupId } from 'src/app/app.component';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { eventGroupDescription } from 'src/app/app.component'
import { faMobile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.sass']
})
export class GeneralComponent {
  public eventGroupDescription = eventGroupDescription
  public faMobile = faMobile

  public readonly eventGroupIds: EventGroupId[] = [
    'football-adults/general',
    'football-adults/first-team',
    'football-adults/second-team',
    'football-adults/ah-team',
  ]

  public hoveredLink: string | null = null

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {
    this.titleService.setTitle('Herrenfußball')
  }

  public hoverLinkStart(link: string) {
    this.hoveredLink = link
  }

  public hoverLinkStop(link: string) {
    if (this.hoveredLink === link) {
      this.hoveredLink = null
    }
  }
}
