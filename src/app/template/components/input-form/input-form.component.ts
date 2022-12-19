import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { InputFields } from '../../classes/input-fields';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.sass']
})
export class InputFormComponent implements AfterViewInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public inputFields!: InputFields<any, any>

  @ViewChild('form') public formElement!: ElementRef<HTMLFormElement>

  public ngAfterViewInit() {
    this.inputFields.setElements(this.formElement.nativeElement)
  }
}
