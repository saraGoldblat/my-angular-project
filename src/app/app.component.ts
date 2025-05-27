import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { HomeComponent } from "./components/home/home.component";
import { ViewProductComponent } from "./components/view-product/view-product.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProductTestComponent } from "./components/product-test/product-test.component";
import { ProductManagementComponent } from "./components/product-management/product-management.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, HomeComponent, ViewProductComponent, RegisterComponent, ProductTestComponent, ProductManagementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-angular-project';
}
