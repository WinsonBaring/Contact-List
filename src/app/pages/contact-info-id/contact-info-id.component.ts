import { PhoneNumberFormatPipe } from '@/pipes/phone-number-format.pipe';
import { Contact, ContactService } from '@/service/contact.service';
import { Component, computed, DestroyRef, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-info-id',
  standalone: true,
  imports: [
    RouterLink,
    PhoneNumberFormatPipe
  ],
  templateUrl: './contact-info-id.component.html',
  styleUrl: './contact-info-id.component.css'
})
export class ContactInfoIdComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly contactService = inject(ContactService);

  private readonly userId = this.route.snapshot.params['user_id'];
  
  protected readonly contact: Signal<Contact> = toSignal(
    this.contactService.getContactById(this.userId),
    { initialValue: {} as Contact }
  );
}
