import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js';

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
  transform(phoneValue: string, country: CountryCode = 'DE'): string {
    try {
      const phoneNumber = parsePhoneNumber(phoneValue, country);
      return phoneNumber.formatNational();
    } catch (error) {
      return phoneValue;
    }
  }
}
