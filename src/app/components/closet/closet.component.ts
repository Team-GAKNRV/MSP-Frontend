import { NgForOf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from "keycloak-angular";
import { ClothingService } from '../../services/clothing.service';
import { FileUploadService } from '../../services/file-upload.service';
import { AddItemCardComponent } from "../add-item-card/add-item-card.component";
import { ClothingItemCardComponent } from "../clothing-item-card/clothing-item-card.component";

@Component({
  selector: 'app-closet',
  standalone: true,
  templateUrl: './closet.component.html',
  styleUrl: './closet.component.css',
  imports: [
    NgForOf,
    ClothingItemCardComponent,
    AddItemCardComponent
  ]
})
export class ClosetComponent implements OnInit {

  @ViewChild(ClothingItemCardComponent) child: any;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  selectedFile: File | null = null;
  numberOfCards = [];

  constructor(private keycloakService: KeycloakService, private clothingService: ClothingService, private router: Router, private fileUploadService: FileUploadService) { }

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
