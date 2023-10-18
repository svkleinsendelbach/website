import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StyleConfigService } from '../../../../services/style-config.service';
import { User } from 'src/app/modules/firebase-api/types/user';

export type AuthenticationState = 'authenticated' | 'internalError' | 'loading' | 'unauthenticated';

export class AuthenticationStates {
    private readonly states: Record<string, AuthenticationState> = {};

    public constructor(ids: string[]) {
        for (const id of ids)
            this.states[id] = 'loading';
    }

    public state(id: string): AuthenticationState {
        return this.states[id];
    }

    public setState(id: string, state: AuthenticationState) {
        this.states[id] = state;
    }

    public isShown(id: string): boolean {
        if (this.state(id) === 'authenticated')
            return true;
        return this.isFirstStateNotAuthenticated(id) && (this.allStates('internalError') || this.allStates('loading') || this.allStates('unauthenticated'));
    }

    private isFirstStateNotAuthenticated(id: string): boolean {
        const notAuthenticated = Object.entries(this.states).filter(value => value[1] !== 'authenticated');
        if (notAuthenticated.length === 0)
            return false;
        return notAuthenticated[0][0] === id;
    }

    private allStates(expectedState: AuthenticationState): boolean {
        for (const state of Object.values(this.states)) {
            if (state !== expectedState && state !== 'authenticated')
                return false;
        }
        return true;
    }
}

@Component({
    selector: 'authentication-check',
    styleUrls: ['./authentication-check.component.sass'],
    templateUrl: './authentication-check.component.html'
})
export class AuthenticationCheckComponent implements OnInit {
    @Input() public roles!: User.Role[];

    @Input() public states: AuthenticationStates = new AuthenticationStates(['default']);

    @Input() public id: string = 'default';

    @Output() public onAuthentication = new EventEmitter<void>();

    public constructor(
        private readonly authService: AuthService,
        public readonly styleConfig: StyleConfigService
    ) {}

    public get state(): AuthenticationState | null {
        if (!this.states.isShown(this.id))
            return null;
        return this.states.state(this.id);
    }

    public ngOnInit() {
        void this.checkAuthentication();
    }

    private async checkAuthentication() {
        this.states.setState(this.id, 'loading');
        const hasRoles = await this.authService
            .hasRoles(this.roles)
            .catch(reason => {
                this.states.setState(this.id, 'internalError');
                throw reason;
            });
        if (hasRoles) {
            this.states.setState(this.id, 'authenticated');
            this.onAuthentication.emit();
        } else
            this.states.setState(this.id, 'unauthenticated');
    }
}
