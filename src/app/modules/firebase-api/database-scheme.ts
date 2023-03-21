import { AnpfiffInfoTeamParameters } from './types/anpfiff-info-team-parameters';
import { Event, EventGroupId } from './types/event';
import { NotificationType } from './types/notification';
import { Report, ReportGroupId } from './types/report';
import { CryptedScheme, DatabaseSchemeType } from './types/scheme-type';
import { UserAuthentication, UserAuthenticationType } from './types/user-authentication';

export type DatabaseScheme = DatabaseSchemeType<{
    anpfiffInfoTeamParameters: {
        [Key in AnpfiffInfoTeamParameters.Type]: AnpfiffInfoTeamParameters
    };
    events: {
        [Key in EventGroupId]: {
            [Key in string]: CryptedScheme<Omit<Event.Flatten, 'id'>>
        }
    };
    reports: {
        [Key in ReportGroupId]: {
            [Key in string]: CryptedScheme<Omit<Report.Flatten, 'id'>>
        }
    };
    users: {
        authentication: {
            [Key in UserAuthenticationType]: {
                [Key in string]: CryptedScheme<UserAuthentication>
            };
        };
    };
    notification: {
        [Key in NotificationType]: {
            [Key in string]: string
        }
    };
}>;
