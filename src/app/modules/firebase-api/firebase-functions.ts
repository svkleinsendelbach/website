import {
    ContactFunctionType,
    CriticismSuggestionEditFunctionType,
    CriticismSuggestionGetAllFunctionType,
    DeleteAllDataFunctionType,
    EventEditFunctionType,
    EventGetFunctionType,
    GameInfoGetFunctionType,
    OccupancyEditFunctionType,
    OccupancyGetAllFunctionType,
    ReportEditFunctionType,
    ReportGetAllFunctionType,
    ReportGetFunctionType,
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
    contact: ContactFunctionType;
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
    criticismSuggestion: {
        getAll: CriticismSuggestionGetAllFunctionType;
        edit: CriticismSuggestionEditFunctionType;
    };
    bfvData: {
        gameInfo: GameInfoGetFunctionType;
        teamSquad: TeamSquadGetFunctionType;
    };
    user: {
        requestAccess: UserRequestAccessFunctionType;
        getAll: UserGetAllFunctionType;
        checkRoles: UserCheckRolesFunctionType;
        handleAccessRequest: UserHandleAccessRequestFunctionType;
        editRoles: UserEditRolesFunctionType;
    };
}
