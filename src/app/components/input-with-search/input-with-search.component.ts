import { Component, Input } from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-input-with-search',
  templateUrl: './input-with-search.component.html',
  styleUrl: './input-with-search.component.css'
})
export class InputWithSearchComponent {
  @Input() placeholder: string = "Default Placeholder";
  @Input() searchTerm: string = "";

  /*filterSuggestion() {
      this.filteredSuggestions = this.color.filter(suggestion =>
        suggestion.toLowerCase().includes(this.searchTerm.toLowerCase())
      );

    }*/

}
