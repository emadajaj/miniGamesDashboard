import { ProductService } from './../products.services';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from '../action/products.action';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../../loading-management-store/action/loading.action';

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store:Store
  ) {}


    // loadAward$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(ProductActions.ProductActions.loadProduct),
    //     tap(() => this.store.dispatch(startLoading())),
    //     mergeMap(action =>
    //       this.likeCardsService.getAward(action.id).pipe( // Assume this method exists
    //         map(award => ProductActions.ProductActions.loadProductSuccess({ product })),
    //         catchError(error => of(ProductActions.ProductActions.loadProductFailure({ error }))),
    //         tap(() => this.store.dispatch(stopLoading()))
    //       )
    //     )
    //   )
    // );

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.ProductActions.editProduct),
      tap(() => this.store.dispatch(startLoading())),
      mergeMap(action =>
        this.productService.editProduct(action.product).pipe(
          map(() => ProductActions.ProductActions.editProductSuccess()),
          catchError(error => of(ProductActions.ProductActions.editProductFailure({ error }))),
          tap(() => this.store.dispatch(stopLoading()))
        )
      )
    )
  );


  

}