import {
    VerifyRecaptchaFunctionType,
    DeleteAllDataFunctionType,
    SearchEntityFunctionType,
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
    NotificationPushFunctionType,
    OccupancyLocationEditFunctionType,
    OccupancyAssignmentEditFunctionType,
    OccupancyAssignmentGetFunctionType
} from './function-types';

export type FirebaseFunctions = {
    verifyRecaptcha: VerifyRecaptchaFunctionType;
    deleteAllData: DeleteAllDataFunctionType;
    searchEntity: SearchEntityFunctionType;
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
    occupancy: {
        location: {
            edit: OccupancyLocationEditFunctionType;
        };
        assignment: {
            edit: OccupancyAssignmentEditFunctionType;
            get: OccupancyAssignmentGetFunctionType;
        };
    };
};
