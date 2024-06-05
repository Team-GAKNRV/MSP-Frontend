import { Component, Input } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-outfit-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './outfit-card.component.html',
  styleUrl: './outfit-card.component.css'
})
export class OutfitCardComponent{

  @Input() data: any;
  constructor(private keycloakService: KeycloakService){}

  base64ToImage(base64String: string): string {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    return URL.createObjectURL(blob);
  }

  isImageAtIndex(num: number): string {
    const pieces: { [key: string]: any }[] = this.data.pieces;
    const emptyImage = 'iVBORw0KGgoAAAANSUhEUgAAAfQAAAF3CAYAAABT8rn8AAAC7klEQVR4Xu3BMQEAAADCoPVPbQsvoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACuBnPMAAHXcKOOAAAAAElFTkSuQmCC';
    if (pieces[num] && pieces[num]['image']) {
      return this.base64ToImage(pieces[num]['image']);
    } else {
      return this.base64ToImage(emptyImage);
    }
  }

  getCommonUsage(data: any): string {
    const pieces: { [key: string]: any }[] = data.pieces;
    const usages: any[] = [];
    let mostCommon: string = 'NA';
    for (let i = 0; i < pieces.length; i++){
      usages.push(pieces[i]['usage']);
    }
    mostCommon = usages.reduce((a, b, i, arr) => arr.filter(v => v === a).length > arr.filter(v => v === b).length ? a : b);
    return mostCommon;
  }

  getCommonSeason(data: any): string {
    const pieces: { [key: string]: any }[] = data.pieces;
    const seasons: any[] = [];
    let mostCommon: string = 'NA';
    for (let i = 0; i < pieces.length; i++){
      seasons.push(pieces[i]['season']);
    }
    mostCommon = seasons.reduce((a, b, i, arr) => arr.filter(v => v === a).length > arr.filter(v => v === b).length ? a : b);
    return mostCommon;
  }

  createRequestBody(updatedOutfit: { pieces: string | any[], isFavorite: boolean; }){
    const requestBody = {
      pieces: [] as string[],
      isFavorite: updatedOutfit.isFavorite
    };
    for (let i = 0; i < updatedOutfit.pieces.length; i++) {
      requestBody.pieces.push(updatedOutfit.pieces[i]._id);
    }
    return requestBody;
  }

  async updateOutfit(outfitId: string,updatedOutfit: any): Promise<void>{
    const apiUrl = `http://localhost:8080/api/v1/user/outfit?outfit-id=${outfitId}`;
    const requestBody = this.createRequestBody(updatedOutfit);
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${await this.keycloakService.getToken()}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      console.log('Outfit successfully updated.');
    } else {
      console.error(`Error updating Outfit: ${response.status}`);
    }
  }

  async toggleFavorite(): Promise<void> {
    this.data.isFavorite = !this.data.isFavorite;
    console.log(this.data);
    await this.updateOutfit(this.data._id, this.data)
    .then(() => {
      console.log('Outfit successfully updated.');
    })
    .catch(error => {
      console.error('Error updating Outfit', error);
    });
  }

  async buttonClockEvent(event: Event): Promise<void> {
    event.stopPropagation();
    const apiUrl = `http://localhost:8080/api/v1/user/outfit?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub!}&outfit-id=${this.data._id}`;
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${await this.keycloakService.getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log('Outfit deleted');
      window.location.reload();
    } else {
      console.error(`Failed to update clothing item: ${response.status}`);
    }
  }

}
