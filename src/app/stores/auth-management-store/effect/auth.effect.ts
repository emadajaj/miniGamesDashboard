import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../auth-management-store/auth.service';
import * as AuthActions from '../action/auth.action';
import { catchError, map, mergeMap, tap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { startLoading, stopLoading } from '../../loading-management-store/action/loading.action';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private store: Store
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action => {
        this.store.dispatch(startLoading());
        return this.authService.login(action.emailOrPhoneNumber, action.password).pipe(
          map(response => {
            const user = response;
            const token = response.data.accessToken;
            localStorage.setItem('authToken', token);
            
            this.toastr.success('Login Succeeded');
            this.router.navigate(['/dashboard']);
            return AuthActions.loginSuccess({ user, token });
          }),
          catchError(error => {
            // Assuming the error response follows the structure you provided
            let errorResponse = error.error;
            let errorMessage = errorResponse.error.errors[0];

            console.log('Login error:', errorMessage); // Log the full error response
            this.toastr.error(errorMessage); // Display the specific error message
            return of(AuthActions.loginFailure({ error: errorMessage }));
          }),
          finalize(() => this.store.dispatch(stopLoading()))
        );
      })
    )
  );
}