import { Component, Input } from '@angular/core';
import contactData from 'src/app/assets/contact-data.json';
import { DeviceTypeService } from 'src/app/services/device-type.service';

interface ContactItem {
  name: string;
  mobile?: string;
  telephone?: string;
  email?: string;
  function: string;
}

@Component({
  selector: 'app-component-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass'],
})
export class ContactComponent {
  @Input() pageId!: keyof typeof contactData.pages;

  constructor(public deviceType: DeviceTypeService) {}

  public get contactList(): ContactItem[] {
    return contactData.pages[this.pageId].compactMap(e => {
      if (!contactData.persons.hasOwnProperty(e.id)) {
        return null;
      }
      return {
        ...contactData.persons[e.id as keyof typeof contactData.persons],
        function: e.function,
      };
    });
  }
}
