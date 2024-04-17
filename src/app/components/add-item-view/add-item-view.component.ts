import { Component } from '@angular/core';
import { clothingItemService } from '../../service/clothingItemService'
import {clothingItem} from "../objects/clothingItem";
import {ImageConverterService} from "../../service/imageConverterService";
import {searchInputService} from "../../service/searchInputService";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

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
  private colors: string[] = [];

  constructor(private clothingItemService: clothingItemService) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    const colors = new searchInputService().getColorValues
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.colors.filter(option => option.toLowerCase().includes(filterValue));
  }

  addClothingItemOnClick(name: string, brand: string, color: string, masterCategory: string, subCategory: string, type: string, season: string, usage: string): void{
    //let imageInbyteArray: Uint8Array = new ImageConverterService().upload(image);
    this.clothingItemService.addClothingItem(new clothingItem(name, new ImageConverterService().getTestImage() ,brand, color, masterCategory, subCategory, type, season, usage, false));
    //console.log(imageInbyteArray);
  }

  showColorSuggestions() {
    const colors = new searchInputService().getColorValues
  }
}
