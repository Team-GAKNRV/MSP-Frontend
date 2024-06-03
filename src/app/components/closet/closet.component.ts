import { NgForOf, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { KeycloakService } from "keycloak-angular";
import { ClothingImageConverter } from '../../services/clothing-image-converter.service';
import { ModalDataService } from '../../services/modal-data.service';
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
  selectedCard: any = false;
  selectedFile: File | null = null;
  numberOfCards = [];

  constructor(private keycloakService: KeycloakService, private modalDataService: ModalDataService, private clothingImageConverterService: ClothingImageConverter) { }

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
    this.modalDataService.setData(data);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedCard = null;
  }

  classifyImageAndOpenClothingView() {
    if (this.selectedFile !== null) {
      this.clothingService.classifyImage(this.selectedFile).subscribe(
        (response: any) => {
          this.fileUploadService.setFile(this.selectedFile!);
          this.clothingService.setClassificationInformation(response);
          this.router.navigateByUrl('view');
        },
        (error: any) => console.error('Upload failed', error)
      );
    } else {
      console.error('No file selected');
    }
  }

}
