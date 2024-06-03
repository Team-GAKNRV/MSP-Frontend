import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-clothing-item-card',
  standalone: true,
  imports: [],
  templateUrl: './clothing-item-card.component.html',
  styleUrl: './clothing-item-card.component.css'
})
export class ClothingItemCardComponent {
  @Input() data: any;
  @Output() itemClicked = new EventEmitter<any>();

  onClick(): void {
    this.itemClicked.emit(this.data);
  }
}
