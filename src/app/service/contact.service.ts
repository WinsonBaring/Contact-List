import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders for POST/PUT/DELETE
import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';

export interface Contact {
  id: string; // JSON server usually generates string IDs
  name: string;
  contactNumber: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  http = inject(HttpClient);
  // No need for SupabaseService anymore
  // private supabaseService = inject(SupabaseService); // REMOVED

  // Assuming your json-server is running at this URL
  private apiUrl = 'http://localhost:3000/contacts'; // Adjust if your JSON server is elsewhere

  // --- Central Revalidation Trigger ---
  private _revalidateContactsTrigger = new BehaviorSubject<void>(undefined);

  // --- The HOT Observable that components will subscribe to ---
  private _contacts$: Observable<Contact[]>;

  constructor() {
    this._contacts$ = this._revalidateContactsTrigger.pipe(
      tap(() => console.log('Service: Revalidation trigger fired. Starting new fetch...')),
      switchMap(() => this.getContactsDataFromServer().pipe( // CHANGED: Call getContactsDataFromServer
        shareReplay({ bufferSize: 1, refCount: true })
      )),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
  getData(){
    return this.http.get<Contact[]>(this.apiUrl).pipe(
      map(data => data || []), // Ensure it returns an empty array if data is null/undefined
      catchError((error ) => {
        console.error('HTTP getContacts Error:', error);
        return throwError(() => new Error(error.message || 'Failed to fetch contacts from JSON server.'));
      })
    );
  }

  // --- Actual Data Fetching Logic (private) ---
  private getContactsDataFromServer(): Observable<Contact[]> { // CHANGED: Renamed method
    console.log('Service: --- HTTP GET API Call Initiated ---');
    return this.http.get<Contact[]>(this.apiUrl).pipe(
      map(data => data || []), // Ensure it returns an empty array if data is null/undefined
      catchError((error ) => {
        console.error('HTTP getContacts Error:', error);
        return throwError(() => new Error(error.message || 'Failed to fetch contacts from JSON server.'));
      })
    );
  }

  // --- Public Method for Components to Get Contacts ---
  public getContacts(): Observable<Contact[]> {
    return this._contacts$;
  }
  public getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`).pipe(
      map(data => data || {} as Contact),
      catchError((error) => {
        console.error('HTTP getContactById Error:', error);
        return throwError(() => new Error(error.message || 'Failed to fetch contact by ID.'));
      })
    );
  }

  // --- Public Method to Trigger Revalidation from Anywhere ---
  public revalidateContacts(): void {
    console.log('Service: Public revalidateContacts() called.');
    this._revalidateContactsTrigger.next(undefined);
  }

  // --- CUD Operations (Trigger Revalidation after successful CUD) ---
  addContact(contact: Omit<Contact, 'id'>): Observable<Contact> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Required for POST/PUT
    return this.http.post<Contact>(this.apiUrl, contact, { headers }).pipe(
      map(response => {
        console.log('Service: Contact added, triggering revalidation.');
        this.revalidateContacts(); // Trigger revalidation after add
        return response;
      }),
      catchError((error ) => {
        console.error('HTTP addContact Error:', error);
        return throwError(() => new Error(error.message || 'Failed to add contact.'));
      })
    );
  }

  updateContact(contact: Contact, id: string): Observable<Contact> { // CHANGED: 'id' is part of 'contact' object for PUT
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Required for POST/PUT
    // For JSON server, you typically update by sending the full object to /contacts/:id
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact, { headers }).pipe(
      map(response => {
        console.log('Service: Contact updated, triggering revalidation.');
        this.revalidateContacts(); // Trigger revalidation after update
        return response;
      }),
      catchError((error) => {
        console.error('HTTP updateContact Error:', error);
        return throwError(() => new Error(error.message || 'Failed to update contact.'));
      })
    );
  }

  deleteContact(id: string): Observable<Contact> { // CHANGED: Return type is often the deleted item, or void
    // For JSON server, you typically delete by ID using /contacts/:id
    return this.http.delete<Contact>(`${this.apiUrl}/${id}`).pipe( // Assuming JSON server returns the deleted item
      map(response => {
        console.log('Service: Contact deleted, triggering revalidation.');
        this.revalidateContacts(); // Trigger revalidation after delete
        return response; // Or just `return {} as Contact;` if you don't need the deleted object back
      }),
      catchError((error) => {
        console.error('HTTP deleteContact Error:', error);
        return throwError(() => new Error(error.message || 'Failed to delete contact.'));
      })
    );
  }
}