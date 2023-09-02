import { InputError } from '../../input-form/types/input-error';

export class LoginError implements Error {
    public readonly name: string = 'WebsiteEditorAuthServiceLoginError';

    public readonly message: string = 'An error occured while logging in, see error code.';

    public constructor(
        public readonly code: LoginError.Code
    ) {}
}

export namespace LoginError {
    export type Code = 'invalid-email' | 'popup-blocked' | 'popup-closed' | 'unknown' | 'user-disabled' | 'wrong-password';

    export namespace Code {
        export function typeGuard(value: string): value is LoginError.Code {
            return ['unknown', 'invalid-email', 'user-disabled', 'wrong-password', 'popup-blocked', 'popup-closed'].includes(value);
        }

        export const statusMessages: Record<LoginError.Code, InputError> = {
            'invalid-email': new InputError('Die angegebene E-Mail Addresse ust ungültig.'),
            'popup-blocked': new InputError('Anmeldefenster wurde von Ihrem Browser blockiert.'),
            'popup-closed': new InputError('Anmeldefenster wurde vom Benutzer geschlossen.'),
            'unknown': new InputError('Es ist ein unbekannter Fehler aufgetreten.'),
            'user-disabled': new InputError('Der Benutzer wurde gesperrt.'),
            'wrong-password': new InputError('Das angebene Passwort ist falsch.')
        };
    }
}
