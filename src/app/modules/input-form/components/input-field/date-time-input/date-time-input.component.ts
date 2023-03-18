import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { InputField } from '../../../types/input-field';

@Component({
    selector: 'input-field-date-time',
    templateUrl: './date-time-input.component.html',
    styleUrls: ['./date-time-input.component.sass']
})
export class DateTimeInputComponent implements AfterViewInit {
    @Input() public label!: string;

    @Input() public inputField!: InputField<Date>;

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

    private toDateTime(date: Date): { date: string; time: string } {
        const day = date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`;
        const month = date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const hour = date.getHours() <= 9 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minute = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        return {
            date: `${date.getFullYear()}-${month}-${day}`,
            time: `${hour}:${minute}`,
        };
    }

    private toDate(date: string, time: string): Date {
        return new Date(`${date}T${time}:00.000Z`);
    }
}
