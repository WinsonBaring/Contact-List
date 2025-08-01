import { CommonModule } from '@angular/common';
import { Component, inject, signal, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TableListViewComponent } from '@/components/table-list-view/table-list-view.component';
import { TableCardViewComponent } from '@/components/table-card-view/table-card-view.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { Contact, ContactService } from '@/service/contact.service';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContactFormComponent } from '@/components/contact-form/contact-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    TableListViewComponent,
    TableCardViewComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  view = signal<'list' | 'card'>('card');
  readonly dialog = inject(MatDialog);
  contactService = inject(ContactService);
  contacts = toSignal(this.contactService.getContacts(), { initialValue: [] });


  openContactForm(): void {
    this.dialog.open(ContactFormComponent,{
      width:"22rem",
      height:"27rem",
      data:{
        contact: {} as Contact,
        variant: 'add'
      }
    })
  }

}
