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
    this.token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJvRkJqaHhsdnZ1QkZ1ZEVSTlc1SENvNEM5RHd1WXp3X3Q1alRvUkh4aVpnIn0.eyJleHAiOjE3MTI4Mjc1OTksImlhdCI6MTcxMjgyNzI5OSwianRpIjoiYmRhODNhZGEtMzNiMC00MDUzLTlhNWItNWU1YjlmMjhkOWU2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgxL3JlYWxtcy9tc3AiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNmVlNDllNjgtNjM5Zi00N2UzLWFlNmUtMDNjYjMwNTE1MzgyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibXNwIiwic2Vzc2lvbl9zdGF0ZSI6ImE2NjA1MDY0LTNiODctNDdhYi1iZTI3LTVjOWJlYzU0NDk5MSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbXNwIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiJhNjYwNTA2NC0zYjg3LTQ3YWItYmUyNy01YzliZWM1NDQ5OTEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJ0ZXN0IHRlc3QiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0IiwiZ2l2ZW5fbmFtZSI6InRlc3QiLCJmYW1pbHlfbmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIn0.FeB6Lin_RNX8V-oRSfmwGUrMWiAY50eaVmdTsdRaYyEucWD9yMTaHMxZBdOO47i-yvn3Kngb7Etxf35Lxj-_3IoE3SRORWVgoUc7TzoV5WmKXn78_JYklrcvGIrQSZW1YUcJJlzEdqYbpnrpnlyJt2dwnydsgvw1Dp7vY9lZcuBiASGPsiTfGkbmqjQgnjdEZCtGAfujXFEu7wJkyO8WEkzVIa23uYg0mCmrxtGwrZ9rEN5CqL-MD3cShUoaxNyf9lcDVJt9MNCiBuzzj5387r4ceFTfRRwbVib8eT8W1AG3HG42TYsVNgGNx87Vmqd7qWOYAhI3GCdqEMx_Whg5eQ';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  public addClothingItem(ct: clothingItem): void {
    this.http.post<any>(this.apiUrl + 'clothingItem', JSON.stringify(ct), this.httpOptions);

    console.log(JSON.stringify(ct).toString());
    // FÜr getClothingItem
    /*
    this.http.post<any>(this.apiUrl + 'clothingItem', this.httpOptions).subscribe(data => {

    console.log('Clothing Item: ', data);
    });
    */

  }




}

