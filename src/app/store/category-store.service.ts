import { inject, Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { IAddCategory, ICategory } from '../interfaces/category';
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


    AddCategory(body :IAddCategory): void {
        this._apiService.post<ICategory>('category', body).subscribe({
            next: (created) => {
                const current = this.categories$.value;

                const updated = {
                ...current,
                items: [created, ...current]
                };

                this.categories$.next(updated);
            },
            error: (err) =>{
                console.log('err');
            }
        })
    }


}
