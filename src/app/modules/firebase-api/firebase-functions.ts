import {
    VerifyRecaptchaFunctionType,
    DeleteAllDataFunctionType,
    EventGetFunctionType,
    EventEditFunctionType,
    ReportGetAllFunctionType,
    ReportGetFunctionType,
    ReportEditFunctionType,
    GameInfoGetFunctionType,
    TeamSquadGetFunctionType,
    SendMailContactFunctionType,
    UserAuthenticationAddFunctionType,
    UserAuthenticationCheckFunctionType,
    UserAuthenticationAcceptDeclineFunctionType,
    UserAuthenticationGetAllUnauthenticatedFunctionType,
    NotificationRegisterFunctionType,
    NotificationPushFunctionType
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
