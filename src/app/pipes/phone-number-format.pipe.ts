import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumberFormat'
})
export class PhoneNumberFormatPipe implements PipeTransform {

  transform(value: string | number | null | undefined): string | null {
    // Handle null, undefined, empty string cases
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const phoneNumber = String(value);
    const pattern = /^(\d{4})(\d{3})(\d{4})$/;

    if (pattern.test(phoneNumber)) {
      // Replace with formatted string
      return phoneNumber.replace(pattern, '$1-$2-$3');
    } else {
      console.warn(`Phone number '${phoneNumber}' does not match expected 11-digit format for transformation.`);
      return phoneNumber; // Return original if it doesn't match the specific 11-digit pattern
    }
  }
}