import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoggedIn } from '../../stores/auth-management-store/selector/auth.selector';
import { selectLoading } from '../../stores/loading-management-store/selector/loading.selector';
import * as AuthActions from '../../stores/auth-management-store/action/auth.action';

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {

  emailOrPhoneNumber: string = '';
  password: string = '';
  isLoggedIn$: Observable<boolean> | undefined;
  isLoading$: Observable<boolean>

  constructor(private store: Store) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.isLoading$ = this.store.select(selectLoading)
  }

  onLogin() {
    this.store.dispatch(AuthActions.login({ emailOrPhoneNumber: this.emailOrPhoneNumber, password: this.password }));
    console.log(this.emailOrPhoneNumber);
  }
} 