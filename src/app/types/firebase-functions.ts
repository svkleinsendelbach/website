import { FunctionType } from 'kleinsendelbach-website-library';
import {
    ContactFunctionType,
    CriticismEditFunctionType,
    CriticismGetFunctionType,
    DeleteAllDataFunctionType,
    EventEditFunctionType,
    EventGetFunctionType,
    GameInfoGetFunctionType,
    NewsletterEditFunctionType,
    NewsletterGetAllFunctionType,
    NewsletterGetFunctionType,
    NewsletterPublishFunctionType,
    NewsletterSubscriptionSubscribeFunctionType,
    NewsletterSubscriptionUnsubscribeFunctionType,
    OccupancyEditFunctionType,
    OccupancyGetFunctionType,
    ReportEditFunctionType,
    ReportGetFunctionType,
    TeamSquadGetFunctionType,
    UserGetRolesFunctionType,
    UserEditRolesFunctionType,
    UserGetAllFunctionType,
    UserHandleAccessRequestFunctionType,
    UserRequestAccessFunctionType,
    VerifyRecaptchaFunctionType
} from './firebase-function-types';

export type FirebaseFunctions = {
    'verifyRecaptcha': VerifyRecaptchaFunctionType;
    'deleteAllData': DeleteAllDataFunctionType;
    'contact': ContactFunctionType;
    'event-get': EventGetFunctionType;
    'event-edit': EventEditFunctionType;
    'report-get': ReportGetFunctionType;
    'report-edit': ReportEditFunctionType;
    'occupancy-get': OccupancyGetFunctionType;
    'occupancy-edit': OccupancyEditFunctionType;
    'criticism-get': CriticismGetFunctionType;
    'criticism-edit': CriticismEditFunctionType;
    'bfvData-gameInfo': GameInfoGetFunctionType;
    'bfvData-teamSquad': TeamSquadGetFunctionType;
    'user-requestAccess': UserRequestAccessFunctionType;
    'user-getAll': UserGetAllFunctionType;
    'user-getRoles': UserGetRolesFunctionType;
    'user-handleAccessRequest': UserHandleAccessRequestFunctionType;
    'user-editRoles': UserEditRolesFunctionType;
    'newsletter-get': NewsletterGetFunctionType;
    'newsletter-getAll': NewsletterGetAllFunctionType;
    'newsletter-edit': NewsletterEditFunctionType;
    'newsletter-publish': NewsletterPublishFunctionType;
    'newsletter-subscription-subscribe': NewsletterSubscriptionSubscribeFunctionType;
    'newsletter-subscription-unsubscribe': NewsletterSubscriptionUnsubscribeFunctionType;
}

function identity<T>(value: T): T {
    return value;
}

export const firebaseFunctionResultMappers: { [Key in keyof FirebaseFunctions]: (returnValue: FunctionType.FlattenReturnType<FirebaseFunctions[Key]>) => FunctionType.ReturnType<FirebaseFunctions[Key]> } = {
    'verifyRecaptcha': identity,
    'deleteAllData': identity,
    'contact': identity,
    'event-get': EventGetFunctionType.mapReturnValue,
    'event-edit': identity,
    'report-get': ReportGetFunctionType.mapReturnValue,
    'report-edit': identity,
    'occupancy-get': OccupancyGetFunctionType.mapReturnValue,
    'occupancy-edit': identity,
    'criticism-get': CriticismGetFunctionType.mapReturnValue,
    'criticism-edit': identity,
    'bfvData-gameInfo': identity,
    'bfvData-teamSquad': identity,
    'user-requestAccess': identity,
    'user-getAll': identity,
    'user-getRoles': identity,
    'user-handleAccessRequest': identity,
    'user-editRoles': identity,
    'newsletter-get': NewsletterGetFunctionType.mapReturnValue,
    'newsletter-getAll': NewsletterGetAllFunctionType.mapReturnValue,
    'newsletter-edit': identity,
    'newsletter-publish': identity,
    'newsletter-subscription-subscribe': identity,
    'newsletter-subscription-unsubscribe': identity
};
