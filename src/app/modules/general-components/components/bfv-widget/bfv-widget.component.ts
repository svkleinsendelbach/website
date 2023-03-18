import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { CookieService } from 'src/app/modules/cookie-selector/services/cookie.service';
import { AppearanceService } from 'src/app/services/appearance.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'bfv-widget',
    templateUrl: './bfv-widget.component.html',
    styleUrls: ['./bfv-widget.component.sass']
})
export class BfvWidgetComponent implements AfterViewInit, OnDestroy {
  @Input() public teamId!: string;

  @ViewChild('bfvWidget') public bfvWidget?: ElementRef<HTMLElement>;

  public functionalityCookiesSelected: boolean;

  public constructor(
    public deviceType: DeviceTypeService,
    public styleConfig: StyleConfigService,
    public cookieService: CookieService,
    public appearance: AppearanceService
  ) {
      this.functionalityCookiesSelected = this.cookieService.cookiesSelection?.functionality === 'selected';
      this.cookieService.listeners.add('bfv-widget-component', selection => {
          this.functionalityCookiesSelected = selection.functionality === 'selected';
          if (this.functionalityCookiesSelected)
              this.appendBfvWidgetChild();
      });
  }

  public ngAfterViewInit() {
      this.appendBfvWidgetChild();
  }

  public ngOnDestroy(): void {
      this.cookieService.listeners.remove('bfv-widget-component');
  }

  private appendBfvWidgetChild() {
      if (this.bfvWidget !== undefined)
          this.bfvWidget.nativeElement.innerHTML = '';
      const options = {
          selectedTab: 'teammatches',
          colorResults: `#24252a;}</style><link rel='stylesheet' href='${window.location.protocol}//${window.location.hostname}/assets/other/bfvWidgetStyle.css'><style type='text/css'>xy{x:y`,
          colorNav: '#edf0f1',
          colorClubName: '#1e3799',
          backgroundNav: '#24252a',
          width: '100%',
          height: '100%',
      };
      const iFrame = document.createElement('iframe');
      iFrame.setAttribute('allowFullScreen', 'true');
      iFrame.width = '100%';
      iFrame.height = '100%';
      iFrame.style.border = 'none';
      const bfvHost = `${window.location.protocol}//widget-prod.bfv.de`;
      const appPath = `widget/widgetresource/iframe${'https:' === document.location.protocol ? '/ssl' : ''}?url=${window.location.hostname}`;
      iFrame.src = `${bfvHost}/${appPath}&widget=${encodeURIComponent(`widget/team/complete/team${this.teamId}/${options.selectedTab}?css=${encodeURIComponent(JSON.stringify(options))}&referrer=${window.location.hostname}`)}`;
      this.bfvWidget?.nativeElement.appendChild(iFrame);
  }

  public acceptFunctionalityCookies() {
      this.cookieService.changeCookieSelection('functionality', 'selected');
  }
}
