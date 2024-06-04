import { Component, Input, OnInit } from '@angular/core';
import { ClothingImageConverter } from '../../services/clothing-image-converter.service';
import { KeycloakService } from 'keycloak-angular'
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-clothing-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clothing-item-card.component.html',
  styleUrl: './clothing-item-card.component.css'
})
export class ClothingItemCardComponent implements OnInit{

  @Input() data: any;
  convertedImage: string | undefined;

  constructor(private clothingImageConverter: ClothingImageConverter, private keycloakService: KeycloakService) { }

  async updateClothingItem(clothingItemId: string, updatedClothingItem: any): Promise<void> {
    const apiUrl = `http://localhost:8080/api/v1/user/clothing-item?clothing-item-id=${clothingItemId}`;
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${await this.keycloakService.getToken()}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(updatedClothingItem)
    });

    if (response.ok) {
      console.log('Clothing item updated successfully');
    } else {
      console.error(`Failed to update clothing item: ${response.status}`);
    }
  }

  async toggleFavorite(): Promise<void> {
    this.data.isFavorite = !this.data.isFavorite;
    await this.updateClothingItem(this.data._id, this.data)
      .then(() => {
        console.log('Clothing item successfully updated.');
      })
      .catch(error => {
        console.error('Error updating clothing item:', error);
      });
  }

  ngOnInit(): void {
    this.convertedImage = this.clothingImageConverter.base64ToImage(this.data.image);
  }

}
