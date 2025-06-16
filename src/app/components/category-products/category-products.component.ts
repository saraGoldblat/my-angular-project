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
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-products',
  imports: [NgFor,CommonModule,RouterLink,MatIcon,MatMenuModule,MatButtonModule],
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
    private cartService:CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryName = params['name'];
      this.loadCategoryAndProducts(this.categoryName);
    });
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert("המוצר התווסף לעגלה")
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
    sortProducts(order: 'asc' | 'desc'): void {
    if (order === 'asc') {
      this.products.sort((a, b) => a.price - b.price);
    } else {
      this.products.sort((a, b) => b.price - a.price);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}