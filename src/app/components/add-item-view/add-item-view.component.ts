import { Component } from '@angular/core';
import { ClothingItemService } from '../../service/clothing-item.service'
import {ImageConverterService} from "../../service/imageConverterService";
import {clothingItemObject} from "../../objects/clothingItemObject";

@Component({
  selector: 'app-add-item-view',
  templateUrl: './add-item-view.component.html',
  styleUrls: ['./add-item-view.component.css'],
})
export class AddItemViewComponent {
  constructor(private clothingItemService: ClothingItemService) {}

  addClothingItemOnClick(name: string, brand: string, color: string, masterCategory: string, subCategory: string, type: string, season: string, usage: string): void{
    this.clothingItemService.updateClothingItem(new clothingItemObject(name, new ImageConverterService().getTestImage() ,brand, color, masterCategory, subCategory, type, season, usage, false));
  }
}
