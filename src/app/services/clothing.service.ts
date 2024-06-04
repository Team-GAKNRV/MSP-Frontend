import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ClothingItem } from '../classes/clothing-item.class';
import { ClassifiedClothingItem } from '../types/classified-clothing-item.type';

@Injectable({
    providedIn: 'root',
})
export class ClothingService {
    private classificationInformation: ClassifiedClothingItem | undefined;

    constructor(private http: HttpClient) { }

    setClassificationInformation(classificationInformation: ClassifiedClothingItem | undefined) {
        this.classificationInformation = classificationInformation;
    }

    getClassificationInformation(): ClassifiedClothingItem | undefined {
        return this.classificationInformation;
    }

    classifyImage(imageFile: File): Observable<any> {
        const headers = new HttpHeaders();
        const formData = new FormData();

        formData.append('input_image', imageFile);

        return this.http.post(`${environment.ML_BACKEND_API_URI}/${environment.ML_BACKEND_API_CLASSIFICATION_ENDPOINT}`, formData, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    createStaticClothingInformation(clothingItem: ClothingItem): ClothingItem {
        if (clothingItem.brand == "" && clothingItem.name == "") {
            clothingItem.name = `${clothingItem.color} ${this.makeStringSingularAndRemoveUnderscores(clothingItem.type)}`;
        }

        if (clothingItem.brand == "") {
            clothingItem.brand = "Unknown";
        }

        if (clothingItem.name == "") {
            `${clothingItem.color} ${this.makeStringSingularAndRemoveUnderscores(clothingItem.type)}`;
        }

        return clothingItem;
    }

    async addClothingItem(userId: string, bearerToken: string, clothingItem: ClothingItem): Promise<Response> {
        const headers = new HttpHeaders();

        headers.append('Content-Type', 'multipart/form-data');

        return await fetch(`${environment.JAVA_BACKEND_API_URI}/${environment.JAVA_BACKEND_API_ADD_CLOTHING_ITEM_ENDPOINT}?user-id=${userId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clothingItem)
        });
    }

    async updateClothingItem(bearerToken: string, clothingItemId: string, clothingItem: ClothingItem): Promise<Response> {
        const headers = new HttpHeaders();

        headers.append('Content-Type', 'multipart/form-data');

        return await fetch(`${environment.JAVA_BACKEND_API_URI}/${environment.JAVA_BACKEND_API_ADD_CLOTHING_ITEM_ENDPOINT}?clothing-item-id=${clothingItemId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clothingItem)
        });
    }

    private makeStringSingularAndRemoveUnderscores(str: string): string {
        if (str.endsWith('s')) {
            return str.slice(0, -1).replaceAll('_', ' ');
        }

        return str.replaceAll('_', ' ');
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';

        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        return throwError(() => errorMessage);
    }
}
