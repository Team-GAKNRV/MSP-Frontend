import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-with-search',
  templateUrl: './input-with-search.component.html',
  styleUrl: './input-with-search.component.css'
})
export class InputWithSearchComponent {
  @Input() placeholder: string = "Default Placeholder";
  @Input() searchTerm: string = "";
}
