import { inject, Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { IPagedResult, IProduct } from '../interfaces/Product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductStore {

  private readonly _apiService = inject(ApiService);

  private readonly _products$ = new BehaviorSubject<IPagedResult<IProduct>>({
    items: [],
    pageNumber : 1,
    pageSize: 10,
    totalCount: 0
  });

  GetAllProducts() : void {
    this._apiService.get<IPagedResult<IProduct>>('Product/all-paged?pageNumber=1&pageSize=10').subscribe({
      next: (response) => {
        console.log('response : ', response)
        this._products$.next(response);
      },
      error: (err) => {
        console.log('error : ', err)
      }
    })
  }
}
