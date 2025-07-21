import { Component, inject, model } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Contact, ContactService } from '@/service/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './delete-contact.component.html',
  styleUrl: './delete-contact.component.css'
})
export class DeleteContactComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteContactComponent>);
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private _snackBar = inject(MatSnackBar);
  readonly data = inject<Contact>(MAT_DIALOG_DATA);
  readonly contact = model(this.data);

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.contactService.deleteContact(this.contact().id).subscribe((res) => {
      this._snackBar.open('✔ Contact deleted successfully.', '', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    });
    this.dialogRef.close();
  }
}
