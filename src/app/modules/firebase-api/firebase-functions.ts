import {
    VerifyRecaptchaFunctionType,
    DeleteAllDataFunctionType,
    SearchEntityFunctionType,
    NewsGetFunctionType,
    NewsEditFunctionType,
    NewsDisableFunctionType,
    NewsGetSingleFunctionType,
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

export type FirebaseFunctions = {
    verifyRecaptcha: VerifyRecaptchaFunctionType;
    deleteAllData: DeleteAllDataFunctionType;
    searchEntity: SearchEntityFunctionType;
    news: {
        get: NewsGetFunctionType;
        edit: NewsEditFunctionType;
        disable: NewsDisableFunctionType;
        getSingle: NewsGetSingleFunctionType;
    };
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
};
