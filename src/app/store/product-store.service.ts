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
    pageSize: 10,
    totalCount: 0
  });

  GetAllProducts(pageNumber = 1, pageSize = 10, search = '') : void {
    this._apiService.get<IPagedResult<IProduct>>(`Product/all-paged?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`).subscribe({
      next: (response) => {
        console.log('response : ', response)
        this.products$.next(response);
      },
      error: (err) => {
        console.log('error : ', err)
      }
    })
  }

  AddProduct(product: IAddProduct): void {
    this._apiService.post<IProduct>('Product', product).subscribe({
      next: (created) => {

        const current = this.products$.value;

        const updated = {
          ...current,
          items: [created, ...current.items]
        };

        this.products$.next(updated);
      },
      error: (err) => {
        console.log('add product error:', err);
      }
    });
  }

  deleteProduct(id: number): void {
    this._apiService.delete(`Product/${id}`).subscribe({
      next: () => {

        const current = this.products$.value;

        const updated: IPagedResult<IProduct> = {
          ...current,
          items: current.items.filter(p => p.id !== id)
        };

        this.products$.next(updated);
      },
      error: (err) => {
        console.log('delete error:', err);
      }
    });
  }
}
