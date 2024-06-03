import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleType } from '../../enums/articleType.enum';
import { BaseColour } from '../../enums/baseColour.enum';
import { MasterCategory } from '../../enums/masterCategory.enum';
import { Season } from '../../enums/season.enum';
import { SubCategory } from '../../enums/subCategory.enum';
import { Usage } from '../../enums/usage.enum';
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
  @Input() modalIsOpen: boolean | undefined;
  @Output() close = new EventEmitter<void>();

  clothingItem: any;

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

  constructor(private modalDataService: ModalDataService) { }

  ngOnInit() {
    this.modalDataService.data$.subscribe(clothingItemData => {
      this.clothingItem = clothingItemData;
      if (this.clothingItem) {
        this.fillInClothingItemData();
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

  handleSaveClick() {
    // Logic to save
    this.close.emit();
  }

  handleCancelClick() {
    // Logic to cancel
    this.close.emit();
  }

  closeModal() {
    this.close.emit();
  }
}
