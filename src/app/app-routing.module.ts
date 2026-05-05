import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './product/components/add-product/add-product.component';

const routes: Routes = [
  { path: '', component:  ProductComponent}, 
  { path: 'category', component: CategoryComponent },
  { path: 'add-product', component: AddProductComponent },  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
