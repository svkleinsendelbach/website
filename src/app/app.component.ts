import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppearanceColor, AuthenticationService, Color, CookieSelectorComponent, DeviceTypeService, EnvironmentService, FirebaseApiService, FooterComponent, HeaderComponent, LinkService, RecaptchaVerificationService, StyleConfigService } from 'kleinsendelbach-website-library';
import { environment } from './environment/environment';
import { Environment } from './types/environment';
import { footerConfig } from './config/footer.config';
import { headerConfig } from './config/header.config';
import { InternalPathKey, internalPaths } from './types/internal-paths';
import { FirebaseFunctions, firebaseFunctionResultMappers } from './types/firebase-functions';
import { UserRole } from './types/user-role';
import Crate from '@widgetbot/crate';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, CookieSelectorComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass'
})
export class AppComponent {

    public headerData = headerConfig;

    public footerData = footerConfig;

    constructor(
        private readonly authenticationService: AuthenticationService<UserRole>,
        private readonly environmentService: EnvironmentService<Environment>,
        private readonly firebaseApiService: FirebaseApiService<FirebaseFunctions>,
        private readonly linkService: LinkService<InternalPathKey>,
        private readonly recaptchaVerificationService: RecaptchaVerificationService,
        private readonly styleConfigService: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {
        if (this.deviceType.isDesktop) {
            new Crate({
                server: '1083387091423072419',
                channel: '1083387096179421239',
                location:  ['bottom', 'left']
            });
        }
        this.environmentService.setup(environment);
        this.firebaseApiService.setup(firebaseFunctionResultMappers);
        this.authenticationService.setup(async () => (await this.firebaseApiService.function('user-getRoles').call({})).get());
        this.recaptchaVerificationService.setup(async (token) => await this.firebaseApiService.function('verifyRecaptcha').call({ token: token }));
        this.linkService.setup(internalPaths, 'https://svkleinsendelbach-website.web.app');
        this.styleConfigService.setup({
            primary: new AppearanceColor(Color.hex('#C90024'), Color.hex('#C4354F')),
            accent: new AppearanceColor(Color.hex('#FFD93D'), Color.hex('#F2BE22')),
            background: new AppearanceColor(Color.hex('#FFFFFF'), Color.hex('#24252A')),
            hoveredBackground: new AppearanceColor(Color.hex('#E0E0E0'), Color.hex('#44454A')),
            shadow: new AppearanceColor(Color.hex('#80808080'), Color.hex('#80808080')),
            text: new AppearanceColor(Color.hex('#24252A'), Color.hex('#C8D6E5')),
            secondaryText: new AppearanceColor(Color.hex('#868E90'), Color.hex('#868E90')),
            formStatusSuccess: new AppearanceColor(Color.hex('#54B435'), Color.hex('#B6E2A1')),
            formStatusError: new AppearanceColor(Color.hex('#CE3A0F'), Color.hex('#EB4511')),
            formStatusInfo: new AppearanceColor(Color.hex('#868E90'), Color.hex('#868E90')),
            pageBackground: new AppearanceColor(Color.hex('#F0F0F0'), Color.hex('#2C3A47'))
        });
    }

    @HostListener('window:resize') public onResize() {
        this.deviceType.windowResized();
    }
}
