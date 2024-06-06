import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-outfit-card',
  standalone: true,
  imports: [],
  templateUrl: './add-outfit-card.component.html',
  styleUrl: './add-outfit-card.component.css'
})
export class AddOutfitCardComponent {
  @Output() itemClicked = new EventEmitter<any>();

  onClick(): void {
    this.itemClicked.emit();
  }
}
