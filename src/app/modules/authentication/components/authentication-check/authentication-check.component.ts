import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InternalLink } from 'src/app/types/internal-path';
import { Router } from '@angular/router';
import { StyleConfigService } from '../../../../services/style-config.service';
import { User } from 'src/app/modules/firebase-api/types/user';

export type AuthenticationState = 'authenticated' | 'internalError' | 'loading' | 'unauthenticated';

export class AuthenticationStates {
    private readonly states: AuthenticationState[] = [];

    public constructor(count: number) {
        for (let i = 0; i < count; i++)
            this.states.push('loading');
    }

    public state(index: number): AuthenticationState {
        return this.states[index];
    }

    public setState(index: number, state: AuthenticationState) {
        this.states[index] = state;
    }

    public isShown(index: number): boolean {
        if (this.state(index) === 'authenticated')
            return true;
        return index === 0 && (this.states.every(state => state === 'internalError') || this.states.every(state => state === 'loading') || this.states.every(state => state === 'unauthenticated'));
    }
}

@Component({
    selector: 'authentication-check',
    styleUrls: ['./authentication-check.component.sass'],
    templateUrl: './authentication-check.component.html'
})
export class AuthenticationCheckComponent implements OnInit {
    @Input() public roles!: User.Role[];

    @Input() public states: AuthenticationStates = new AuthenticationStates(1);

    @Input() public index: number = 0;

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() public onAuthentication = new EventEmitter<void>();

    public logInPageLink = InternalLink.all['bearbeiten/anmelden'];

    public constructor(
        private readonly authService: AuthService,
        public readonly styleConfig: StyleConfigService
    ) {}

    public get state(): AuthenticationState | null {
        if (!this.states.isShown(this.index))
            return null;
        return this.states.state(this.index);
    }

    public ngOnInit() {
        void this.checkAuthentication();
    }

    private async checkAuthentication() {
        this.states.setState(this.index, 'loading');
        const hasRoles = await this.authService
            .hasRoles(this.roles)
            .catch(reason => {
                this.states.setState(this.index, 'internalError');
                throw reason;
            });
        if (hasRoles) {
            this.states.setState(this.index, 'authenticated');
            this.onAuthentication.emit();
        } else
            this.states.setState(this.index, 'unauthenticated');
    }
}
