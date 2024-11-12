import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./models/dashboard/dashboard.module').then(
      (m) => m.DashboardModule
    ),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./models/products/products.module').then(
      (m) => m.ProductsModule
    ),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
