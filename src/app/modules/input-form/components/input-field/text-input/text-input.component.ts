import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { InputField } from '../../../types/input-field';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'input-field-text',
    styleUrls: ['./text-input.component.sass'],
    templateUrl: './text-input.component.html'
})
export class TextInputComponent implements AfterViewInit {
    @Input() public secure = false;

    @Input() public label!: string;

    @Input() public placeholder: string | null = null;

    @Input() public inputField!: InputField<string>;

    @ViewChild('input') private readonly inputElement!: ElementRef<HTMLInputElement>;

    public constructor(
        public styleConfig: StyleConfigService
    ) {}

    public ngAfterViewInit() {
        this.inputElement.nativeElement.value = this.inputField.value;
    }

    public onBlur() {
        this.inputField.inputValue = this.inputElement.nativeElement.value;
    }
}
