import {
    DeleteAllDataFunctionType,
    EventEditFunctionType,
    EventGetFunctionType,
    GameInfoGetFunctionType,
    OccupancyEditFunctionType,
    OccupancyGetAllFunctionType,
    ReportEditFunctionType,
    ReportGetAllFunctionType,
    ReportGetFunctionType,
    SendMailContactFunctionType,
    TeamSquadGetFunctionType,
    UserCheckRolesFunctionType,
    UserEditRolesFunctionType,
    UserGetAllFunctionType,
    UserHandleAccessRequestFunctionType,
    UserRequestAccessFunctionType,
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
    occupancy: {
        getAll: OccupancyGetAllFunctionType;
        edit: OccupancyEditFunctionType;
    };
    bfvData: {
        gameInfo: GameInfoGetFunctionType;
        teamSquad: TeamSquadGetFunctionType;
    };
    sendMail: {
        contact: SendMailContactFunctionType;
    };
    user: {
        requestAccess: UserRequestAccessFunctionType;
        getAll: UserGetAllFunctionType;
        checkRoles: UserCheckRolesFunctionType;
        handleAccessRequest: UserHandleAccessRequestFunctionType;
        editRoles: UserEditRolesFunctionType;
    };
}
