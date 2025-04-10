import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './reducer/loading.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('loading', appReducer),
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
export class LoadingManagerStoreModule {}
