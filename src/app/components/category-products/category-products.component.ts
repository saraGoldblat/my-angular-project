import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
import { WishListService } from '../../services/wish-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ProductFilterPipe } from '../../pipes/product-filter.pipe';
import { CoolEffectDirective } from '../../directives/cool-effect.directive';

@Component({
  selector: 'app-category-products',
  imports: [NgFor, CommonModule, RouterLink, MatIcon, MatMenuModule, MatButtonModule, MatLabel, MatFormField, FormsModule, ProductFilterPipe,CoolEffectDirective],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss'
})
export class CategoryProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categoryName: string = '';
  wishListMessage: string = '';
  selectedProductId: number | null = null;
  @Input() productsWishList: Product[] = [];
  searchText: string = ''; // משתנה לחיפוש
  showSearch: boolean = false; // בוליאני לשליטה בהצגת שדה החיפוש  
  private subscription: Subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private wishListService: WishListService,
    private snackBar: MatSnackBar
  ) { }

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
  addToWishList(product: Product): void {
    this.wishListService.addProduct(product);
    this.wishListMessage = 'Product added to Wish List';
    this.snackBar.open("Product added to Wish List!", "close", { duration: 3000 });
    setTimeout(() => this.wishListMessage = '', 3000);
  }
  loadCategoryAndProducts(name: string): void {
    this.categoryService.getCategoryByName(name).subscribe({
      next: category => {
        const categoryId = category.id;
        this.subscription = this.productService.getProductsByCategory(categoryId).subscribe({
          next: products => {
            // סינון המוצרים כך שרק מוצרים עם מלאי גדול מ-0 יוצגו
            this.products = products.filter(product => product.stockQuantity > 0);
          },
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
   toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }
  trackByProduct(index: number, product: Product): number {
    return product.id;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}