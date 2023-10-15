import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { InputField } from '../../../types/input-field';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'input-field-textarea',
    styleUrls: ['./textarea.component.sass'],
    templateUrl: './textarea.component.html'
})
export class TextareaComponent implements AfterViewInit, OnDestroy {
    @Input() public label!: string;

    @Input() public placeholder: string | null = null;

    @Input() public inputField!: InputField<string>;

    @ViewChild('textarea') private readonly textareaElement!: ElementRef<HTMLTextAreaElement>;

    public constructor(
        public styleConfig: StyleConfigService
    ) {}

    public ngAfterViewInit() {
        this.textareaElement.nativeElement.value = this.inputField.value;
        this.inputField.listeners.add('input-field', value => {
            this.textareaElement.nativeElement.value = value;
        });
    }

    public ngOnDestroy() {
        this.inputField.listeners.remove('input-field');
    }

    public onBlur() {
        this.inputField.inputValue = this.textareaElement.nativeElement.value;
    }
}
