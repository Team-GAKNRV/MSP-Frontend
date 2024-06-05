import { NgForOf, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { KeycloakService } from "keycloak-angular";
import { ClothingItem } from '../../classes/clothing-item.class';
import { ClothingImageConverter } from '../../services/clothing-image-converter.service';
import { ClothingService } from '../../services/clothing.service';
import { ModalDataService } from '../../services/modal-data.service';
import { ClassifiedClothingItem } from '../../types/classified-clothing-item.type';
import { AddItemCardComponent } from "../add-item-card/add-item-card.component";
import { ClothingItemCardComponent } from "../clothing-item-card/clothing-item-card.component";
import { ClothingModalComponent } from "../clothing-modal/clothing-modal.component";
import { ModalWrapperComponent } from "../modal-wrapper/modal-wrapper.component";

@Component({
  selector: 'app-closet',
  standalone: true,
  templateUrl: './closet.component.html',
  styleUrl: './closet.component.css',
  imports: [
    NgIf,
    NgForOf,
    ClothingItemCardComponent,
    AddItemCardComponent,
    ClothingModalComponent,
    ModalWrapperComponent
  ]
})
export class ClosetComponent implements OnInit {

  @ViewChild(ClothingItemCardComponent) child: any;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  showModal: boolean = false;
  saveAsNewItem: boolean = false;
  needsReload: boolean = false;
  selectedCard: any = false;
  selectedFile: File | null = null;
  numberOfCards = [];

  constructor(private keycloakService: KeycloakService, private modalDataService: ModalDataService, private clothingService: ClothingService, private clothingImageConverterService: ClothingImageConverter) { }

  async getAllClothingItems(): Promise<void> {
    const apiUrl = `http://localhost:8080/api/v1/user/clothing-items?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await this.keycloakService.getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      this.numberOfCards = await response.json();
      this.numberOfCards.forEach((card: any) => {
        card.image = this.clothingImageConverterService.addDataUrlPrefix(card.image);
      });
    } else {
      console.error(response.status);
    }
  }


  ngOnInit(): void {
    this.modalDataService.needsReload$.subscribe(needsReload => {
      this.needsReload = needsReload;
      if (this.needsReload) {
        this.getAllClothingItems();
        this.modalDataService.setNeedsReload(false);
      }
    });

    this.getAllClothingItems();
  }

  onOpenFileDialog() {
    this.fileInput!.nativeElement.click();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.classifyImageAndOpenClothingView();
  }

  openModal(data: any) {
    this.modalDataService.setClothingData(data);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.saveAsNewItem = false;
    this.selectedCard = null;
  }

  classifyImageAndOpenClothingView() {
    if (this.selectedFile !== null) {
      this.clothingService.classifyImage(this.selectedFile).subscribe(
        (classificationInformation: ClassifiedClothingItem) => {
          const classifiedClothingItem = new ClothingItem('', '', '', classificationInformation.baseColour, classificationInformation.masterCategory, classificationInformation.subCategory, classificationInformation.articleType, classificationInformation.season, classificationInformation.usage, false);

          this.modalDataService.setFile(this.selectedFile);
          this.modalDataService.setClothingData(classifiedClothingItem);
          this.saveAsNewItem = true;
          this.showModal = true;
        },
        (error: any) => console.error('Upload failed', error)
      );
    } else {
      console.error('No file selected');
    }
  }

}
