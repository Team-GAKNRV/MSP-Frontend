import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ClothingItem } from '../../classes/clothing-item.class';
import { ArticleType } from '../../enums/articleType.enum';
import { BaseColour } from '../../enums/baseColour.enum';
import { MasterCategory } from '../../enums/masterCategory.enum';
import { Season } from '../../enums/season.enum';
import { SubCategory } from '../../enums/subCategory.enum';
import { Usage } from '../../enums/usage.enum';
import { ClothingImageConverter } from '../../services/clothing-image-converter.service';
import { ClothingService } from '../../services/clothing.service';
import { FileUploadService } from '../../services/file-upload.service';
import { ClassifiedClothingItem } from '../../types/classified-clothing-item.type';
import { InputComponent } from "../input/input.component";

@Component({
  selector: 'app-clothing-view',
  standalone: true,
  templateUrl: './clothing-view.component.html',
  styleUrl: './clothing-view.component.css',
  imports: [CommonModule, InputComponent]
})
export class ClothingViewComponent {
  uploadedImage: string | ArrayBuffer | null = null;

  nameValue: string = "";
  brandValue: string = "";
  articleTypeValue: string = "";
  baseColourValue: string = "";
  masterCategoryValue: string = "";
  seasonValue: string = "";
  subCategoryValue: string = "";
  usageValue: string = "";

  articleType = ArticleType;
  baseColour = BaseColour;
  masterCategory = MasterCategory;
  season = Season;
  subCategory = SubCategory;
  usage = Usage;

  constructor(private fileUploadService: FileUploadService, private clothingService: ClothingService, private router: Router, private keycloakService: KeycloakService, private clothingImageConverter: ClothingImageConverter) { }

  ngOnInit() {
    const file = this.fileUploadService.getFile();
    const classificationInformation: ClassifiedClothingItem | undefined = this.clothingService.getClassificationInformation();

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImage = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      console.error('No file found in service');
    }

    if (classificationInformation) {
      this.articleTypeValue = classificationInformation.articleType.replaceAll(' ', '_');
      this.baseColourValue = classificationInformation.baseColour.replaceAll(' ', '_');
      this.masterCategoryValue = classificationInformation.masterCategory.replaceAll(' ', '_');
      this.seasonValue = classificationInformation.season.replaceAll(' ', '_');
      this.subCategoryValue = classificationInformation.subCategory.replaceAll(' ', '_');
      this.usageValue = classificationInformation.usage.replaceAll(' ', '_');
    }

    if (!file && !classificationInformation) {
      alert('Es wurde kein Kleidungsstück gefunden. Sie werden zurück zum Kleiderschrank geleitet.');
      this.router.navigateByUrl('closet');
    }
  }
}
