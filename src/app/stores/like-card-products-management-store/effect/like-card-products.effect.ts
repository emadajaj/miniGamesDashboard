import { LikeCardsService, LikeCardData } from './../like-card-products.services';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from '../action/like-card-products.action';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../../loading-management-store/action/loading.action';

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private likeCardsService: LikeCardsService,
    private store:Store
  ) {}

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.ProductActions.addProduct),
      switchMap(action =>
        this.likeCardsService.addProduct(action.product).pipe(
          map(response => ProductActions.ProductActions.addProductSuccess({ response })),
          catchError(error => of(ProductActions.ProductActions.addProductFailure({ error })))
        )
      )
    )
  );

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
        this.likeCardsService.editProduct(action.product).pipe(
          map(() => ProductActions.ProductActions.editProductSuccess()),
          catchError(error => of(ProductActions.ProductActions.editProductFailure({ error }))),
          tap(() => this.store.dispatch(stopLoading()))
        )
      )
    )
  );


  

}