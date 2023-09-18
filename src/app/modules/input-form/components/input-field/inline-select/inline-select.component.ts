import { Component, Input } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { InputField } from '../../../types/input-field';
import { SelectOptions } from '../select/select.component';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { TrackBy } from 'src/app/types/track-by';

@Component({
    selector: 'input-field-inline-select',
    styleUrls: ['./inline-select.component.sass'],
    templateUrl: './inline-select.component.html'
})
export class InlineSelectComponent<T extends string> {
    @Input() public label: string | null = null;

    @Input() public selectOptions!: SelectOptions.Ungrouped<T>;

    @Input() public inputField!: InputField<T>;

    public TrackBy = TrackBy;

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public styleConfig: StyleConfigService
    ) {}

    public select(option: SelectOptions.Option<T>) {
        this.inputField.inputValue = option.id;
    }
}
