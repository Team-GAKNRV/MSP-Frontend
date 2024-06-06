import { Routes } from '@angular/router';
import { ClosetComponent } from './components/closet/closet.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomeComponent } from "./components/home/home.component";
import { InspirationsComponent } from "./components/inspirations/inspirations.component";
import { OutfitsComponent } from "./components/outfits/outfits.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'closet', component: ClosetComponent },
  { path: 'outfits', component: OutfitsComponent },
  { path: 'inspirations', component: InspirationsComponent },
  { path: 'favorites', component: FavoritesComponent }
];

