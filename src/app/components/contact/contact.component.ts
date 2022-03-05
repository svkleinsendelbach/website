import { Component, Input, OnInit } from '@angular/core';
import contactData from 'src/app/assets/contact-data.json';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { JsonDecodingError } from 'src/app/utils/jsonDecodingError';

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
export class ContactComponent implements OnInit {
  public contactList!: ContactItem[];

  @Input() pageId!: keyof typeof contactData.pages;

  constructor(public deviceType: DeviceTypeService) {}

  ngOnInit(): void {
    this.getContactList();
  }

  private getContactList(): void {
    this.contactList =  contactData.pages[this.pageId].map(e => {
      if (!contactData.persons.hasOwnProperty(e.id)) {
        throw new JsonDecodingError(`Couldn't get contact person for id: ${e.id}`);
      }
      return {
        ...contactData.persons[e.id as keyof typeof contactData.persons],
        function: e.function,
      };
    });
  }
}
