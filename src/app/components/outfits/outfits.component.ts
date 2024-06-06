import { NgForOf } from "@angular/common";
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { KeycloakService } from "keycloak-angular";
import { OUTFITS_GET_ALL_ERROR } from "../../constants/errors.constants";
import { GetClothingItem } from "../../interfaces/clothing.interface";
import { AddOutfit, GetOutfit } from '../../interfaces/outfit.interface';
import { ClothingImageConverterService } from "../../services/clothing-image-converter.service";
import { ModalDataService } from "../../services/modal-data.service";
import { OutfitService } from "../../services/outfit.service";
import { AddItemCardComponent } from "../add-item-card/add-item-card.component";
import { ModalWrapperComponent } from "../modal-wrapper/modal-wrapper.component";
import { OutfitCardComponent } from "../outfit-card/outfit-card.component";
import { OutfitsModalComponent } from "../outfits-modal/outfits-modal.component";

@Component({
  selector: 'app-outfits',
  standalone: true,
  templateUrl: './outfits.component.html',
  styleUrl: './outfits.component.css',
  imports: [
    NgForOf,
    OutfitCardComponent,
    ModalWrapperComponent,
    OutfitsModalComponent,
    AddItemCardComponent
  ]
})
export class OutfitsComponent implements OnInit {
  @ViewChild(OutfitCardComponent) child: any;

  @Output() itemClicked = new EventEmitter<any>();

  showModal: boolean = false;
  needsReload: boolean = false;
  allOutfits: GetOutfit[] = [];

  constructor(private clothingImageConverterService: ClothingImageConverterService, private keycloakService: KeycloakService, private modalDataService: ModalDataService, private outfitService: OutfitService) { }

  ngOnInit(): void {
    this.modalDataService.needsReload$.subscribe(needsReload => {
      this.needsReload = needsReload;
      if (this.needsReload) {
        this.getAllOutfits();
        this.modalDataService.setNeedsReload(false);
      }
    });

    this.getAllOutfits();
  }

  async getAllOutfits(): Promise<void> {
    const bearerToken = await this.keycloakService.getToken();
    const userId = this.keycloakService.getKeycloakInstance().tokenParsed?.sub;

    if (userId) {
      try {
        this.modalDataService.setShowLoadingScreen(true);
        const response = await this.outfitService.getAllOutfits(bearerToken, userId);

        if (response.ok) {
          this.allOutfits = await response.json();
          this.allOutfits.forEach((outfit: GetOutfit) => {
            outfit.pieces.forEach((clothingItem: GetClothingItem) => {
              clothingItem.image = this.clothingImageConverterService.addDataUrlPrefix(clothingItem.image);
            });
          });
        } else {
          throw new Error();
        }
      } catch {
        this.modalDataService.setError(OUTFITS_GET_ALL_ERROR);
      } finally {
        this.modalDataService.setShowLoadingScreen(false);
      }
    }
  }

  addNewOutfit() {
    const newOutfit: AddOutfit = {
      pieces: [],
      isFavorite: false
    };

    this.modalDataService.setSaveAsNewOutfit(true);
    this.openModal(newOutfit);
  }

  openModal(data: GetOutfit | AddOutfit) {
    this.modalDataService.setOutfitData(data);
    this.showModal = true;
  }

  closeModal() {
    this.modalDataService.setSaveAsNewOutfit(false);
    this.showModal = false;
  }
}
