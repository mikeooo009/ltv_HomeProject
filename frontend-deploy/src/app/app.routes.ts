import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NumberListComponent } from './number-list/number-list.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: NumberListComponent },
  { path: 'profile', component: ProfileComponent }
]; 