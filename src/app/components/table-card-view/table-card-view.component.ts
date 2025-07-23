import { ContactService } from '@/service/contact.service';
import { Component, DestroyRef, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TableButtonComponent } from '@/components/table-button/table-button.component';
import { Contact } from '@/service/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { PhoneNumberFormatPipe } from '@/pipes/phone-number-format.pipe';
@Component({
  selector: 'app-table-card-view',
  imports: [
    PhoneNumberFormatPipe,
    RouterLink,
    TableButtonComponent
  ],
  templateUrl: './table-card-view.component.html',
  styleUrl: './table-card-view.component.css'
})
export class TableCardViewComponent {
  contactService = inject(ContactService);
  @Input() contacts!: Contact[];

}
