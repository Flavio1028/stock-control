import { Routes } from '@angular/router';

import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';

export const DASHBOARD_ROUTER: Routes = [
  {
    path: '',
    component: DashboardHomeComponent
  }
];
