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
        [Id in EventGroupId]: {
            [Key in string]: CryptedScheme<Omit<Event.Flatten, 'id'>>
        }
    };
    reports: {
        [Id in ReportGroupId]: {
            [Key in string]: CryptedScheme<Omit<Report.Flatten, 'id'>>
        }
    };
    users: {
        authentication: {
            [Type in UserAuthenticationType]: {
                [Key in string]: CryptedScheme<UserAuthentication>
            };
        };
    };
    notification: {
        [Type in NotificationType]: {
            [Key in string]: string
        }
    };
}>;
