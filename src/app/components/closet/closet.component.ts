import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForOf } from '@angular/common';
import { KeycloakService } from "keycloak-angular";
import { ClothingItemCardComponent } from "../clothing-item-card/clothing-item-card.component";

@Component({
  selector: 'app-closet',
  standalone: true,
  imports: [
    NgForOf,
    ClothingItemCardComponent
  ],
  templateUrl: './closet.component.html',
  styleUrl: './closet.component.css'
})
export class ClosetComponent implements OnInit{

  @ViewChild(ClothingItemCardComponent) child: any;
  numberOfCards = [];

  constructor(private keycloakService: KeycloakService) {}

  async getAllClothingItems(): Promise<void>{
    const apiUrl = `http://localhost:8080/api/v1/user/clothing-items?user-id=${this.keycloakService.getKeycloakInstance().tokenParsed?.sub}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await this.keycloakService.getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if(response.ok){
      this.numberOfCards = await response.json();
    }else{
      console.error(response.status);
    }
  }
  

  ngOnInit(): void {
    this.getAllClothingItems();
  }

}
