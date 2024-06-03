import { Routes } from '@angular/router';
import { ClosetComponent } from './components/closet/closet.component';
import { HomeComponent } from "./components/home/home.component";
import { OutfitsComponent } from "./components/outfits/outfits.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'closet', component: ClosetComponent },
  { path: 'outfits', component: OutfitsComponent },
  { path: 'closet', component: ClosetComponent },
];

