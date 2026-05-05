import { Component, inject, OnInit } from '@angular/core';
import { ProductStore } from '../store/product-store.service';
import { distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  readonly productStore = inject(ProductStore);
  private pageNumber = 1;
  private pageSize = 3;


  ngOnInit(): void {
    this.productStore.GetAllProducts();

    this.productStore.hasError$
      .pipe(distinctUntilChanged(),
        filter(Boolean))
      .subscribe((result) => {
        if (result) {
          alert('unable to retrive products');
        }
      });
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value;

    this.productStore.GetAllProducts(1, this.productStore.products$.value.totalCount, searchTerm);
  }

  onDelete(id: number) {
    this.productStore.deleteProduct(id);
  }

  nextPage() {
    this.productStore.GetAllProducts(++this.pageNumber, this.pageSize);
  }

  prevPage() {
    this.productStore.GetAllProducts(--this.pageNumber, this.pageSize);

  }

}
