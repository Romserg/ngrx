import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';

import * as ProductActions from './product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()

export class ProductsEffects {

  constructor(private actions$: Actions, private productService: ProductService) {
  }

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() => this.productService.getProducts().pipe(
        map(products => ProductActions.loadProductsSuccess({ products })),
        catchError(error => of(ProductActions.loadProductsFailure({ error }))),
      )),
    );
  });

  updateProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap((action) => this.productService.updateProduct(action.product).pipe(
        map(product => ProductActions.updateProductSuccess({ product })),
        catchError(error => of(ProductActions.updateProductFailure({ error }))),
      )),
    );
  });

  createProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.createProduct),
      mergeMap((action) => this.productService.createProduct(action.product).pipe(
        map(product => ProductActions.createProductSuccess({ product })),
        catchError(error => of(ProductActions.createProductFailure({ error }))),
      )),
    );
  });
}
