import { Component, ViewChild } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-closet',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf
  ],
  templateUrl: './closet.component.html',
  styleUrl: './closet.component.css'
})
export class ClosetComponent {
  @ViewChild(CardComponent) child: any;
  numberOfCards = Array.from({ length: 21 }, (_, i) => i + 1);
}
