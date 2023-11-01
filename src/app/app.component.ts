import { Component, HostListener } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AngularFirePerformance } from '@angular/fire/compat/performance';
import { CookieSelectionService } from './modules/cookie-selector/services/cookie-selection.service';
import Crate from '@widgetbot/crate';
import { DeviceTypeService } from './services/device-type.service';
import { StyleConfigService } from './services/style-config.service';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.sass'],
    templateUrl: './app.component.html'
})
export class AppComponent {
    public constructor(
        public readonly deviceType: DeviceTypeService,
        private readonly styleConfig: StyleConfigService,
        private readonly cookieSelectionService: CookieSelectionService,
        private readonly fireAnalytics: AngularFireAnalytics,
        private readonly firePerformance: AngularFirePerformance
    ) {
        if (this.deviceType.current === 'desktop') {
            // eslint-disable-next-line no-new
            new Crate({
                server: '1083387091423072419',
                channel: '1083387096179421239',
                location: ['bottom', 'left']
            });
        }
        void this.fireAnalytics.setAnalyticsCollectionEnabled(this.cookieSelectionService.cookiesSelection.statistics === 'selected');
        this.firePerformance.instrumentationEnabled = (this.cookieSelectionService.cookiesSelection.statistics === 'selected') as unknown as Promise<boolean>;
        this.firePerformance.dataCollectionEnabled = (this.cookieSelectionService.cookiesSelection.statistics === 'selected') as unknown as Promise<boolean>;
        this.cookieSelectionService.listeners.add('fireAnalytics', selection => {
            void this.fireAnalytics.setAnalyticsCollectionEnabled(selection.functionality === 'selected');
            this.firePerformance.instrumentationEnabled = (selection.functionality === 'selected') as unknown as Promise<boolean>;
            this.firePerformance.dataCollectionEnabled = (selection.functionality === 'selected') as unknown as Promise<boolean>;
        });
    }

    @HostListener('window:resize') public onResize() {
        this.deviceType.windowResized();
    }
}
