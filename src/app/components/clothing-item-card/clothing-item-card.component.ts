import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clothing-item-card',
  standalone: true,
  imports: [],
  templateUrl: './clothing-item-card.component.html',
  styleUrl: './clothing-item-card.component.css'
})
export class ClothingItemCardComponent implements OnInit{

  @Input() data: any;

  constructor() {
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

  ngOnInit(): void {
  }

}
