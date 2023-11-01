import { AngularEditorModule } from '@kolkov/angular-editor';
import { CheckboxComponent } from './components/input-field/checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { DateTimeInputComponent } from './components/input-field/date-time-input/date-time-input.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { FormsModule } from '@angular/forms';
import { InlineSelectComponent } from './components/input-field/inline-select/inline-select.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { LabelComponent } from './components/label/label.component';
import { NgModule } from '@angular/core';
import { SelectComponent } from './components/input-field/select/select.component';
import { TextEditorComponent } from './components/input-field/text-editor/text-editor.component';
import { TextInputComponent } from './components/input-field/text-input/text-input.component';
import { TextareaComponent } from './components/input-field/textarea/textarea.component';
import { StepperComponent } from './components/input-field/stepper/stepper.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        CheckboxComponent,
        DateTimeInputComponent,
        ErrorMessageComponent,
        InlineSelectComponent,
        InputFormComponent,
        LabelComponent,
        SelectComponent,
        StepperComponent,
        TextareaComponent,
        TextEditorComponent,
        TextInputComponent
    ],
    exports: [
        CheckboxComponent,
        DateTimeInputComponent,
        InlineSelectComponent,
        InputFormComponent,
        SelectComponent,
        StepperComponent,
        TextareaComponent,
        TextEditorComponent,
        TextInputComponent
    ],
    imports: [
        AngularEditorModule,
        CommonModule,
        FontAwesomeModule,
        FormsModule
    ]
})
export class InputFormModule { }
