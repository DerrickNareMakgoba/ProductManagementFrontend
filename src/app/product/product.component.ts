import { Component, inject, OnInit } from '@angular/core';
import { ProductStore } from '../store/product-store.service';
import { combineLatest, debounceTime, distinctUntilChanged, filter, startWith } from 'rxjs';
import { CategoryStore } from '../store/category-store.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  readonly productStore = inject(ProductStore);
  readonly categoryStore = inject(CategoryStore);
  private pageNumber = 1;
  private pageSize = 3;

  searchControl = new FormControl('');
  categoryControl = new FormControl(null);


  ngOnInit(): void {
    this.categoryStore.GetAllCategories();

    combineLatest([
      this.searchControl.valueChanges.pipe(startWith('')),
      this.categoryControl.valueChanges.pipe(startWith(null))
    ])
    .pipe(
      debounceTime(300)
    )
    .subscribe(([search, categoryId]) => {

      this.productStore.GetAllProducts(categoryId, this.pageNumber,this.pageSize,search ?? '');

    });

    this.productStore.hasError$
      .pipe(distinctUntilChanged(),
        filter(Boolean))
      .subscribe((result) => {
        if (result) {
          alert('unable to retrive products');
        }
      });
  }


  onDelete(id: number) {
    this.productStore.deleteProduct(id);
  }

  nextPage() {
    this.productStore.GetAllProducts(this.categoryControl.value,++this.pageNumber, this.pageSize);
  }

  prevPage() {
    this.productStore.GetAllProducts(this.categoryControl.value,--this.pageNumber, this.pageSize);
  }

  onCategoryChange(event: any) {
    const categoryId = event.target.value;
  }

}
