import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StyleConfigService } from '../../../../services/style-config.service';
import { User } from 'src/app/types/user';
import { recordEntries } from 'src/app/types/record-array';

export type AuthenticationState = 'loading' | 'authenticated' | 'unauthenticated' | 'internalError';

@Component({
    selector: 'authentication-check',
    styleUrls: ['./authentication-check.component.sass'],
    templateUrl: './authentication-check.component.html'
})
export class AuthenticationCheckComponent implements OnInit {
    @Input() public roles!: User.Role[];

    @Input() public authenticationStates: AuthenticationStates = new AuthenticationStates(['default']);

    @Input() public key: string = 'default';

    @Output() public onAuthentication = new EventEmitter<void>();

    public constructor(
        private readonly authService: AuthService,
        public readonly styleConfig: StyleConfigService
    ) {}

    public get state(): AuthenticationState | null {
        return this.authenticationStates.visisbleState(this.key);
    }

    public async ngOnInit() {
        try {
            const hasRoles = await this.authService.hasRoles(this.roles);
            if (hasRoles) {
                this.authenticationStates.setState(this.key, 'authenticated');
                this.onAuthentication.emit();
            } else
                this.authenticationStates.setState(this.key, 'unauthenticated');
        } catch {
            this.authenticationStates.setState(this.key, 'internalError');
        }
    }
}

export class AuthenticationStates {
    private readonly states: Record<string, AuthenticationState> = {};

    public constructor(allKeys: string[]) {
        for (const key of allKeys)
            this.states[key] = 'loading';
    }

    public setState(key: string, state: AuthenticationState) {
        this.states[key] = state;
    }

    public visisbleState(key: string): AuthenticationState | null {
        // State is shown if it's authenticated
        if (this.states[key] === 'authenticated')
            return 'authenticated';

        // State is shown if all states are unauthenticated and the key is the first state
        const stateEntries = recordEntries(this.states);
        if (stateEntries.length !== 0 && stateEntries[0].key === key && stateEntries.every(entry => entry.value === 'unauthenticated'))
            return 'unauthenticated';

        // State is shown if it's the first state with loading
        if (stateEntries.find(stateEntry => stateEntry.value === 'loading')?.key === key)
            return 'loading';

        // State is shown if it's the first state with internalError
        if (stateEntries.find(stateEntry => stateEntry.value === 'internalError')?.key === key)
            return 'internalError';

        return null;
    }
}
