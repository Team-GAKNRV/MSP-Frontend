import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {ComponentsModule} from "./components/components.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComponentsModule,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public router:Router){}
  title = 'MSP-Frontend';
}
