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

    addClothingItem(userId: string, clothingItem: ClothingItem): Observable<any> {
        const headers = new HttpHeaders();

        headers.append('Content-Type', 'multipart/form-data');

        return this.http.post(`${environment.JAVA_BACKEND_API_URI}/${environment.JAVA_BACKEND_API_ADD_CLOTHING_ITEM_ENDPOINT}?user-id=${userId}`, clothingItem, { headers }).pipe(
            catchError(this.handleError)
        );
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
