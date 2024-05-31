import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SearchOption } from '../../types/search-option.type';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() searchOptions: SearchOption = null;

  searchOptionValues: string[] = [];

  ngOnInit() {
    if (this.searchOptions !== null) {
      this.searchOptionValues = Object.values(this.searchOptions).filter(value => typeof value === 'string') as string[];
    }
  }

  inputValue: string = '';
  searchResults: string[] = [];
  showResults = false;

  onSearch(query: string) {
    this.inputValue = query;
    if (query) {
      this.searchResults = this.searchOptionValues
        .filter(option => option.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      this.showResults = true;
    } else {
      this.searchResults = [];
      this.showResults = false;
    }
  }

  onSelect(option: string) {
    this.inputValue = option;
    this.showResults = false;
  }
}
