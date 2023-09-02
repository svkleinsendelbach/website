import { NgModule } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

// Internal Components
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LabelComponent } from './components/label/label.component';

// Exported Components
import { InputFormComponent } from './components/input-form/input-form.component';
import { TextInputComponent } from './components/input-field/text-input/text-input.component';
import { TextareaComponent } from './components/input-field/textarea/textarea.component';
import { DateTimeInputComponent } from './components/input-field/date-time-input/date-time-input.component';
import { SelectComponent } from './components/input-field/select/select.component';
import { CheckboxComponent } from './components/input-field/checkbox/checkbox.component';
import { TextEditorComponent } from './components/input-field/text-editor/text-editor.component';

@NgModule({
    declarations: [
        CheckboxComponent,
        DateTimeInputComponent,
        ErrorMessageComponent,
        InputFormComponent,
        LabelComponent,
        SelectComponent,
        TextareaComponent,
        TextEditorComponent,
        TextInputComponent
    ],
    imports: [
        AngularEditorModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        CheckboxComponent,
        DateTimeInputComponent,
        InputFormComponent,
        SelectComponent,
        TextareaComponent,
        TextEditorComponent,
        TextInputComponent
    ]
})
export class InputFormModule { }
