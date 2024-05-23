import { Component } from '@angular/core';
import { AppCardComponent } from '../app-card/app-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [AppCardComponent],
})
export class HomeComponent {}
