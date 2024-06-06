import { NgForOf } from "@angular/common";
import { Component, OnInit, ViewChild } from '@angular/core';
import { KeycloakService } from "keycloak-angular";
import { UPDATE_OUTFIT_ERROR } from "../../constants/errors.constants";
import { ModalDataService } from "../../services/modal-data.service";
import { InspirationCardComponent } from "../inspiration-card/inspiration-card.component";

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

  constructor(private keycloakService: KeycloakService, private modalDataService: ModalDataService) { }

  async getAllOutfits(): Promise<void> {
    try {
      this.modalDataService.setShowLoadingScreen(true);

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
        throw new Error();
      }
    } catch {
      this.modalDataService.setError(UPDATE_OUTFIT_ERROR);
    } finally {
      this.modalDataService.setShowLoadingScreen(false);
    }
  }

  ngOnInit(): void {
    this.getAllOutfits();
  }
}
