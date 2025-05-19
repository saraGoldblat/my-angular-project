import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SaleComponent } from './components/sale/sale.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sale', component: SaleComponent },
    { path: 'viewproduct', component: ViewProductComponent },
    {path:'register',component:RegisterComponent},
    {path: '',component:HomeComponent},





];
