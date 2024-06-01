import { Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./guards/auth.guard";
import { ClosetComponent } from './components/closet/closet.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'closet', component: ClosetComponent }
];

