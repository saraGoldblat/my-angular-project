import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { HomeComponent } from "./components/home/home.component";
import { ViewProductComponent } from "./components/view-product/view-product.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProductTestComponent } from "./components/product-test/product-test.component";
import { ProductManagementComponent } from "./components/product-management/product-management.component";
import { UserManagementComponent } from "./components/user-management/user-management.component";
import { TestComponentComponent } from "./components/test-component/test-component.component";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { WishListComponent } from "./components/wish-list/wish-list.component";
import { CommonModule } from '@angular/common';
import { Product } from './classes/product';
import { CategoryProductsComponent } from "./components/category-products/category-products.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, HomeComponent, ViewProductComponent, RegisterComponent, ProductTestComponent, ProductManagementComponent, UserManagementComponent, TestComponentComponent, WishListComponent, CommonModule, MatSidenavModule, CategoryProductsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Goldblat-Diamonds';

    // לבחירה ישירות את קומפוננטת ה-Wish List (נניח שהוספנו תכונה #wishListComp בתבנית)
   @ViewChild('wishSidenav') wishSidenav!: MatSidenav;

  toggleWishSidenav(): void {
    this.wishSidenav.toggle();
  }
}
