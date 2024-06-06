import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ClothingItem } from '../../classes/clothing-item.class';
import { ClothingImageConverterService } from '../../services/clothing-image-converter.service';
import { ClothingService } from '../../services/clothing.service';

@Component({
  selector: 'app-clothing-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clothing-item-card.component.html',
  styleUrl: './clothing-item-card.component.css'
})
export class ClothingItemCardComponent {

  @Input() data: any;
  @Output() itemClicked = new EventEmitter<any>();

  convertedImage: string | undefined;

  constructor(private clothingService: ClothingService, private clothingImageConverterService: ClothingImageConverterService, private keycloakService: KeycloakService) { }

  async toggleFavorite(event: Event): Promise<void> {
    event.stopPropagation();

    const bearerToken = await this.keycloakService.getToken();
    const base64Image = this.clothingImageConverterService.stripDataUrlPrefix(this.data.image);
    const updatedClothingItem = new ClothingItem(this.data.name, base64Image, this.data.brand, this.data.color, this.data.masterCategory, this.data.subCategory, this.data.type, this.data.season, this.data.usage, !this.data.isFavorite);

    await this.clothingService.updateClothingItem(bearerToken, this.data._id, updatedClothingItem)
      .then(() => {
        this.data.isFavorite = !this.data.isFavorite;
      })
      .catch(error => {
        console.error('Error updating clothing item:', error);
      });
  }

  async deleteItem(event: Event): Promise<void> {
    event.stopPropagation();
    const apiUrl = `http://localhost:8080/api/v1/user/clothing-item?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub!}&clothing-item-id=${this.data._id}`;
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${await this.keycloakService.getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log('Clothing item deleted');
      window.location.reload();
    } else {
      console.error(`Failed to update clothing item: ${response.status}`);
    }
  }

  onClick(): void {
    this.itemClicked.emit(this.data);
  }

}
