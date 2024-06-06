import { CommonModule, NgForOf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { CLOSET_GET_ALL_ERROR, OUTFITS_GET_ALL_ERROR } from '../../constants/errors.constants';
import { GetClothingItem } from '../../interfaces/clothing.interface';
import { ClothingImageConverterService } from '../../services/clothing-image-converter.service';
import { ModalDataService } from '../../services/modal-data.service';
import { ClothingItemCardComponent } from '../clothing-item-card/clothing-item-card.component';
import { OutfitCardComponent } from "../outfit-card/outfit-card.component";

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
  imports: [NgForOf, ClothingItemCardComponent, CommonModule, OutfitCardComponent]
})
export class FavoritesComponent {
  @ViewChild(ClothingItemCardComponent) child: any;

  needsReload: boolean = false;
  clothingItems: any[] = [];
  outfits: any[] = [];
  favoriteClothingItems = [];
  favoriteOutfits = [];

  constructor(private clothingImageConverterService: ClothingImageConverterService, private keycloakService: KeycloakService, private modalDataService: ModalDataService) { }

  async getAllClothingItems(): Promise<void> {
    try {
      const apiUrl = `http://localhost:8080/api/v1/user/clothing-items?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await this.keycloakService.getToken()}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const items = await response.json();
        this.clothingItems = items;
        this.clothingItems.forEach((clothingItem: GetClothingItem) => {
          clothingItem.image = this.clothingImageConverterService.addDataUrlPrefix(clothingItem.image);
        });
        this.favoriteClothingItems = items.filter((item: { isFavorite: any; }) => item.isFavorite);
      } else {
        throw new Error();
      }
    } catch {
      this.modalDataService.setError(CLOSET_GET_ALL_ERROR);
    }
  }

  async getAllOutfitItems(): Promise<void> {
    try {
      const apiUrl = `http://localhost:8080/api/v1/user/outfits?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await this.keycloakService.getToken()}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const items = await response.json();
        this.outfits = items;
        this.favoriteOutfits = items.filter((item: { isFavorite: any; }) => item.isFavorite);
      } else {
        throw new Error();
      }
    } catch {
      this.modalDataService.setError(OUTFITS_GET_ALL_ERROR);
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
