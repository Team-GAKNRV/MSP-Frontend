import { Component } from '@angular/core';
import { clothingItemService } from '../../service/clothingItemService'
import {clothingItem} from "../objects/clothingItem";
import {ImageConverterService} from "../../service/imageConverterService";
import {searchInputService} from "../../service/searchInputService";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {color} from "../../enums/color";

@Component({
  selector: 'app-add-item-view',
  templateUrl: './add-item-view.component.html',
  styleUrls: ['./add-item-view.component.css'],
})
export class AddItemViewComponent {

  public name: String = '';
  private brand: String = '';
  public color: String = '';
  private masterCategory: String = '';
  private subCategory: String = '';
  private type: String = '';
  private season: String = '';
  private usage: String = '';
  filteredOptions: Observable<string[]> | undefined;
  private myControl = new FormControl();
  colors: string[] = new color().colors;

  constructor(private clothingItemService: clothingItemService) {}

  addClothingItemOnClick(name: string, brand: string, color: string, masterCategory: string, subCategory: string, type: string, season: string, usage: string): void{
    //let imageInbyteArray: Uint8Array = new ImageConverterService().upload(image);
    this.clothingItemService.addClothingItem(new clothingItem(name, new ImageConverterService().getTestImage() ,brand, color, masterCategory, subCategory, type, season, usage, false));
    //console.log(imageInbyteArray);
    console.log(this.colors.toString())
  }
}
