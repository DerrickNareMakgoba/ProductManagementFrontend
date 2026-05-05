import { inject, Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { IAddProduct, IPagedResult, IProduct } from '../interfaces/Product/product';

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

  GetAllProducts(pageNumber = 1, pageSize = 3, search = '') : void {
    this._loading$.next(true);
    this._apiService.get<IPagedResult<IProduct>>(`Product/all-paged?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`).subscribe({
      next: (response) => {
        this.products$.next(response);
        this._loading$.next(false);
      },
      error: (err) => {
        console.log('error : ', err)
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
        console.log('add product error:', err);
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
        console.log('delete error:', err);
        this._loading$.next(false);
      }
    });
  }
}
