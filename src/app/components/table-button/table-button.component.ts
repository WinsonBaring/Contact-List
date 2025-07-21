import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteContactComponent } from '@/components/delete-contact/delete-contact.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-table-button',
  imports: [MatIconModule],
  templateUrl: './table-button.component.html',
  styleUrl: './table-button.component.css'
})
export class TableButtonComponent {
  readonly dialog = inject(MatDialog);
  @Input() contact!: any;

  openUpdateDialog() {
    this.dialog.open(ContactFormComponent,{
      data: {
        contact: this.contact,
        variant: 'update'
      }
    });
  }

  openDeleteDialog() {
    this.dialog.open(DeleteContactComponent,{
      data: this.contact
    });
  }
}
