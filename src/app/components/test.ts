import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Contact } from '@/service/contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/contacts';
  private contacts: Contact[] = [];
  private contactsSubject = new BehaviorSubject<Contact[]>(this.contacts);

  constructor(private http: HttpClient) {}

  getContacts(force = false): Observable<Contact[]> {
    // Return cached data if available and not forced
    if (!force && this.contacts.length > 0) {
      return of(this.contacts);
    }
    // Fetch from API and update cache
    return this.http.get<Contact[]>(this.apiUrl).pipe(
      tap(contacts => {
        this.contacts = contacts;
        this.contactsSubject.next([...this.contacts]);
      }),
      catchError(error => {
        console.error('Error fetching contacts:', error);
        // Optionally return cached contacts or empty array on errorcddfdsgg
        return of(this.contacts);
      })
    );
  }

  getCurrentContacts(): Observable<Contact[]> {
    return this.contactsSubject.asObservable();
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact).pipe(
      tap((newContact: Contact) => {
        this.contacts.push(newContact);
        this.contactsSubject.next([...this.contacts]); // Notify subscribers
      })
    );
  }

  getContactById(id: string): Observable<Contact | null> {

    const cachedContact = this.contacts.find(contact => contact.id === id);
    if (cachedContact) {
      return of(cachedContact);
    }

    return this.http.get<Contact>(`${this.apiUrl}/${id}`).pipe(
      tap(contact => {

        this.contacts.push(contact);
        this.contactsSubject.next([...this.contacts]);
      }),
      catchError(error => {
        console.error(`Error fetching contact with id ${id}:`, error);
        return of(null); 
      })
    );
  }

  deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {

        this.contacts = this.contacts.filter(contact => contact.id !== id);
        this.contactsSubject.next([...this.contacts]); 
      }),
      catchError(error => {
        console.error(`Error deleting contact with id ${id}:`, error);
        return of();
      })
    );
  }
  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${contact.id}`, contact).pipe(
      tap((updatedContact) => {
        const index = this.contacts.findIndex(c => c.id === updatedContact.id);
        if (index !== -1) {
          this.contacts[index] = updatedContact;
          this.contactsSubject.next([...this.contacts]);
        }
      }),
      catchError(error => {
        console.error(`Error updating contact with id ${contact.id}:`, error);
        return of(contact); 
      })
    );
  }

}

 