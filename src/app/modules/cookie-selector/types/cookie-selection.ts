import { SelectionType } from './selection-type';

export interface CookiesSelection {
    necessary: Exclude<SelectionType, 'unselected'>;
    functionality: SelectionType;
    statistics: SelectionType;
}

export namespace CookiesSelection {
    export const defaultSelection: CookiesSelection = {
        functionality: 'unselected',
        necessary: 'selected',
        statistics: 'unselected'
    };
}
