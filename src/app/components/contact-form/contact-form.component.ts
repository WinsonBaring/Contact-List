import { Contact, ContactService } from '@/service/contact.service';
import { Component, inject, model } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-update-contact',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent

  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {

  readonly dialogRef = inject(MatDialogRef<ContactFormComponent>);
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private _snackBar = inject(MatSnackBar);
  readonly data = inject<{ contact: Contact, variant: 'add' | 'update' }>(MAT_DIALOG_DATA);
  readonly contact = model(this.data.contact);
  readonly variant = model(this.data.variant);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    contactNumber: ['', [
      Validators.required,
      Validators.pattern(/^[0-9]{11}$/)
    ]],
    email: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]],
  });
  ngOnInit() {
    this.form.patchValue(this.contact());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  is11Digits() {
    const value = this.form.get('phone')?.value;
    return /^[0-9]{11}$/.test(value);

  }


  isValidEmail() {
    const value = this.form.get('email')?.value;
    const generalEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const comEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
    return generalEmailPattern.test(value) && comEmailPattern.test(value);
  }

  onSubmitUpdateContact(): void {
    if (this.form.valid) {
      // console.log('is this it?',this.contact().id);
      this.contactService.updateContact(this.form.value, this.contact().id).subscribe((res) => {
        this._snackBar.open('✔ Changes saved.', '', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.dialogRef.close();
      });
    }
  }
  onSubmitAddContact(): void {
    if (this.form.valid) {
      this.contactService.addContact(this.form.value).subscribe((res) => {
        this._snackBar.open('✔ Successfully added a new contact.', '', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.dialogRef.close(res);
      });
    }
  }
}
