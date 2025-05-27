import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common'; 
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-category-products',
  imports: [NgFor,CommonModule,RouterLink,MatIcon],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss'
})
export class CategoryProductsComponent implements OnInit ,OnDestroy{
  products: Product[] = [];
  categoryName: string = '';
  private subscription:Subscription=new Subscription(); //מנוי חדש
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService:CategoryService,
    cartService:CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryName = params['name'];
      this.loadCategoryAndProducts(this.categoryName);
    });
  }

  loadCategoryAndProducts(name: string): void {
    this.categoryService.getCategoryByName(name).subscribe({
      next: category => {
        const categoryId = category.id;
        this.subscription = this.productService.getProductsByCategory(categoryId).subscribe({
          next: products => this.products = products,
          error: err => console.error('Failed loading products', err)
        });
      },
      error: err => {
        console.error('Category not found:', err);
        this.products = [];
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}