import { inject, Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { ICategory } from '../interfaces/category';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryStore {

    private readonly _apiService = inject(ApiService);

    readonly categories$ = new BehaviorSubject<ICategory[]>([]);

    categoriesObs$ = this.categories$.asObservable();

    GetAllCategories() :void {
        this._apiService.get<ICategory[]>('Category/all').subscribe({
            next: (response) => {
                this.categories$.next(response)
            },
            error: (err) => {
                console.log(err);
            }
        })
    }


}
