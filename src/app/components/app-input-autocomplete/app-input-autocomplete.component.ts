import { Component, OnInit, Input } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { Observable, of } from 'rxjs';
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";


@Component({
  selector: 'app-input-autocomplete',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    ReactiveFormsModule,
    NgForOf,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    MatLabel,
    MatFormField,
    MatInput
  ],
  templateUrl: './app-input-autocomplete.component.html',
  styleUrl: './app-input-autocomplete.component.css'
})
export class AppInputAutocompleteComponent {
  @Input() placeholder: string = "";
  @Input() suggestions: string[] = ["test", "Hallo", "Moin"];
  inputValue: string = ''; // Input value for search term

  searchControl = new FormControl('');
  filteredOptions?: Observable<string[]>;

  constructor() { }

}
