import { Event, EventGroup, EventGroupId } from './types/event';
import { Report, ReportGroupId } from './types/report';
import { AnpfiffInfoTeamParameters } from './types/anpfiff-info-team-parameters';
import { EditType } from './types/edit-type';
import { FunctionType } from './types/function-type';
import { GameInfo } from './types/game-info';
import { Occupancy } from './types/occupancy';
import { TeamSquad } from './types/team-squad';
import { User } from './types/user';

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
}, EventGroup.Flatten[]>;

export type GameInfoGetFunctionType = FunctionType<{
    gameId: string;
}, GameInfo>;

export type ReportEditFunctionType = FunctionType<{
    editType: EditType;
    groupId: ReportGroupId;
    previousGroupId: ReportGroupId | null;
    reportId: string;
    report: Omit<Report.Flatten, 'id'> | null;
}, void>;

export type ReportGetAllFunctionType = FunctionType<Record<string, never>, (Report.Flatten & { groupId: ReportGroupId })[]>;

export type ReportGetFunctionType = FunctionType<{
    groupId: ReportGroupId;
    numberReports: number | null;
}, {
    reports: Report.Flatten[];
    hasMore: boolean;
}>;

export type OccupancyEditFunctionType = FunctionType<{
    editType: EditType;
    occupancyId: string;
    occupancy: Omit<Occupancy.Flatten, 'id'> | null;
}, void>;

export type OccupancyGetAllFunctionType = FunctionType<Record<string, never>, Occupancy.Flatten[]>;

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


export type VerifyRecaptchaFunctionType = FunctionType<{
    token: string;
}, {
    success: boolean;
    score: number;
    action: string;
    challenge_ts: string;
    hostname: string;
    errorCode: string[] | null;
}>;

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
