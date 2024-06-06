import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { KeycloakService } from 'keycloak-angular';
import { ClothingImageConverterService } from '../../services/clothing-image-converter.service';

@Component({
  selector: 'app-inspiration-card',
  standalone: true,
  imports: [FontAwesomeModule, NgIf],
  templateUrl: './inspiration-card.component.html',
  styleUrl: './inspiration-card.component.css',
})
export class InspirationCardComponent {
  @Input() data: any;

  showAddButton: boolean = true;

  constructor(private keycloakService: KeycloakService, private cic: ClothingImageConverterService) { }

  isImageAtIndex(num: number): string {
    const pieces: { [key: string]: any; }[] = this.data.pieces;
    if (pieces[num] && pieces[num]['image']) {
      return this.cic.base64ToImage(pieces[num]['image']);
    } else {
      return this.cic.base64ToImage(
        'iVBORw0KGgoAAAANSUhEUgAAAfQAAAF3CAYAAABT8rn8AAAC7klEQVR4Xu3BMQEAAADCoPVPbQsvoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACuBnPMAAHXcKOOAAAAAElFTkSuQmCC'
      );
    }
  }

  getCommonUsage(data: any): string {
    const pieces: { [key: string]: any; }[] = data.pieces;
    const usages: any[] = [];
    let mostCommon: string = 'NA';
    for (let i = 0; i < pieces.length; i++) {
      usages.push(pieces[i]['usage']);
    }
    mostCommon = usages.reduce((a, b, i, arr) =>
      arr.filter((v) => v === a).length > arr.filter((v) => v === b).length
        ? a
        : b
    );
    return mostCommon;
  }

  getCommonSeason(data: any): string {
    const pieces: { [key: string]: any; }[] = data.pieces;
    const seasons: any[] = [];
    let mostCommon: string = 'NA';
    for (let i = 0; i < pieces.length; i++) {
      seasons.push(pieces[i]['season']);
    }
    mostCommon = seasons.reduce((a, b, i, arr) =>
      arr.filter((v) => v === a).length > arr.filter((v) => v === b).length
        ? a
        : b
    );
    return mostCommon;
  }

  getCommonColor(data: any): string {
    const pieces: { [key: string]: any; }[] = data.pieces;
    const seasons: any[] = [];
    let mostCommon: string = 'NA';
    for (let i = 0; i < pieces.length; i++) {
      seasons.push(pieces[i]['color']);
    }
    mostCommon = seasons.reduce((a, b, i, arr) =>
      arr.filter((v) => v === a).length > arr.filter((v) => v === b).length
        ? a
        : b
    );
    return mostCommon;
  }

  async rerollOutfit(usage: String): Promise<void> {
    const apiUrl = `http://localhost:8080/api/v1/user/outfit/generate?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub
      }&usage=${usage}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await this.keycloakService.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      this.data = await response.json();
      this.showAddButton = true;
    } else {
      window.alert(
        'Fehlermeldung: Es konnten keine Outfits generiert werden. Bitte laden sie die Seite neu oder fügen sie neue Kleidungsstücke in ihren Kleiderschrank hinzu.'
      );
      console.log(response.status);
    }
  }

  async addOutfit(outfit: any) {
    const apiUrl = `http://localhost:8080/api/v1/user/outfit?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub
      }`;
    const requestBody = {
      pieces: [
        outfit.pieces[0]._id,
        outfit.pieces[1]._id,
        outfit.pieces[2]._id,
      ],
      isFavorite: false,
    };
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await this.keycloakService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      this.showAddButton = false;
    } else {
      console.log(response.status);
    }
  }
}
