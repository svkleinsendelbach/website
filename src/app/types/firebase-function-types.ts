import { FunctionType, Event, EventGroup, Report, ReportGroup, User, UtcDate } from "kleinsendelbach-website-library";
import { ContactPage } from "../pages/contact/contact.page";
import { Criticism } from "./criticism";
import { EditType } from "./edit-type";
import { Occupancy } from "./occupancy";
import { EventGroupId } from "./event-group-id";
import { ReportGroupId } from "./report-group-id";
import { AnpfiffInfoTeamParameters } from "./anpfiff-info-parameters";
import { TeamSquad } from "./team-squad";
import { UserRole } from "./user-role";
import { GameInfo } from "./game-info";
import { Newsletter } from "./newsletter";

export type ContactFunctionType = FunctionType<{
    name: string;
    answer: { email: string } | { phoneNumber: string } | { discordUserId: string };
    receiver: keyof typeof ContactPage.receivers;
    message: string;
}, void>;

export type CriticismEditFunctionType = FunctionType<{
    editType: EditType;
    criticismId: string;
    criticism: Omit<Criticism.Flatten, 'id'> | null;
}, void>;

export type CriticismGetFunctionType = FunctionType<{
    workedOff: boolean | null;
}, Criticism.Flatten[], Criticism[]>;

export namespace CriticismGetFunctionType {
    export function mapReturnValue(returnValue: FunctionType.FlattenReturnType<CriticismGetFunctionType>): FunctionType.ReturnType<CriticismGetFunctionType> {
        return returnValue.map(criticism => Criticism.concrete(criticism));
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
}, EventGroup.Flatten<EventGroupId>[], EventGroup<EventGroupId>[]>;

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

export type OccupancyGetFunctionType = FunctionType<Record<string, never>, Occupancy.Flatten[], Occupancy[]>;

export namespace OccupancyGetFunctionType {
    export function mapReturnValue(returnValue: FunctionType.FlattenReturnType<OccupancyGetFunctionType>): FunctionType.ReturnType<OccupancyGetFunctionType> {
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

export type ReportGetFunctionType = FunctionType<{
    groupIds: ReportGroupId[];
    count: number | null;
}, ReportGroup.Flatten<ReportGroupId>[], ReportGroup<ReportGroupId>[]>;

export namespace ReportGetFunctionType {
    export function mapReturnValue(returnValue: FunctionType.FlattenReturnType<ReportGetFunctionType>): FunctionType.ReturnType<ReportGetFunctionType> {
        return returnValue.map(reportGroup => ReportGroup.concrete(reportGroup));
    }
}

export type TeamSquadGetFunctionType = FunctionType<{
    anpfiffInfoTeamParameters: AnpfiffInfoTeamParameters;
}, TeamSquad>;

export type UserGetRolesFunctionType = FunctionType<Record<string, never>, UserRole[] | null>;

export type UserEditRolesFunctionType = FunctionType<{
    hashedUserId: string;
    roles: UserRole[];
}, void>;

export type UserGetAllFunctionType = FunctionType<{
    type: 'authenticated' | 'unauthenticated' | null;
}, User<UserRole>[]>;

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

export type NewsletterEditFunctionType = FunctionType<{
    editType: EditType;
    newsletterId: string;
    newsletter: Omit<Newsletter.Flatten, 'id'> | null;
}, void>;

export type NewsletterGetAllFunctionType = FunctionType<Record<string, never>, Newsletter.Overview.Flatten[], Newsletter.Overview[]>;

export namespace NewsletterGetAllFunctionType {
    export function mapReturnValue(returnValue: FunctionType.FlattenReturnType<NewsletterGetAllFunctionType>): FunctionType.ReturnType<NewsletterGetAllFunctionType> {
        return returnValue.map(newsletter => ({
            ...newsletter,
            date: UtcDate.decode(newsletter.date)
        }));
    }
}

export type NewsletterGetFunctionType = FunctionType<{
    id: string;
}, Newsletter.Flatten | null, Newsletter | null>;


export namespace NewsletterGetFunctionType {
    export function mapReturnValue(returnValue: FunctionType.FlattenReturnType<NewsletterGetFunctionType>): FunctionType.ReturnType<NewsletterGetFunctionType> {
        if (returnValue === null)
            return null;
        return Newsletter.concrete(returnValue);
    }
}

export type NewsletterPublishFunctionType = FunctionType<{
    id: string;
    html: string;
}, void>;


export type NewsletterSubscriptionSubscribeFunctionType = FunctionType<{
    email: string;
}, void>;

export type NewsletterSubscriptionUnsubscribeFunctionType = FunctionType<{
    id: string | null;
    email: string | null;
}, void>;
