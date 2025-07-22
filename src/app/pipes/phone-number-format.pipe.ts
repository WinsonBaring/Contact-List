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

    // Convert value to string to ensure string methods can be called
    const phoneNumber = String(value);

    // Regex to match 11 digits and capture groups for formatting
    // Group 1: first 4 digits (0976)
    // Group 2: next 3 digits (039)
    // Group 3: last 4 digits (2357)
    const pattern = /^(\d{4})(\d{3})(\d{4})$/;

    // Test if the phone number matches the expected 11-digit pattern
    if (pattern.test(phoneNumber)) {
      // Replace with formatted string
      return phoneNumber.replace(pattern, '$1-$2-$3');
    } else {
      // If it doesn't match the 11-digit pattern, return it as is or handle differently
      // For example, you might return null, an error message, or the original unformatted number.
      // Returning original for non-matching inputs is usually a safe default.
      console.warn(`Phone number '${phoneNumber}' does not match expected 11-digit format for transformation.`);
      return phoneNumber; // Return original if it doesn't match the specific 11-digit pattern
    }
  }
}