import { Component, OnInit } from '@angular/core';
import { Category } from '../../classes/category';
import { CategoryService } from '../../services/category.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-category-management',
  imports: [FormsModule,NgFor,NgIf,NgClass],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.scss'
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  newCategoryName: string = '';
  selectedCategory: Category | null = null;
  showAddForm: boolean = false;

  constructor(private categoryService: CategoryService,private productService :ProductService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => this.categories = data);
  }

  addCategory(): void {
    if (!this.newCategoryName.trim()) return;
    const newCategory = new Category(0, this.newCategoryName);
    this.categoryService.addCategory(newCategory).subscribe(() => {
      this.newCategoryName = '';
      this.loadCategories();
    });
  }

  selectCategory(category: Category): void {
    this.selectedCategory = { ...category };
  }

  updateCategory(): void {
    if (!this.selectedCategory) return;
    this.categoryService.updateCategory(this.selectedCategory).subscribe({
      next: () => {
        this.selectedCategory = null;
        this.loadCategories();
      },
      error: err => {
        alert('Cannot update/delete category with existing products!');
      }
    });
  }

  deleteCategory(id: number): void {
    this.productService.getProductsByCategory(id).subscribe(products => {
      if (products.length > 0) {
        alert('Cannot delete category with existing products!');
      } else {
        this.categoryService.deleteCategory(id).subscribe(() => this.loadCategories());
      }
    });
  }
}
