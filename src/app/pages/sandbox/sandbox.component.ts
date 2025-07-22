import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subject, Subscription } from 'rxjs';
import { Contact } from '@/service/contact.service';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-sandbox',
  imports: [],
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.css'
})
export class SandboxComponent implements OnInit {
  service = inject(ServiceService);
  contacts: Contact[] = [];
  testSubject = new BehaviorSubject<number>(0);
  testObservable = new Observable<number>();

  ngOnInit() {
    // setTimeout(() => {
    //   this.testSubject.next(this.testSubject.value + 1);
    //   this.testObservable.subscribe((data) => {
    //     console.log('sub1',data);
    //   });
    // }, 1000);
    // setTimeout(() => {
    //   this.testSubject.next(this.testSubject.value + 1);
    //   this.testObservable.subscribe((data) => {
    //     console.log('sub2',data);
    //   });
    // }, 2000);
    // interval emits an increasing number every 1000ms (1 second)
    this.service.getData().subscribe((data) => {
      console.log('sub1',data);
    });
    this.service.getData().subscribe((data) => {
      console.log('sub2',data);
    });
    setInterval(() => {
      this.service.getData().subscribe((data) => {
        console.log('sub3',data);
      });
    }, 1000);

  }
  onSubmit(){
    this.service.revalidate();
  }


}
