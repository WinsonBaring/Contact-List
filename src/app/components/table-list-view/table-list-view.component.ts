import { afterNextRender, Component, DestroyRef, inject, Input } from '@angular/core';
import { Contact, ContactService } from '@/service/contact.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TableButtonComponent } from '@/components/table-button/table-button.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PhoneNumberFormatPipe } from '@/pipes/phone-number-format.pipe';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table-list-view',
  imports: [
    PhoneNumberFormatPipe,
    MatTableModule,
    CommonModule,
    RouterLink,
    TableButtonComponent
  ],
  templateUrl: './table-list-view.component.html',
  styleUrl: './table-list-view.component.css'
})
export class TableListViewComponent {
  @Input() contacts!: Contact[];
}

