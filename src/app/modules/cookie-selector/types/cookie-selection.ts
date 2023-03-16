import { SelectionType } from './selection-type';

export interface CookiesSelection {
    necessary: Exclude<SelectionType, 'unselected'>;
    functionality: SelectionType;
    statistics: SelectionType;
}

export namespace CookiesSelection {
    export const defaultSelection: CookiesSelection = {
        necessary: 'selected',
        functionality: 'unselected',
        statistics: 'unselected'
    };
}
