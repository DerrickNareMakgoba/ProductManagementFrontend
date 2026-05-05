import { Component, inject, OnInit } from '@angular/core';
import { ProductStore } from '../store/product-store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private readonly _productStore = inject(ProductStore);

  ngOnInit(): void {
    this._productStore.GetAllProducts();
  }

}
