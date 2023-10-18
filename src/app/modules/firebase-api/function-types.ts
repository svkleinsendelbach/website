import { Event, EventGroup, EventGroupId } from './types/event';
import { Report, ReportGroupId } from './types/report';
import { AnpfiffInfoTeamParameters } from './types/anpfiff-info-team-parameters';
import { CriticismSuggestion } from './types/criticism-sugggestion';
import { EditType } from './types/edit-type';
import { FunctionType } from './types/function-type';
import { GameInfo } from './types/game-info';
import { Occupancy } from './types/occupancy';
import { Receiver } from 'src/app/pages/contact/contact.page';
import { TeamSquad } from './types/team-squad';
import { User } from './types/user';
import { Guid } from './types/guid';

export type ContactFunctionType = FunctionType<{
    name: string;
    answer: { email: string } | { phoneNumber: string } | { discordUserId: string };
    receiver: Receiver;
    message: string;
}, void>;

export type CriticismSuggestionEditFunctionType = FunctionType<{
    editType: EditType;
    criticismSuggestionId: string;
    criticismSuggestion: Omit<CriticismSuggestion.Flatten, 'id'> | null;
}, void>;

export type CriticismSuggestionGetAllFunctionType = FunctionType<{
    workedOff: boolean | null;
}, CriticismSuggestion.Flatten[], CriticismSuggestion[]>;

export namespace CriticismSuggestionGetAllFunctionType {
    export function mapReturnValue(returnValue: FunctionType.FlattenReturnType<CriticismSuggestionGetAllFunctionType>): FunctionType.ReturnType<CriticismSuggestionGetAllFunctionType> {
        return returnValue.map(criticismSuggestion => CriticismSuggestion.concrete(criticismSuggestion));
    }
}

export type DeleteAllDataFunctionType = FunctionType<Record<string, never>, void>;

export type EventEditFunctionType = FunctionType<{
    editType: EditType;
    groupId: EventGroupId;
    previousGroupId: EventGroupId | null;
    eventId: string;
    event: Omit<Event.Flatten, 'id'> | null;
}, void>;

export type EventGetFunctionType = FunctionType<{
    groupIds: EventGroupId[];
}, EventGroup.Flatten[], EventGroup[]>;

export namespace EventGetFunctionType {
    export function mapReturnValue(returnValue: FunctionType.FlattenReturnType<EventGetFunctionType>): FunctionType.ReturnType<EventGetFunctionType> {
        return returnValue.map(eventGroup => EventGroup.concrete(eventGroup));
    }
}

export type GameInfoGetFunctionType = FunctionType<{
    gameId: string;
}, GameInfo>;

export type IcsEventsRequestType = FunctionType<{
    selection: EventGroupId[];
}, string>;

export type OccupancyEditFunctionType = FunctionType<{
    editType: EditType;
    occupancyId: string;
    occupancy: Omit<Occupancy.Flatten, 'id'> | null;
}, void>;

export type OccupancyGetAllFunctionType = FunctionType<Record<string, never>, Occupancy.Flatten[], Occupancy[]>;

export namespace OccupancyGetAllFunctionType {
    export function mapReturnValue(returnValue: FunctionType.FlattenReturnType<OccupancyGetAllFunctionType>): FunctionType.ReturnType<OccupancyGetAllFunctionType> {
        return returnValue.map(occupancy => Occupancy.concrete(occupancy));
    }
}

export type ReportEditFunctionType = FunctionType<{
    editType: EditType;
    groupId: ReportGroupId;
    previousGroupId: ReportGroupId | null;
    reportId: string;
    report: Omit<Report.Flatten, 'id'> | null;
}, void>;

export type ReportGetAllFunctionType = FunctionType<Record<string, never>, (Report.Flatten & { groupId: ReportGroupId })[], (Report & { groupId: ReportGroupId })[]>;

export namespace ReportGetAllFunctionType {
    export function mapReturnValue(returnValue: FunctionType.FlattenReturnType<ReportGetAllFunctionType>): FunctionType.ReturnType<ReportGetAllFunctionType> {
        return returnValue.map(report => ({
            ...Report.concrete(report),
            groupId: report.groupId
        }));
    }
}

export type ReportGetFunctionType = FunctionType<{
    groupId: ReportGroupId;
    numberReports: number | null;
}, {
    reports: Report.Flatten[];
    hasMore: boolean;
}, {
    reports: Report[];
    hasMore: boolean;
}>;

export namespace ReportGetFunctionType {
    export function mapReturnValue(returnValue: FunctionType.FlattenReturnType<ReportGetFunctionType>): FunctionType.ReturnType<ReportGetFunctionType> {
        return {
            reports: returnValue.reports.map(report => Report.concrete(report)),
            hasMore: returnValue.hasMore
        };
    }
}

export type TeamSquadGetFunctionType = FunctionType<{
    type: AnpfiffInfoTeamParameters.Type;
}, TeamSquad>;

export type UserCheckRolesFunctionType = FunctionType<{
    roles: User.Role[];
}, void>;

export type UserEditRolesFunctionType = FunctionType<{
    hashedUserId: string;
    roles: User.Role[];
}, void>;

export type UserGetAllFunctionType = FunctionType<{
    type: 'authenticated' | 'unauthenticated' | null;
}, User[]>;

export type UserHandleAccessRequestFunctionType = FunctionType<{
    hashedUserId: string;
    handleRequest: 'accept' | 'decline';
}, void>;

export type UserRequestAccessFunctionType = FunctionType<{
    firstName: string;
    lastName: string;
}, void>;

export type VerifyRecaptchaFunctionType = FunctionType<{
    token: string;
}, {
    success: boolean;
    score: number;
    action: string;
    challenge_ts: string;
    hostname: string;
    errorCodes: string[] | null;
}>;
