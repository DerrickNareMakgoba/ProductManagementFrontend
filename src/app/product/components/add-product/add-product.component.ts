import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAddProduct } from 'src/app/interfaces/Product/product';
import { CategoryStore } from 'src/app/store/category-store.service';
import { ProductStore } from 'src/app/store/product-store.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class AddProductComponent implements OnInit {



  private readonly fb = inject(FormBuilder);
  private readonly _ProductStore = inject(ProductStore);
  readonly categoryStore = inject(CategoryStore);
  private readonly _router = inject(Router);

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(1)]],
    quantity: [0],
    sku: [''],
    categoryId : [2]
  });


  ngOnInit(): void {
    this.categoryStore.GetAllCategories();
  }

  submit(): void {
    if (this.productForm.invalid) return;

    const product :IAddProduct = {
      name: this.productForm.value.name!,
      description: this.productForm.value.description!,
      price: this.productForm.value.price!,
      quantity: this.productForm.value.quantity!,
      sku: this.productForm.value.sku!,
      categoryId: this.productForm.value.categoryId!,
    };

    this._ProductStore.AddProduct(product);

    this._router.navigate(['/products']);
  }
}
