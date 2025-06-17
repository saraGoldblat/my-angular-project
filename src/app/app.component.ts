import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { HomeComponent } from "./components/home/home.component";
import { ViewProductComponent } from "./components/view-product/view-product.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProductTestComponent } from "./components/product-test/product-test.component";
import { ProductManagementComponent } from "./components/product-management/product-management.component";
import { UserManagementComponent } from "./components/user-management/user-management.component";
import { TestComponentComponent } from "./components/test-component/test-component.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, HomeComponent, ViewProductComponent, RegisterComponent, ProductTestComponent, ProductManagementComponent, UserManagementComponent, TestComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Goldblat-Diamonds';
}
