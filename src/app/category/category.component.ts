import { Component, inject, OnInit } from '@angular/core';
import { CategoryStore } from '../store/category-store.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  readonly categoryStore = inject(CategoryStore);

  ngOnInit(): void {
    this.categoryStore.GetAllCategories();
  }
}
