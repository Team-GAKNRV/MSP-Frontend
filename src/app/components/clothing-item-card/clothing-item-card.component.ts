import { Component, Input, OnInit } from '@angular/core';
import { ClothingImageConverter } from '../../services/clothing-image-converter.service';

@Component({
  selector: 'app-clothing-item-card',
  standalone: true,
  imports: [],
  templateUrl: './clothing-item-card.component.html',
  styleUrl: './clothing-item-card.component.css'
})
export class ClothingItemCardComponent implements OnInit {
  @Input() data: any;

  convertedImage: string | undefined;

  constructor(private clothingImageConverter: ClothingImageConverter) { }

  ngOnInit(): void {
    this.convertedImage = this.clothingImageConverter.base64ToImage(this.data.image);
  }
}
