import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import {AddItemViewComponent} from "./components/add-item-view/add-item-view.component";

const routes: Routes = [
  //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: AddItemViewComponent,  canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export { routes }
