import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  constructor(private keycloakService: KeycloakService) {}

  logout(): void {
    this.keycloakService.logout(window.location.origin);
  }

}
