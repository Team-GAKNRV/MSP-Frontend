import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorWrapperComponent } from "./components/error-wrapper/error-wrapper.component";
import { NavbarComponent } from './components/navbar/navbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NavbarComponent, RouterOutlet, FontAwesomeModule, ErrorWrapperComponent]
})
export class AppComponent {
  title: string = 'VCloset';
}
