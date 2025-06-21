import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NumberListComponent } from './number-list/number-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: NumberListComponent }
]; 