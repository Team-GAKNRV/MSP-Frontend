import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {clothingItem} from "../components/objects/clothingItem";

@Injectable({
  providedIn: 'root'
})

export class clothingItemService {
  private apiUrl = 'http://localhost:8080/api/v1/';
  private token = "";
  private httpOptions: any;

  constructor(private http: HttpClient) {
    this.token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJvRkJqaHhsdnZ1QkZ1ZEVSTlc1SENvNEM5RHd1WXp3X3Q1alRvUkh4aVpnIn0.eyJleHAiOjE3MTMzNDY2MjIsImlhdCI6MTcxMzM0NjMyMiwianRpIjoiZTY3ODY5YWEtZjNjYy00OTI0LWJlZWEtY2E2ZjNhOWFmMWQ0IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgxL3JlYWxtcy9tc3AiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNmVlNDllNjgtNjM5Zi00N2UzLWFlNmUtMDNjYjMwNTE1MzgyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibXNwIiwic2Vzc2lvbl9zdGF0ZSI6ImU5NmZmMDdlLWJhYmYtNDE4ZS05YTcyLTIwYzk0YTA1NGJmNyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbXNwIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiJlOTZmZjA3ZS1iYWJmLTQxOGUtOWE3Mi0yMGM5NGEwNTRiZjciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJ0ZXN0IHRlc3QiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0IiwiZ2l2ZW5fbmFtZSI6InRlc3QiLCJmYW1pbHlfbmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIn0.CfuXLjW5HIjYa8-PKooiNXS_uJcLeWcJO3XXecpGUDpZQj_P0-3AhN19sAmnL_FkDLq5X14L3DlZXqqVq9SCqkEJaV6SbY44Hlxk11aD65hGyZFj8tfZoX9BHhshKW4qWjvnmSlxnJ4-_9irv2SCexEAX0bdymrUnf3wBVVpJ5HwKUDlNXl_btbyNhDovmDAgprPKd2G2i6yTq5JQKghwRZGqT9FoyOAJBQ-m7G7onqZvBtbqRosDlxGIkMv_g8x_Ja_PDV68yeHQqasQXEwrHIM4tQAF2ggr7w8GqZ3XQjfcSqCYSrbTnWZGEbO8n-4dAq2aBPobE18t131eXydwA';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };

  }

  public addClothingItem(ct: clothingItem): void {
    this.http.post<any>(this.apiUrl + 'clothingItem', JSON.stringify(ct), this.httpOptions)
      .subscribe(
        response => {
          console.log('Response from server: ', response);
        },
        error => {
          console.error('There was an error during the request: ', error);
        }
      );

    console.log(JSON.stringify(ct).toString());
    // FÜr getClothingItem
    /*
    this.http.post<any>(this.apiUrl + 'clothingItem', this.httpOptions).subscribe(data => {

    console.log('Clothing Item: ', data);
    });
    */

  }




}

