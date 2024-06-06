import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ClothingItem } from '../../classes/clothing-item.class';
import { ClothingItemToReplace, GetClothingItem } from '../../interfaces/clothing.interface';
import { AddOutfit, GetOutfit } from '../../interfaces/outfit.interface';
import { ClothingImageConverterService } from '../../services/clothing-image-converter.service';
import { ClothingService } from '../../services/clothing.service';
import { ModalDataService } from '../../services/modal-data.service';
import { OutfitService } from '../../services/outfit.service';
import { AddOutfitCardComponent } from "../add-outfit-card/add-outfit-card.component";
import { OutfitsModalClothingCardComponent } from "../outfits-modal-clothing-card/outfits-modal-clothing-card.component";

@Component({
  selector: 'app-outfits-modal',
  standalone: true,
  templateUrl: './outfits-modal.component.html',
  styleUrl: './outfits-modal.component.css',
  imports: [AddOutfitCardComponent, CommonModule, NgTemplateOutlet, OutfitsModalClothingCardComponent]
})
export class OutfitsModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  itemClicked = new EventEmitter<any>();
  needsReload: boolean = false;
  isSelectingAClothingView: boolean = false;
  selectedOutfit: GetOutfit | any;
  selectedOutfitPieces: GetClothingItem[] = [];
  clothingItemToReplace: ClothingItemToReplace | any;
  addToSelectedOutfit: boolean = false;
  saveAsNewOutfit: boolean = false;
  emptyOutfitPiecesCount: any[] = [];
  userClosetItems: ClothingItem[] = [];

  constructor(private clothingService: ClothingService, private clothingImageConverterService: ClothingImageConverterService, private keycloakService: KeycloakService, private modalDataService: ModalDataService, private outfitService: OutfitService) { }

  ngOnInit(): void {
    this.modalDataService.outfit$.subscribe(outfitData => {
      this.selectedOutfit = outfitData;
      this.selectedOutfitPieces = [];
      this.emptyOutfitPiecesCount = [];

      if (this.selectedOutfit) {
        for (let piecesToAdd = 0; piecesToAdd < (4 - this.selectedOutfit.pieces.length); piecesToAdd++) {
          this.emptyOutfitPiecesCount.push({});
        }

        this.selectedOutfitPieces = this.selectedOutfit.pieces;
      }
    });

    this.modalDataService.saveAsNewOutfit$.subscribe(setAsNewOutfitData => {
      this.saveAsNewOutfit = setAsNewOutfitData;
    });

    this.fillInUserClosetData();
  }

  async fillInUserClosetData() {
    const bearerToken = await this.keycloakService.getToken();
    const userId = this.keycloakService.getKeycloakInstance().tokenParsed?.sub;

    if (userId) {
      const response = await this.clothingService.getAllClothingItems(bearerToken, userId);

      if (response.ok) {
        this.userClosetItems = await response.json();
        this.userClosetItems.forEach((clothingItem: any) => {
          clothingItem.image = this.clothingImageConverterService.addDataUrlPrefix(clothingItem.image);
        });
      } else {
        this.modalDataService.setError({
          title: 'Fehler beim Laden der Outfits!',
          message: 'Deine Outfits konnten nicht geladen werden. Bitte überprüfe deine Verbindung und versuche es erneut.'
        });
      }
    }
  }

  async handleSaveClick() {
    const bearerToken = await this.keycloakService.getToken();
    const userId = this.keycloakService.getKeycloakInstance().tokenParsed?.sub;
    const selectedOutfitPiecesIds: string[] = this.selectedOutfit.pieces.map((piece: GetClothingItem) => piece._id);
    const outfitToSave: AddOutfit = {
      pieces: selectedOutfitPiecesIds,
      isFavorite: false
    };

    let response;

    if (this.saveAsNewOutfit && userId) {
      response = await this.outfitService.addOutfit(bearerToken, userId, outfitToSave);
    } else {
      response = await this.outfitService.updateOutfit(bearerToken, this.selectedOutfit._id, outfitToSave);
    }

    if (response.ok) {
      this.selectedOutfit = null;
      this.selectedOutfitPieces = [];
      this.emptyOutfitPiecesCount = [];
      this.saveAsNewOutfit = false;
      this.modalDataService.setNeedsReload(true);
      this.close.emit();
    } else {
      this.modalDataService.setError({
        title: 'Fehler beim Aktualisieren des Outfits!',
        message: 'Dein Outfit konnte nicht aktualisiert werden. Bitte überprüfe deine Verbindung und versuche es erneut.'
      });
    }
  }

  handleCancelClick() {
    this.selectedOutfit = null;
    this.selectedOutfitPieces = [];
    this.emptyOutfitPiecesCount = [];
    this.saveAsNewOutfit = false;
    this.close.emit();
  }

  handleAddClothingItem() {
    this.addToSelectedOutfit = true;
    this.isSelectingAClothingView = true;
  }

  handleSelectClothingItem(clothingItemToReplace: ClothingItemToReplace) {
    this.clothingItemToReplace = clothingItemToReplace;
    this.isSelectingAClothingView = true;
  }

  handleSaveSelectedClothingItem(clothingItemToSave: ClothingItemToReplace) {
    if (this.addToSelectedOutfit) {
      this.selectedOutfit.pieces.push(clothingItemToSave.clothingItemData);
      this.emptyOutfitPiecesCount.pop();
    } else {
      this.selectedOutfit.pieces[this.clothingItemToReplace.position] = clothingItemToSave.clothingItemData;
    }

    this.clothingItemToReplace = null;
    this.addToSelectedOutfit = false;
    this.isSelectingAClothingView = false;
  }

  handleStopSelectingClothingItem() {
    this.clothingItemToReplace = null;
    this.addToSelectedOutfit = false;
    this.isSelectingAClothingView = false;
  }

  closeModal() {
    this.close.emit();
  }
}
