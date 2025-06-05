import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SaleComponent } from './components/sale/sale.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sale', component: SaleComponent },
    { path: 'viewproduct', component: ViewProductComponent },
    {path:'register',component:RegisterComponent},
    {path: '',component:HomeComponent},
    { path: 'category/:name', component: CategoryProductsComponent },
    {path: 'categor-management', component:CategoryManagementComponent}, // Redirect to home for any unknown routes
    {path:'my-account',component:MyAccountComponent},
    {path:'user-management',component:UserManagementComponent},
    { path: 'product/:id', component: ProductDetailsComponent },
    {path:'product-management',component:ProductManagementComponent},
    { path: 'cart', component: CartComponent },
    { path: 'order-history', component: OrderHistoryComponent },
{path: 'test-component',component:TestComponentComponent}, // Redirect to admin-dashboard for /admin
    {
  path: 'admin-dashboard',
  component: AdminDashboardComponent,
  // canActivate: [adminGuard]
},
{path:'about-us',component:AboutUsComponent}




];
