import { Contact } from '@/service/contact.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, Subject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  http = inject(HttpClient);
  private _contacts$: Observable<Contact[]>;
  private _revalidateTrigger = new BehaviorSubject<void>(undefined);
  constructor(){
    this._contacts$ = this._revalidateTrigger.pipe(
      switchMap(() => this.http.get<Contact[]>('http://localhost:3000/contacts').pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        tap(() => console.log('revalidating'))
      )),
      shareReplay({ bufferSize: 1, refCount: true }),
      tap(() => console.log('revalidated'))
    );
  }

  getData(){
    return this._contacts$;

  }
  revalidate(){
    this._revalidateTrigger.next();

  }


}
