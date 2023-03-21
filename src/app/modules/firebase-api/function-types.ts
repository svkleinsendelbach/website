import { AnpfiffInfoTeamParameters } from './types/anpfiff-info-team-parameters';
import { EditType } from './types/edit-type';
import { Event, EventGroup, EventGroupId } from './types/event';
import { FunctionType } from './types/function-type';
import { GameInfo } from './types/game-info';
import { NotifactionPayload, NotificationType } from './types/notification';
import { Report, ReportGroupId } from './types/report';
import { SearchEntityType, TypedSearchEntity } from './types/search-entitiy';
import { TeamSquad } from './types/team-squad';
import { UserAuthenticationType } from './types/user-authentication';

export type DeleteAllDataFunctionType = FunctionType<Record<string, never>, void>;

export type EventEditFunctionType = FunctionType<{
    editType: EditType;
    groupId: EventGroupId;
    previousGroupId: EventGroupId | undefined;
    eventId: string;
    event: Omit<Event.Flatten, 'id'> | undefined;
}, void>;

export type EventGetFunctionType = FunctionType<{
    groupIds: EventGroupId[];
}, EventGroup.Flatten[]>;

export type GameInfoGetFunctionType = FunctionType<{
    gameId: string;
}, GameInfo>;

export type NotificationPushFunctionType = FunctionType<{
    notificationType: NotificationType;
    payload: NotifactionPayload;
}, void>;

export type NotificationRegisterFunctionType = FunctionType<{
    notificationType: NotificationType;
    token: string;
}, void>;

export type ReportEditFunctionType = FunctionType<{
    editType: EditType;
    groupId: ReportGroupId;
    previousGroupId: ReportGroupId | undefined;
    reportId: string;
    report: Omit<Report.Flatten, 'id'> | undefined;
}, void>;

export type ReportGetAllFunctionType = FunctionType<Record<string, never>, (Report.Flatten & { groupId: ReportGroupId })[]>;

export type ReportGetFunctionType = FunctionType<{
    groupId: ReportGroupId;
    numberReports: number | undefined;
}, {
    reports: Report.Flatten[];
    hasMore: boolean;
}>;

export type SearchEntityFunctionType<T extends SearchEntityType = SearchEntityType> = FunctionType<{
    searchEntityTypes: T[];
    searchText: string;
}, TypedSearchEntity.Flatten<T>[]>;

export type SendMailContactFunctionType = FunctionType<{
    senderName: string;
    senderAddress: string;
    receiverName: string;
    receiverAddress: string;
    message: string;
}, {
    success: boolean;
    message: string;
}>;

export type TeamSquadGetFunctionType = FunctionType<{
    type: AnpfiffInfoTeamParameters.Type;
}, TeamSquad>;


export type UserAuthenticationAcceptDeclineFunctionType = FunctionType<{
    authenticationTypes: UserAuthenticationType[];
    hashedUserId: string;
    action: 'accept' | 'decline';
}, void>;

export type UserAuthenticationAddFunctionType = FunctionType<{
    authenticationTypes: UserAuthenticationType[];
    firstName: string;
    lastName: string;
}, void>;

export type UserAuthenticationCheckFunctionType = FunctionType<{
    authenicationTypes: UserAuthenticationType[];
}, void>;

export namespace UserAuthenticationGetAllUnauthenticatedFunction {
    export type User = {
        hashedUserId: string;
        firstName: string;
        lastName: string;
    };
}

export type UserAuthenticationGetAllUnauthenticatedFunctionType = FunctionType<{
    authenticationTypes: UserAuthenticationType[];
}, UserAuthenticationGetAllUnauthenticatedFunction.User[]>;

export type VerifyRecaptchaFunctionType = FunctionType<{
    token: string;
}, {
    success: boolean;
    score: number;
    action: string;
    challenge_ts: string;
    hostname: string;
    errorCodes?: string[];
}>;
