import { Component, ViewChild } from '@angular/core';
import { ClothingItemCardComponent } from '../clothing-item-card/clothing-item-card.component';
import { KeycloakService } from 'keycloak-angular';
import { CommonModule, NgForOf } from '@angular/common';
import { OutfitCardComponent } from "../outfit-card/outfit-card.component";



@Component({
    selector: 'app-favorites',
    standalone: true,
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css',
    imports: [NgForOf, ClothingItemCardComponent, CommonModule, OutfitCardComponent]
})
export class FavoritesComponent{
  @ViewChild(ClothingItemCardComponent) child: any;
  clothingItems: any[] = [];
  outfits: any[] = [];
  favoriteClothingItems = [];
  favoriteOutfits = [];
  
  
  constructor(private keycloakService: KeycloakService) { }

  async getAllClothingItems(): Promise<void> {
    const apiUrl = `http://localhost:8080/api/v1/user/clothing-items?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await this.keycloakService.getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const items  = await response.json();
      this.clothingItems = items;
      this.favoriteClothingItems = items.filter((item: { isFavorite: any; }) => item.isFavorite);
    }
  }

  async getAllOutfitItems(): Promise<void> {
    const apiUrl = `http://localhost:8080/api/v1/user/outfits?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await this.keycloakService.getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const items  = await response.json();
      this.outfits = items;
      this.favoriteOutfits = items.filter((item: { isFavorite: any; }) => item.isFavorite);
    } else {
      console.error(response.status);
    }
  }

  ngOnInit(): void {
    this.getAllClothingItems();
    this.getAllOutfitItems();
  }
}
