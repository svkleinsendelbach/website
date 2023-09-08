import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { InternalLink } from 'src/app/types/internal-path';
import { Link } from 'src/app/types/link';
import { Router } from '@angular/router';

@Component({
    selector: 'app-editing-navigation-bar',
    styleUrls: ['./navigation-bar.component.sass'],
    templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent {
    @Input() public backButtonLink: Link | null = null;


    public constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    public async logOut() {
        await this.authService.logOut();
        await this.router.navigateByUrl(InternalLink.all['bearbeiten/anmelden'].link);
    }
}
