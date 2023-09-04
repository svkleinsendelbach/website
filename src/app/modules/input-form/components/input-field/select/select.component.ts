import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { InputField } from '../../../types/input-field';
import { StyleConfigService } from 'src/app/services/style-config.service';

export type SelectOptions<T extends string> = SelectOptions.Grouped<T> | SelectOptions.Ungrouped<T>;

export namespace SelectOptions {
    export interface Grouped<T extends string> {
        type: 'grouped';
        groups: {
            title: string;
            options: Option<T>[];
        }[];
    }

    export namespace Grouped {
        export function trackByTitle<T extends string>(_index: number, group: {
            title: string;
            options: Option<T>[];
        }): string {
            return group.title;
        }
    }

    export interface Ungrouped<T extends string> {
        type: 'ungrouped';
        options: Option<T>[];
    }

    export interface Option<T extends string> {
        id: T;
        text: string;
    }

    export namespace Option {
        export function trackById<T extends string>(_index: number, option: Option<T>): T {
            return option.id;
        }
    }

    export function grouped<T extends string>(groups: {
        title: string;
        options: Option<T>[];
    }[]): SelectOptions.Grouped<T> {
        return {
            groups: groups,
            type: 'grouped'
        };
    }

    export function ungrouped<T extends string>(options: Option<T>[]): SelectOptions.Ungrouped<T> {
        return {
            options: options,
            type: 'ungrouped'
        };
    }
}

@Component({
    selector: 'input-field-select',
    styleUrls: ['./select.component.sass'],
    templateUrl: './select.component.html'
})
export class SelectComponent<T extends string> implements AfterViewInit {
    @Input() public label!: string;

    @Input() public selectOptions!: SelectOptions<T>;

    @Input() public inputField!: InputField<T>;

    @ViewChild('select') private readonly selectElement!: ElementRef<HTMLSelectElement>;

    public SelectGroup = SelectOptions.Grouped;

    public SelectOption = SelectOptions.Option;

    public constructor(
        public styleConfig: StyleConfigService
    ) {}

    public ngAfterViewInit() {
        this.selectElement.nativeElement.value = this.inputField.value;
    }

    public onBlur() {
        this.inputField.inputValue = this.selectElement.nativeElement.value as T;
    }
}
