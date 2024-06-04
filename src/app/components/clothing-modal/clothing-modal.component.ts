import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { ModalDataService } from '../../services/modal-data.service';
import { InputComponent } from "../input/input.component";

@Component({
  selector: 'app-clothing-modal',
  standalone: true,
  templateUrl: './clothing-modal.component.html',
  styleUrl: './clothing-modal.component.css',
  imports: [CommonModule, InputComponent]
})
export class ClothingModalComponent implements OnInit {
  @Input() modalIsOpen: boolean = false;
  @Input() saveAsNewClothingItem: boolean = false;

  @Output() close = new EventEmitter<void>();

  clothingItem: any;
  clothingImage: any;

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

  constructor(private clothingService: ClothingService, private clothingImageConverterService: ClothingImageConverter, private keycloakService: KeycloakService, private modalDataService: ModalDataService) { }

  ngOnInit() {
    this.modalDataService.data$.subscribe(clothingItemData => {
      this.clothingItem = clothingItemData;
      if (this.clothingItem) {
        this.fillInClothingItemData();
      }
    });

    this.modalDataService.file$.subscribe(clothingImage => {
      this.clothingImage = clothingImage;
      if (this.clothingImage) {
        this.convertClothingImageToBase64();
      }
    });
  }

  fillInClothingItemData() {
    this.nameValue = this.clothingItem.name;
    this.brandValue = this.clothingItem.brand;
    this.articleTypeValue = this.clothingItem.type.replaceAll(' ', '_');
    this.baseColourValue = this.clothingItem.color.replaceAll(' ', '_');
    this.masterCategoryValue = this.clothingItem.masterCategory.replaceAll(' ', '_');
    this.seasonValue = this.clothingItem.season.replaceAll(' ', '_');
    this.subCategoryValue = this.clothingItem.subCategory.replaceAll(' ', '_');
    this.usageValue = this.clothingItem.usage.replaceAll(' ', '_');
  }

  convertClothingImageToBase64() {
    const reader = new FileReader();
    reader.onload = () => {
      this.clothingItem.image = reader.result;
    };
    reader.readAsDataURL(this.clothingImage);
  }

  async handleSaveClick() {
    const bearerToken = await this.keycloakService.getToken();

    if (this.saveAsNewClothingItem) {
      const userId = this.keycloakService.getKeycloakInstance().tokenParsed?.sub;

      if (userId !== undefined) {
        const base64Image = this.clothingImageConverterService.stripDataUrlPrefix(this.clothingItem.image);
        const clothingItemToUpload = new ClothingItem(this.nameValue, base64Image, this.brandValue, this.baseColourValue, this.masterCategoryValue, this.subCategoryValue, this.articleTypeValue, this.seasonValue, this.usageValue, this.clothingItem.isFavorite);
        const filledInClothingItem = this.clothingService.createStaticClothingInformation(clothingItemToUpload);

        await this.clothingService.addClothingItem(bearerToken, userId, filledInClothingItem).then(() => this.close.emit());
      }

    } else {
      const base64Image = this.clothingImageConverterService.stripDataUrlPrefix(this.clothingItem.image);
      let clothingItemToUpload = new ClothingItem(this.nameValue, base64Image, this.brandValue, this.baseColourValue, this.masterCategoryValue, this.subCategoryValue, this.articleTypeValue, this.seasonValue, this.usageValue, this.clothingItem.isFavorite);

      await this.clothingService.updateClothingItem(bearerToken, this.clothingItem._id, clothingItemToUpload).then(() => this.close.emit());
    }

    this.modalDataService.setNeedsReload(true);
  }

  handleCancelClick() {
    this.close.emit();
  }

  closeModal() {
    this.close.emit();
  }
}
