import { ViewChild } from '@angular/core';
import { ClothingItemCardComponent } from '../clothing-item-card/clothing-item-card.component';
import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { NgForOf } from '@angular/common';
import { OutfitCardComponent } from "../outfit-card/outfit-card.component";
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NgForOf, ClothingItemCardComponent, OutfitCardComponent,CommonModule]
})
export class HomeComponent {
  @ViewChild(ClothingItemCardComponent) child: any;
  numberOfCardsClothing = [];
  numberOfCardsOutfit = [];

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
     this.numberOfCardsClothing = await response.json();
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
          this.numberOfCardsOutfit = await response.json();    
    } else {
      console.error(response.status);
    }
  }

  ngOnInit(): void {
    this.getAllClothingItems();
    this.getAllOutfitItems();
  }
 }
