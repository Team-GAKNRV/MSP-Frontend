import { CommonModule, NgForOf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ClothingItem } from '../../classes/clothing-item.class';
import { CLOSET_GET_ALL_ERROR, OUTFITS_GET_ALL_ERROR } from '../../constants/errors.constants';
import { ClothingImageConverterService } from '../../services/clothing-image-converter.service';
import { ModalDataService } from '../../services/modal-data.service';
import { ClothingItemCardComponent } from '../clothing-item-card/clothing-item-card.component';
import { OutfitCardComponent } from '../outfit-card/outfit-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [NgForOf, ClothingItemCardComponent, OutfitCardComponent, CommonModule, RouterLink, RouterLinkActive]
})
export class HomeComponent {
  @ViewChild(ClothingItemCardComponent) child: any;

  needsReload: boolean = false;
  numberOfCardsClothing = [];
  numberOfCardsOutfit = [];

  constructor(private clothingImageConverterService: ClothingImageConverterService, private keycloakService: KeycloakService, private modalDataService: ModalDataService) {
  }

  async getAllClothingItems(): Promise<void> {
    try {
      this.modalDataService.setShowLoadingScreen(true);

      const apiUrl = `http://localhost:8080/api/v1/user/clothing-items?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await this.keycloakService.getToken()}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        this.numberOfCardsClothing = await response.json();
        this.numberOfCardsClothing.forEach((card: ClothingItem) => {
          card.image = this.clothingImageConverterService.addDataUrlPrefix(card.image);
        });
      } else {
        throw new Error();
      }
    } catch {
      this.modalDataService.setError(CLOSET_GET_ALL_ERROR);
    } finally {
      this.modalDataService.setShowLoadingScreen(false);
    }
  }

  async getAllOutfitItems(): Promise<void> {
    try {
      this.modalDataService.setShowLoadingScreen(true);

      const apiUrl = `http://localhost:8080/api/v1/user/outfits?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await this.keycloakService.getToken()}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        this.numberOfCardsOutfit = await response.json();
      } else {
        throw new Error();
      }
    } catch {
      this.modalDataService.setError(OUTFITS_GET_ALL_ERROR);
    } finally {
      this.modalDataService.setShowLoadingScreen(false);
    }
  }

  ngOnInit(): void {
    this.modalDataService.needsReload$.subscribe(needsReload => {
      this.needsReload = needsReload;
      if (this.needsReload) {
        this.getAllClothingItems();
        this.getAllOutfitItems();
        this.modalDataService.setNeedsReload(false);
      }
    });

    this.getAllClothingItems();
    this.getAllOutfitItems();
  }
}
