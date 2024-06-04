import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ClothingItem } from '../../classes/clothing-item.class';
import { ClothingImageConverter } from '../../services/clothing-image-converter.service';
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

  constructor(private clothingService: ClothingService, private clothingImageConverterService: ClothingImageConverter, private keycloakService: KeycloakService) { }

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

  onClick(): void {
    this.itemClicked.emit(this.data);
  }
}
