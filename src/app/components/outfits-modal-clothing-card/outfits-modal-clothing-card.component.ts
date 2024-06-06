import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetClothingItem } from '../../interfaces/clothing.interface';

@Component({
  selector: 'app-outfits-modal-clothing-card',
  standalone: true,
  imports: [],
  templateUrl: './outfits-modal-clothing-card.component.html',
  styleUrl: './outfits-modal-clothing-card.component.css'
})
export class OutfitsModalClothingCardComponent {
  @Input() clothingItem: GetClothingItem | any;
  @Input() clothingItemPosition: number | any;

  @Output() itemClicked = new EventEmitter<any>();

  onClick(): void {
    this.itemClicked.emit({ position: this.clothingItemPosition, clothingItemData: this.clothingItem });
  }
}
