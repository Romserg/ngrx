import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';

import * as ProductActions from './actions/product-page.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductApiActions, ProductPageActions } from './actions';

@Injectable()

export class ProductsEffects {

  constructor(private actions$: Actions, private productService: ProductService) {
  }

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.loadProducts),
      mergeMap(() => this.productService.getProducts().pipe(
        map(products => ProductApiActions.loadProductsSuccess({ products })),
        catchError(error => of(ProductApiActions.loadProductsFailure({ error }))),
      )),
    );
  });

  updateProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.updateProduct),
      mergeMap((action) => this.productService.updateProduct(action.product).pipe(
        map(product => ProductApiActions.updateProductSuccess({ product })),
        catchError(error => of(ProductApiActions.updateProductFailure({ error }))),
      )),
    );
  });

  createProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.createProduct),
      mergeMap((action) => this.productService.createProduct(action.product).pipe(
        map(product => ProductApiActions.createProductSuccess({ product })),
        catchError(error => of(ProductApiActions.createProductFailure({ error }))),
      )),
    );
  });

  deleteProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.deleteProduct),
      mergeMap((action) => this.productService.deleteProduct(action.productId).pipe(
        map(() => ProductApiActions.deleteProductSuccess({ productId: action.productId })),
        catchError(error => of(ProductApiActions.createProductFailure({ error }))),
      )),
    );
  });
}
