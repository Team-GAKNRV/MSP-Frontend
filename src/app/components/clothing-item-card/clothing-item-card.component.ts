import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ClothingItem } from '../../classes/clothing-item.class';
import { DELETE_CLOTHING_ITEM_ERROR, FAVORIZE_CLOTHING_ITEM_ERROR } from '../../constants/errors.constants';
import { ClothingImageConverterService } from '../../services/clothing-image-converter.service';
import { ClothingService } from '../../services/clothing.service';
import { ModalDataService } from '../../services/modal-data.service';

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

  constructor(private clothingService: ClothingService, private clothingImageConverterService: ClothingImageConverterService, private modalDataService: ModalDataService, private keycloakService: KeycloakService) { }

  async toggleFavorite(event: Event): Promise<void> {
    event.stopPropagation();

    const bearerToken = await this.keycloakService.getToken();
    const base64Image = this.clothingImageConverterService.stripDataUrlPrefix(this.data.image);
    const updatedClothingItem = new ClothingItem(this.data.name, base64Image, this.data.brand, this.data.color, this.data.masterCategory, this.data.subCategory, this.data.type, this.data.season, this.data.usage, !this.data.isFavorite);

    try {
      const response = await this.clothingService.updateClothingItem(bearerToken, this.data._id, updatedClothingItem);

      if (response.ok) {
        this.data.isFavorite = !this.data.isFavorite;
        this.modalDataService.setNeedsReload(true);
      } else {
        throw new Error();
      }
    } catch {
      this.modalDataService.setError(FAVORIZE_CLOTHING_ITEM_ERROR);
    }
  }

  async deleteItem(event: Event): Promise<void> {
    event.stopPropagation();

    try {
      const apiUrl = `http://localhost:8080/api/v1/user/clothing-item?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub!}&clothing-item-id=${this.data._id}`;
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${await this.keycloakService.getToken()}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        this.modalDataService.setNeedsReload(true);
      } else {
        throw new Error();
      }
    } catch {
      this.modalDataService.setError(DELETE_CLOTHING_ITEM_ERROR);
    }
  }

  onClick(): void {
    this.itemClicked.emit(this.data);
  }
}
