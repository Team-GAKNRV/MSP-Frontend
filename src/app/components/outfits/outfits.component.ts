import { Component, ViewChild } from '@angular/core';
import { NgForOf } from "@angular/common";
import { OutfitCardComponent } from "../outfit-card/outfit-card.component";
import { KeycloakService } from "keycloak-angular";

@Component({
  selector: 'app-outfits',
  standalone: true,
  imports: [
    NgForOf,
    OutfitCardComponent
  ],
  templateUrl: './outfits.component.html',
  styleUrl: './outfits.component.css'
})
export class OutfitsComponent {

  @ViewChild(OutfitCardComponent) child: any;
  totalOutfits = [];

  constructor(private keycloakService: KeycloakService) {}

  async getAllOutfits(): Promise<void>{
    const apiUrl = `http://localhost:8080/api/v1/user/outfits?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await this.keycloakService.getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if(response.ok){
      this.totalOutfits = await response.json();
    }else{
      console.error(response.status);
    }
  }

  ngOnInit(): void {
    this.getAllOutfits();
  }

}
