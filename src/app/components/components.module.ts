import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AddItemViewComponent } from './add-item-view/add-item-view.component';
import { AppInputComponent } from './app-input/app-input.component';
import { AppDropDownComponent } from './app-drop-down/app-drop-down.component';
import { AppButtonComponent } from './app-button/app-button.component';
import { AppImageViewerComponent } from './app-image-viewer/app-image-viewer.component';
import { InputWithSearchComponent } from './input-with-search/input-with-search.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';
import { AddFileInputComponent } from './add-file-input/add-file-input.component';

@NgModule({
  declarations: [
    AddItemViewComponent,
    AppInputComponent,
    AppDropDownComponent,
    AppButtonComponent,
    AppImageViewerComponent,
    InputWithSearchComponent,
    CancelButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddItemViewComponent,
    AppInputComponent,
    AppDropDownComponent,
    AppButtonComponent,
    AppImageViewerComponent,
    InputWithSearchComponent,
    CancelButtonComponent,
  ]
})
export class ComponentsModule { }
