import { Component, Input, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular'
import { ClothingDataService } from '../../services/clothing-data.service';
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

  constructor(private clothingDataService: ClothingDataService, private keycloakService: KeycloakService) {
  }

  base64ToImage(base65String: string): string {
    const byteCharacters = atob(base65String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    return URL.createObjectURL(blob);
  }
  async fetchData(): Promise<void> {
    const userId = this.keycloakService.getKeycloakInstance().tokenParsed?.sub;
    if (userId) {
      this.clothingDataService.getClothingItems(userId).subscribe(
        (response) => {
          this.data = response.map(this.data , ({
            ...this.data,
            isFavorite: this.data.isFavorite 
          }));
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
}
async checkFavoriteStatus(): Promise<void> {
  const userId = this.keycloakService.getKeycloakInstance().tokenParsed?.sub;
  if (userId) {
    const clothingItems = await this.clothingDataService.getClothingItems(userId).toPromise();
    const currentItem = clothingItems.find(this.data , this.data.id === this.data.id);
    if (currentItem) {
      this.data.isFavorite = currentItem.isFavorite;
    }
  }
}

  async toggleFavorite(): Promise<void> {
  this.data.isFavorite = !this.data.isFavorite;
  const userId = this.keycloakService.getKeycloakInstance().tokenParsed?.sub;
  if (userId) {
    try {
     await this.clothingDataService.updateFavoriteStatus(userId, this.data.id, this.data.isFavorite);
    } catch (error) {
      console.log('Error updating favorite status:', error);
      this.data.isFavorite = !this.data.isFavorite;
    }
  }
}

ngOnInit(): void {
  this.fetchData();
  this.checkFavoriteStatus();
}
}
