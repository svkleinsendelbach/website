import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { allHomeLinks, allSocialMediaLinks, eventGroupDescription, EventGroupId, InternalPath } from 'src/app/app.component';
import { HomeBannerComponent } from 'src/app/template/components/home-banner/home-banner.component';
import { HomeLinksComponent } from 'src/app/template/components/home-links/home-links.component';
import { SocialMediaLinksComponent } from 'src/app/template/components/social-media-links/social-media-links.component';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  public eventGroupDescription = eventGroupDescription

  public readonly bannerData: HomeBannerComponent.BannerItem[] = []

  public readonly linkData: HomeLinksComponent.LinkDataForDeviceType<InternalPath> = {
    desktop: [
      [allHomeLinks['über-uns'], allHomeLinks['fussball/herren'], allHomeLinks['fussball/jugend'], allHomeLinks.gymnastik],
      [allHomeLinks.tanzen, allHomeLinks.anfahrt, allHomeLinks.kontakt]
    ],
    tablet: [
      [allHomeLinks['über-uns'], allHomeLinks['fussball/herren']],
      [allHomeLinks['fussball/jugend'], allHomeLinks.gymnastik, allHomeLinks.tanzen],
      [allHomeLinks.anfahrt, allHomeLinks.kontakt]
    ],
    mobile: [
      [allHomeLinks['über-uns']],
      [allHomeLinks['fussball/herren']],
      [allHomeLinks['fussball/jugend']],
      [allHomeLinks.gymnastik],
      [allHomeLinks.tanzen],
      [allHomeLinks.anfahrt],
      [allHomeLinks.kontakt]
    ]
  }

  public readonly socialMediaData: SocialMediaLinksComponent.SocialMediaDataForDeviceType<InternalPath> = {
    desktop: [
      [allSocialMediaLinks.facebook, allSocialMediaLinks.instagram, allSocialMediaLinks.sgWebiste]
    ],
    tablet: [
      [allSocialMediaLinks.facebook, allSocialMediaLinks.instagram, allSocialMediaLinks.sgWebiste]
    ],
    mobile: [
      [allSocialMediaLinks.facebook],
      [allSocialMediaLinks.instagram],
      [allSocialMediaLinks.sgWebiste]
    ]
  }

  public readonly eventGroupIds: EventGroupId[] = [
    'general',
    'football-adults/general',
    'football-adults/first-team',
    'football-adults/second-team',
    'football-adults/ah-team',
    'football-youth/general',
    'football-youth/c-youth',
    'football-youth/e-youth',
    'football-youth/f-youth',
    'football-youth/g-youth',
    'gymnastics',
    'dancing'
  ]

  public constructor(
    public readonly titleService: Title,
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {
    this.titleService.setTitle('SV Kleinsendelbach')
  }
}
