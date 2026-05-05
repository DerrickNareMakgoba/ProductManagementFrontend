import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAddCategory } from 'src/app/interfaces/category';
import { CategoryStore } from 'src/app/store/category-store.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

    private readonly fb = inject(FormBuilder);
    readonly categoryStore = inject(CategoryStore);
    private readonly _router = inject(Router);
  
    categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

     submit(): void {
        if (this.categoryForm.invalid) return;
    
        const category :IAddCategory = {
          name: this.categoryForm.value.name!,
          description: this.categoryForm.value.description!,
          parentCategoryId: 0
        };
    
        this.categoryStore.AddCategory(category);
    
        this._router.navigate(['/category']);
      }
}
