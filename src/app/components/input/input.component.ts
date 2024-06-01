import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { SearchOption } from '../../types/search-option.type';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() searchOptions: SearchOption = null;
  @Input() inputValue: string = '';

  searchOptionValues: string[] = [];
  searchResults: string[] = [];
  showResults = false;
  focused = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    if (this.searchOptions !== null) {
      this.searchOptionValues = Object.values(this.searchOptions).filter(value => typeof value === 'string') as string[];
    }
  }

  onSearch(query: string) {
    this.inputValue = query;
    this.updateSearchResults();
  }

  onFocus() {
    this.focused = true;
    this.updateSearchResults();
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.focused) {
        this.showResults = false;
      }
    }, 200);
  }

  onSelect(option: string) {
    this.inputValue = option;
    this.showResults = false;
    this.focused = false;
  }

  updateSearchResults() {
    if (this.searchOptions !== null && (this.inputValue || this.focused)) {
      this.searchResults = this.searchOptionValues
        .filter(option => option.toLowerCase().includes(this.inputValue.toLowerCase()))
        .slice(0, 5);
      this.showResults = true;
    } else {
      this.searchResults = [];
      this.showResults = false;
    }
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.focused = false;
      this.showResults = false;
    }
  }
}
