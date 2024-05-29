import {Injectable} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {clothingItemObject} from "../objects/clothingItemObject";
import {outfitObject} from "../objects/outfitObject";

@Injectable({
  providedIn: 'root'
})
export class ClothingItemService {
  private apiUrl = 'http://localhost:8080/api/v1/';
  private token = "";
  private userID: string | undefined;
  private httpOptions: any;
  data: any[] = [];

  constructor(private keycloakService: KeycloakService,  private httpClient: HttpClient) {
    this.token = this.keycloakService.getToken()[Symbol.toStringTag];
    this.userID = this.keycloakService.getKeycloakInstance().tokenParsed?.sub;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }),
    };
  }

  public updateClothingItem(ct: clothingItemObject): void {
    this.httpClient
      .post<any>(this.apiUrl + 'clothingItem/' + `${this.apiUrl}?user-id=${this.userID}`, JSON.stringify(ct), this.httpOptions)
      .subscribe(
        (response: any) => {
          console.log('Response from server: ', response);
        },
        error => {
          console.error('There was an error during the request: ', error);
        }
      );
  }

  public updateOutfit(outfit: outfitObject): void {
    this.httpClient.post<any>(this.apiUrl + 'clothingItem/' + `${this.apiUrl}?user-id=${this.userID}`, JSON.stringify(outfit), this.httpOptions)
      .subscribe(
        (response: any) => {
          console.log('Response from server: ', response);
        },
        error => {
          console.error('There was an error during the request: ', error);
        }
      );
  }
}
