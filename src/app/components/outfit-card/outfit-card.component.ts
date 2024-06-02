import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-outfit-card',
  standalone: true,
  imports: [],
  templateUrl: './outfit-card.component.html',
  styleUrl: './outfit-card.component.css'
})
export class OutfitCardComponent{

  @Input() data: any;

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

}
