import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { InputField } from '../../../types/input-field';

@Component({
    selector: 'input-field-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.sass']
})
export class SelectComponent<T extends string> implements AfterViewInit {
    @Input() public label!: string;

    @Input() public selectOptions!: SelectOptions<T>;

    @Input() public inputField!: InputField<T>;

    @ViewChild('select') private readonly selectElement!: ElementRef<HTMLSelectElement>;

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

export type SelectOptions<T extends string> = SelectOptions.Grouped<T> | SelectOptions.Ungrouped<T>;

export namespace SelectOptions {
    export interface Grouped<T extends string> {
        type: 'grouped';
        groups: {
            title: string;
            options: Option<T>[];
        }[];
    }

    export interface Ungrouped<T extends string> {
        type: 'ungrouped';
        options: Option<T>[];
    }

    export interface Option<T extends string> {
        id: T;
        text: string;
    }

    export function grouped<T extends string>(groups: {
        title: string;
        options: Option<T>[];
    }[]): SelectOptions.Grouped<T> {
        return {
            type: 'grouped',
            groups: groups
        };
    }

    export function ungrouped<T extends string>(options: Option<T>[]): SelectOptions.Ungrouped<T> {
        return {
            type: 'ungrouped',
            options: options
        };
    }
}
