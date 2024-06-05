import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AddOutfit } from '../interfaces/outfit.interface';

@Injectable({
    providedIn: 'root',
})
export class OutfitService {
    async getAllOutfits(bearerToken: string, userId: string): Promise<Response> {
        return await fetch(`${environment.JAVA_BACKEND_API_URI}/${environment.JAVA_BACKEND_API_GET_ALL_OUTFITS_ENDPOINT}?user-id=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async addOutfit(bearerToken: string, userId: string, outfit: AddOutfit): Promise<Response> {
        return await fetch(`${environment.JAVA_BACKEND_API_URI}/${environment.JAVA_BACKEND_API_ADD_OUTFIT_ENDPOINT}?user-id=${userId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(outfit)
        });
    }

    async updateOutfit(bearerToken: string, outfitId: string, outfit: AddOutfit): Promise<Response> {
        return await fetch(`${environment.JAVA_BACKEND_API_URI}/${environment.JAVA_BACKEND_API_UPDATE_OUTFIT_ENDPOINT}?outfit-item-id=${outfitId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(outfit)
        });
    }
}
