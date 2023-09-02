import {
    DeleteAllDataFunctionType,
    EventEditFunctionType,
    EventGetFunctionType,
    GameInfoGetFunctionType,
    NotificationPushFunctionType,
    NotificationRegisterFunctionType,
    ReportEditFunctionType,
    ReportGetAllFunctionType,
    ReportGetFunctionType,
    SendMailContactFunctionType,
    TeamSquadGetFunctionType,
    UserAuthenticationAcceptDeclineFunctionType,
    UserAuthenticationAddFunctionType,
    UserAuthenticationCheckFunctionType,
    UserAuthenticationGetAllUnauthenticatedFunctionType,
    VerifyRecaptchaFunctionType
} from './function-types';

export interface FirebaseFunctions {
    verifyRecaptcha: VerifyRecaptchaFunctionType;
    deleteAllData: DeleteAllDataFunctionType;
    event: {
        get: EventGetFunctionType;
        edit: EventEditFunctionType;
    };
    report: {
        get: ReportGetFunctionType;
        getAll: ReportGetAllFunctionType;
        edit: ReportEditFunctionType;
    };
    bfvData: {
        gameInfo: GameInfoGetFunctionType;
        teamSquad: TeamSquadGetFunctionType;
    };
    sendMail: {
        contact: SendMailContactFunctionType;
    };
    userAuthentication: {
        add: UserAuthenticationAddFunctionType;
        check: UserAuthenticationCheckFunctionType;
        acceptDecline: UserAuthenticationAcceptDeclineFunctionType;
        getAllUnauthenticated: UserAuthenticationGetAllUnauthenticatedFunctionType;
    };
    notification: {
        register: NotificationRegisterFunctionType;
        push: NotificationPushFunctionType;
    };
}
