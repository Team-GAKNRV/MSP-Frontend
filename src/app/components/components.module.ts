import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddItemViewComponent } from './add-item-view/add-item-view.component';
import { AppInputComponent } from './app-input/app-input.component';
import { AppDropDownComponent } from './app-drop-down/app-drop-down.component';
import { AppButtonComponent } from './app-button/app-button.component';
import { AppImageViewerComponent } from './app-image-viewer/app-image-viewer.component';



@NgModule({
    declarations: [
        NavBarComponent,
        AddItemViewComponent,
        AppInputComponent,
        AppDropDownComponent,
        AppButtonComponent,
        AppImageViewerComponent
    ],
  exports: [
    AppDropDownComponent,
    NavBarComponent,
    AddItemViewComponent
  ],
    imports: [
        CommonModule
    ]
})
export class ComponentsModule { }
