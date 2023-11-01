import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { InputField } from '../../../types/input-field';

@Component({
    selector: 'input-field-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.sass']
})
export class StepperComponent implements AfterViewInit, OnDestroy {
    @Input() public label!: string;

    @Input() public inputField!: InputField<number>;

    @ViewChild('input') private readonly inputElement!: ElementRef<HTMLInputElement>;

    public ngAfterViewInit() {
        this.inputElement.nativeElement.value = this.inputField.value.toString();
        this.inputField.listeners.add('input-field', value => {
            this.inputElement.nativeElement.value = value.toString();
        });
    }

    public ngOnDestroy() {
        this.inputField.listeners.remove('input-field');
    }

    public onBlur() {
        const value = Number.parseInt(this.inputElement.nativeElement.value);
        this.inputField.inputValue = Number.isNaN(value) ? this.inputField.value : value;
    }

    public onStepperChange(direction: 'increase' | 'decrease') {
        this.inputField.inputValue = this.inputField.value + (direction === 'increase' ? 1 : -1);
    }
}
