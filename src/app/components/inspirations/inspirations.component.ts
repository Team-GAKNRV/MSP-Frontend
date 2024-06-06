import {Component, OnInit, ViewChild} from '@angular/core';
import {InspirationCardComponent} from "../inspiration-card/inspiration-card.component";
import {KeycloakService} from "keycloak-angular";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-inspirations',
  standalone: true,
  imports: [
    InspirationCardComponent,
    NgForOf
  ],
  templateUrl: './inspirations.component.html',
  styleUrl: './inspirations.component.css'
})
export class InspirationsComponent implements OnInit {

  @ViewChild(InspirationCardComponent) child: any;
  numberOfCards = [];

  constructor(private keycloakService: KeycloakService) {
  }

  async getAllOutfits(): Promise<void> {
    const apiUrl = `http://localhost:8080/api/v1/user/outfits/generate?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await this.keycloakService.getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      this.numberOfCards = await response.json();
    } else {
      window.alert("Fehlermeldung: Es konnten keine Outfits generiert werden. Bitte laden sie die Seite neu oder fügen sie neue Kleidungsstücke in ihren Kleiderschrank hinzu.");
    }
  }

  ngOnInit(): void {
    this.getAllOutfits();
  }

}
