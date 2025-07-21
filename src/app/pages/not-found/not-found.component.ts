import { Component, OnInit, inject, OnDestroy, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // Crucial!
import { fromEvent, Subscription } from 'rxjs'; // For popstate listener (optional fallback)
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent { // Add OnDestroy for clarity

  private router = inject(Router);
  goToHomePage(): void {
    this.router.navigate(['/home']);
  }
}