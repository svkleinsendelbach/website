import { FunctionType } from './types/function-type';
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
    'verifyRecaptcha': VerifyRecaptchaFunctionType;
    'deleteAllData': DeleteAllDataFunctionType;
    'contact': ContactFunctionType;
    'event-get': EventGetFunctionType;
    'event-edit': EventEditFunctionType;
    'report-get': ReportGetFunctionType;
    'report-getAll': ReportGetAllFunctionType;
    'report-edit': ReportEditFunctionType;
    'occupancy-getAll': OccupancyGetAllFunctionType;
    'occupancy-edit': OccupancyEditFunctionType;
    'criticismSuggestion-getAll': CriticismSuggestionGetAllFunctionType;
    'criticismSuggestion-edit': CriticismSuggestionEditFunctionType;
    'bfvData-gameInfo': GameInfoGetFunctionType;
    'bfvData-teamSquad': TeamSquadGetFunctionType;
    'user-requestAccess': UserRequestAccessFunctionType;
    'user-getAll': UserGetAllFunctionType;
    'user-checkRoles': UserCheckRolesFunctionType;
    'user-handleAccessRequest': UserHandleAccessRequestFunctionType;
    'user-editRoles': UserEditRolesFunctionType;
}

function identity<T>(value: T): T {
    return value;
}

export const firebaseFunctionMapResultValues: { [Key in keyof FirebaseFunctions]: (returnValue: FunctionType.FlattenReturnType<FirebaseFunctions[Key]>) => FunctionType.ReturnType<FirebaseFunctions[Key]> } = {
    'verifyRecaptcha': identity,
    'deleteAllData': identity,
    'contact': identity,
    'event-get': EventGetFunctionType.mapReturnValue,
    'event-edit': identity,
    'report-get': ReportGetFunctionType.mapReturnValue,
    'report-getAll': ReportGetAllFunctionType.mapReturnValue,
    'report-edit': identity,
    'occupancy-getAll': OccupancyGetAllFunctionType.mapReturnValue,
    'occupancy-edit': identity,
    'criticismSuggestion-getAll': CriticismSuggestionGetAllFunctionType.mapReturnValue,
    'criticismSuggestion-edit': identity,
    'bfvData-gameInfo': identity,
    'bfvData-teamSquad': identity,
    'user-requestAccess': identity,
    'user-getAll': identity,
    'user-checkRoles': identity,
    'user-handleAccessRequest': identity,
    'user-editRoles': identity
};
