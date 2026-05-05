import { inject, Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { IPagedResult, IProduct } from '../interfaces/Product/product';

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
}
