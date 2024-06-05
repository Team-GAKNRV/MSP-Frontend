import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetClothingItem } from '../../interfaces/clothing.interface';
import { GetOutfit } from '../../interfaces/outfit.interface';
import { ModalDataService } from '../../services/modal-data.service';
import { AddOutfitCardComponent } from "../add-outfit-card/add-outfit-card.component";

@Component({
  selector: 'app-outfits-modal',
  standalone: true,
  templateUrl: './outfits-modal.component.html',
  styleUrl: './outfits-modal.component.css',
  imports: [AddOutfitCardComponent, CommonModule, NgTemplateOutlet]
})
export class OutfitsModalComponent implements OnInit {
  @Input() saveAsNewOutfit: boolean = false;

  @Output() close = new EventEmitter<void>();

  needsReload: boolean = false;
  selectedOutfit: GetOutfit | any;
  selectedOutfitPieces: GetClothingItem[] = [];

  constructor(private modalDataService: ModalDataService) { }

  ngOnInit(): void {
    this.modalDataService.outfit$.subscribe(outfitData => {
      this.selectedOutfit = outfitData;

      if (this.selectedOutfit) {
        for (let piecesToAdd = 0; piecesToAdd < (4 - this.selectedOutfit.pieces.length); piecesToAdd++) {
          this.selectedOutfit.pieces.push({});
        }

        this.selectedOutfitPieces = this.selectedOutfit.pieces;
      }
    });
  }

  async handleSaveClick() {
    this.close.emit();
  }

  handleCancelClick() {
    this.close.emit();
  }

  closeModal() {
    this.close.emit();
  }
}
