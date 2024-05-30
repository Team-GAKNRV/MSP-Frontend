import {Component, Injectable} from '@angular/core';
import { RouterModule } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(private keycloakService: KeycloakService) {}

  logout(): void{
    if(this.keycloakService.isLoggedIn()){
      this.keycloakService.logout();
    }
  }
}
