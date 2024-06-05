import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { GetClothingItem } from '../../interfaces/clothing.interface';
import { GetOutfit } from '../../interfaces/outfit.interface';
import { ClothingImageConverter } from '../../services/clothing-image-converter.service';
import { ModalDataService } from '../../services/modal-data.service';
import { OutfitService } from '../../services/outfit.service';
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

  constructor(private clothingImageConverterService: ClothingImageConverter, private keycloakService: KeycloakService, private modalDataService: ModalDataService, private outfitService: OutfitService) { }

  ngOnInit(): void {
    this.modalDataService.data$.subscribe(outfitData => {
      this.selectedOutfit = outfitData;

      if (this.selectedOutfit.pieces.length < 4) {
        for (let piecesToAdd = 0; piecesToAdd <= (4 - this.selectedOutfit.pieces.length); piecesToAdd++) {
          this.selectedOutfit.pieces.push({});
        }
      }

      this.selectedOutfitPieces = this.selectedOutfit.pieces;
      console.log(this.selectedOutfitPieces);
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
