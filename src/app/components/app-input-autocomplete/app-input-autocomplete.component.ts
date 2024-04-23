import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatFormField, MatFormFieldControl} from "@angular/material/form-field";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {state} from "@angular/animations";
import {distinctUntilChanged, map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-app-input-autocomplete',
  standalone: true,
  imports: [
    MatFormField,
    MatAutocomplete,
    MatOption,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    FormsModule,
    MatInput
  ],
  templateUrl: './app-input-autocomplete.component.html',
  styleUrl: './app-input-autocomplete.component.css'
})
export class AppAutocompleteInputComponent {
  @Input() suggestions: string[] = [];
  @Output() selectedSuggestion = new EventEmitter<string>();
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger | undefined;

  filteredSuggestions: Observable<string[]>;
  private searchControl = new FormControl('');

  constructor() {
    this.filteredSuggestions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value   => this.filterSuggestions(value))
    );
  }

  private filterSuggestions(value: string): string[] {
    const normalizedValue = value.toLowerCase();
    return this.suggestions.filter(suggestion => suggestion.toLowerCase().includes(normalizedValue));
  }

  onSuggestionSelected(suggestion: string) {
    this.selectedSuggestion.emit(suggestion);
    this.searchControl.setValue('');
  }
}
