import { Component } from '@angular/core';
import { BaseColour } from '../../enums/baseColours.enum';
import { InputComponent } from "../input/input.component";

@Component({
  selector: 'app-clothing-view',
  standalone: true,
  templateUrl: './clothing-view.component.html',
  styleUrl: './clothing-view.component.css',
  imports: [InputComponent]
})
export class ClothingViewComponent {
  nameValue: string = "";
  brandValue: string = "";
  articleTypeValue: string = "";
  baseColourValue: string = "";
  masterCategoryValue: string = "";
  seasonValue: string = "";
  subCategoryValue: string = "";
  usageValue: string = "";
  baseColour = BaseColour;
}
