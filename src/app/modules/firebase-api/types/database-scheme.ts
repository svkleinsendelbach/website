import { CryptedScheme, DatabaseSchemeType } from './scheme-type';
import { Event, EventGroupId } from '../../../types/event';
import { Report, ReportGroupId } from '../../../types/report';
import { AnpfiffInfoTeamParameters } from '../../../types/anpfiff-info-parameters';
import { Occupancy } from 'src/app/types/occupancy';
import { CriticismSuggestion } from 'src/app/types/criticism-sugggestion';
import { User } from 'src/app/types/user';

export type DatabaseScheme = DatabaseSchemeType<{
    anpfiffInfoTeamParameters: {
        [Type in AnpfiffInfoTeamParameters.Type]: AnpfiffInfoTeamParameters;
    };
    events: {
        [GroupId in EventGroupId]: {
            [EventId in string]: CryptedScheme<Omit<Event.Flatten, 'id'>>;
        };
    };
    reports: {
        [GroupId in ReportGroupId]: {
            [ReportId in string]: CryptedScheme<Omit<Report.Flatten, 'id'>>;
        };
    };
    occupancies: {
        [OccupancyId in string]: CryptedScheme<Omit<Occupancy.Flatten, 'id'>>;
    };
    criticismSuggestions: {
        [CriticismSuggestionId in string]: CryptedScheme<Omit<CriticismSuggestion, 'id'>>;
    };
    users: {
        [HashedUserId in string]: CryptedScheme<Omit<User, 'hashedUserId'>>
    };
}>;
