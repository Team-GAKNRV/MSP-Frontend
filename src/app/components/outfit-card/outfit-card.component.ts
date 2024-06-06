import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { DELETE_OUTFIT_ERROR, FAVORIZE_OUTFIT_ERROR } from '../../constants/errors.constants';
import { GetClothingItem } from '../../interfaces/clothing.interface';
import { AddOutfit, GetOutfit } from '../../interfaces/outfit.interface';
import { ClothingImageConverterService } from '../../services/clothing-image-converter.service';
import { ModalDataService } from '../../services/modal-data.service';
import { OutfitService } from '../../services/outfit.service';


@Component({
  selector: 'app-outfit-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './outfit-card.component.html',
  styleUrl: './outfit-card.component.css'
})
export class OutfitCardComponent {
  @Input() data: GetOutfit | any;

  @Output() itemClicked = new EventEmitter<any>();

  constructor(private clothingImageConverterService: ClothingImageConverterService, private keycloakService: KeycloakService, private modalDataService: ModalDataService, private outfitService: OutfitService) { }

  isImageAtIndex(num: number): string {
    const pieces: { [key: string]: any; }[] = this.data.pieces;
    const emptyImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAF3CAYAAABT8rn8AAAC7klEQVR4Xu3BMQEAAADCoPVPbQsvoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACuBnPMAAHXcKOOAAAAAElFTkSuQmCC';

    if (pieces[num] && pieces[num]['image']) {
      if (!pieces[num]['image'].includes(this.clothingImageConverterService.BASE64_DATA_URL_SUBSTRING)) {
        return this.clothingImageConverterService.addDataUrlPrefix(pieces[num]['image']);
      } else {
        return pieces[num]['image'];
      }
    } else {
      return emptyImage;
    }
  }

  getCommonUsage(data: any): string {
    const pieces: { [key: string]: any; }[] = data.pieces;
    const usages: any[] = [];
    let mostCommon: string = 'NA';
    for (let i = 0; i < pieces.length; i++) {
      usages.push(pieces[i]['usage']);
    }
    mostCommon = usages.reduce((a, b, i, arr) => arr.filter(v => v === a).length > arr.filter(v => v === b).length ? a : b);
    return mostCommon;
  }

  getCommonSeason(data: any): string {
    const pieces: { [key: string]: any; }[] = data.pieces;
    const seasons: any[] = [];
    let mostCommon: string = 'NA';
    for (let i = 0; i < pieces.length; i++) {
      seasons.push(pieces[i]['season']);
    }
    mostCommon = seasons.reduce((a, b, i, arr) => arr.filter(v => v === a).length > arr.filter(v => v === b).length ? a : b);
    return mostCommon;
  }

  createRequestBody(updatedOutfit: GetOutfit) {
    const addOutfit: AddOutfit = {
      pieces: updatedOutfit.pieces.map((piece: GetClothingItem) => piece._id),
      isFavorite: !updatedOutfit.isFavorite
    };

    return addOutfit;
  }

  async toggleFavorite(event: Event): Promise<void> {
    event.stopPropagation();

    const bearerToken = await this.keycloakService.getToken();
    const updatedOutfit = this.createRequestBody(this.data);

    try {
      const response = await this.outfitService.updateOutfit(bearerToken, this.data._id, updatedOutfit);

      if (response.ok) {
        this.data.isFavorite = !this.data.isFavorite;
        this.modalDataService.setNeedsReload(true);
      } else {
        throw new Error();
      }
    } catch {
      this.modalDataService.setError(FAVORIZE_OUTFIT_ERROR);
    }
  }

  onClick(): void {
    this.itemClicked.emit(this.data);
  }

  async deleteItem(event: Event): Promise<void> {
    event.stopPropagation();

    try {
      const apiUrl = `http://localhost:8080/api/v1/user/outfit?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub!}&outfit-id=${this.data._id}`;
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
      this.modalDataService.setError(DELETE_OUTFIT_ERROR);
    }
  }
}
