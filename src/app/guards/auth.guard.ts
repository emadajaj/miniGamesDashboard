// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | Observable<boolean> {
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage

    if (token) {
      return true; // Token exists, allow access
    } else {
      this.router.navigate(['/login']); // Redirect to login if no token
      return false; // Deny access
    }
  }
}