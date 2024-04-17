import { Component, Input } from '@angular/core';
import { color } from '../../enums/color';

@Component({
  selector: 'app-input-with-search',
  templateUrl: './input-with-search.component.html',
  styleUrl: './input-with-search.component.css'
})
export class InputWithSearchComponent {
  @Input() placeholder: string = "Default Placeholder";
  @Input() searchTerm: string = "";
  filteredSuggestions: string[] = [];
  color: color[] = Object.values(color.Beige);

  putEnumValuesInArray() {
    console.log(color[1]);
  }

  filterSuggestion() {
      this.filteredSuggestions = this.color.filter(suggestion =>
        suggestion.toLowerCase().includes(this.searchTerm.toLowerCase())
      );

    }

}
