import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from '../../classes/link';
import { UserAuthenticationType } from '../../services/api-functions-types';
import { AuthService } from '../../services/auth.service';
import { StyleConfigService } from '../../services/style-config.service';

@Component({
  selector: 'app-authentication-check',
  templateUrl: './authentication-check.component.html',
  styleUrls: ['./authentication-check.component.sass']
})
export class AuthenticationCheckComponent<InternalPath extends string> implements OnInit {
  @Input() public authenticationType!: UserAuthenticationType;

  @Input() public logInPageLink!: Link<InternalPath>;

  public state: AuthenticationCheckComponent.State = 'loading';

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    public styleConfig: StyleConfigService
  ) {}

  public ngOnInit() {
    this.checkAuthentication();
  }

  private async checkAuthentication() {
    this.state = 'loading';
    const isLoggedIn = await this.authService
      .isLoggedIn(this.authenticationType)
      .catch(reason => {
        this.state = 'internalError';
        throw reason;
      });
    if (isLoggedIn) {
      this.state = 'registered';
    } else {
      this.state = 'unregistered';
      await this.router.navigateByUrl(this.logInPageLink.link);
    }
  }
}

export namespace AuthenticationCheckComponent {
  export type State = 'loading' | 'internalError' | AuthService.RegistrationStatus;
}
