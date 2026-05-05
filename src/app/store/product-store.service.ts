import { inject, Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { BehaviorSubject, map } from 'rxjs';
import { IAddProduct, IPagedResult, IProduct } from '../interfaces/Product/product';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductStore {

  private readonly _apiService = inject(ApiService);

  readonly products$ = new BehaviorSubject<IPagedResult<IProduct>>({
    items: [],
    pageNumber : 1,
    pageSize: 3,
    totalCount: 0
  });

  private readonly _loading$ = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading$.asObservable();

  private readonly _error$ = new BehaviorSubject<string | null>(null);
  readonly error$ = this._error$.asObservable();

  readonly hasError$ = this._error$.pipe(
    map(err => !!err)
  );

  GetAllProducts(categoryId: number | null, pageNumber = 1, pageSize = 3, search = '') : void {

    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (search?.trim()) {
      params = params.set('search', search);
    }

    if (categoryId != null) {
      params = params.set('categoryId', categoryId.toString());
    }

    console.log(params.toString());
    
    this._loading$.next(true);
    this._apiService.get<IPagedResult<IProduct>>('Product/all-paged', 
    {
        pageNumber,
        pageSize,
        search: search?.trim() || null,
        categoryId
    }
).subscribe({
      next: (response) => {
        this.products$.next(response);
        this._loading$.next(false);
      },
      error: (err) => {
        this._error$.next(err)
        this._loading$.next(false);
      }
    })
  }

  AddProduct(product: IAddProduct): void {
    this._loading$.next(true);
    this._apiService.post<IProduct>('Product', product).subscribe({
      next: (created) => {

        const current = this.products$.value;

        const updated = {
          ...current,
          items: [created, ...current.items]
        };

        this.products$.next(updated);
        this._loading$.next(false);
      },
      error: (err) => {
        this._error$.next(err)
        this._loading$.next(false);
      }
    });
  }

  deleteProduct(id: number): void {
    this._loading$.next(true);
    this._apiService.delete(`Product/${id}`).subscribe({
      next: () => {

        const current = this.products$.value;

        const updated: IPagedResult<IProduct> = {
          ...current,
          items: current.items.filter(p => p.id !== id)
        };

        this.products$.next(updated);
        this._loading$.next(false);
      },
      error: (err) => {
        this._error$.next(err)
        this._loading$.next(false);
      }
    });
  }
}
