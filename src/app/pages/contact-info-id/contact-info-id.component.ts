import { PhoneNumberFormatPipe } from '@/pipes/phone-number-format.pipe';
import { Contact, ContactService } from '@/service/contact.service';
import { Component, computed, DestroyRef,  inject, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-info-id',
  imports: [
    RouterLink,
    PhoneNumberFormatPipe
  ],
  templateUrl: './contact-info-id.component.html',
  styleUrl: './contact-info-id.component.css'
})
export class ContactInfoIdComponent {
  user_id = inject(ActivatedRoute).snapshot.params['user_id'];
  
  contactService = inject(ContactService);
  contact = toSignal(this.contactService.getContactById(this.user_id),{initialValue:{} as Contact});

  destroyRef = inject(DestroyRef);
  // ngOnInit() {
  //   const subscription = this.contactService.getContact(this.user_id).subscribe((contact) => {
  //     this.contact = contact;
  //   });
  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }
}
