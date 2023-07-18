import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { InputField } from '../../../types/input-field';
import { UtcDate } from 'src/app/types/utc-date';

@Component({
    selector: 'input-field-date-time',
    templateUrl: './date-time-input.component.html',
    styleUrls: ['./date-time-input.component.sass']
})
export class DateTimeInputComponent implements AfterViewInit {
    @Input() public label!: string;

    @Input() public inputField!: InputField<UtcDate>;

    @ViewChild('dateInput') private dateInputElement!: ElementRef<HTMLInputElement>;

    @ViewChild('timeInput') private timeInputElement!: ElementRef<HTMLInputElement>;

    public constructor(
        public styleConfig: StyleConfigService,
        public deviceType: DeviceTypeService
    ) {}

    public ngAfterViewInit() {
        const dateTime = this.toDateTime(this.inputField.value);
        this.dateInputElement.nativeElement.value = dateTime.date;
        this.timeInputElement.nativeElement.value = dateTime.time;
    }

    public onBlur() {
        this.inputField.inputValue = this.toDate(this.dateInputElement.nativeElement.value, this.timeInputElement.nativeElement.value);
    }

    private toDateTime(date: UtcDate): { date: string; time: string } {
        const day = date.day <= 9 ? `0${date.day}` : `${date.day}`;
        const month = date.month <= 9 ? `0${date.month}` : `${date.month}`;
        const hour = date.hour <= 9 ? `0${date.hour}` : `${date.hour}`;
        const minute = date.minute <= 9 ? `0${date.minute}` : `${date.minute}`;
        return {
            date: `${date.year}-${month}-${day}`,
            time: `${hour}:${minute}`,
        };
    }

    private toDate(date: string, time: string): UtcDate {
        const dateRegex = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/g;
        const timeRegex = /^(?<hour>\d{2}):(?<minute>\d{2})$/g;
        const dateMatch = dateRegex.exec(date);
        const timeMatch = timeRegex.exec(time);
        if (dateMatch === null || dateMatch.groups === undefined || timeMatch === null || timeMatch.groups === undefined)
            return new UtcDate(0, 0, 0, 0, 0);
        return new UtcDate(
            Number.parseInt(dateMatch.groups['year']),
            Number.parseInt(dateMatch.groups['month']),
            Number.parseInt(dateMatch.groups['day']),
            Number.parseInt(timeMatch.groups['hour']),
            Number.parseInt(timeMatch.groups['minute'])
        );
    }
}
