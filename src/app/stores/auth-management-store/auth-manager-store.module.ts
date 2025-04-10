import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './effect/auth.effect';
import { authReducer } from './reducer/auth.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature(
      [AuthEffects]
    )
  ],
  providers: [
    {
      provide: 'ngrxStore',
      useValue: {
        enabled: true,
      },
    },
  ],
})
export class AuthManagerStoreModule {}
