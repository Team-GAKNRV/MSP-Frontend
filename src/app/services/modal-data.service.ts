import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddClothingItem, GetClothingItem } from '../interfaces/clothing.interface';
import { CustomError } from '../interfaces/error.interface';
import { AddOutfit, GetOutfit } from '../interfaces/outfit.interface';

@Injectable({
    providedIn: 'root'
})
export class ModalDataService {
    private clothingSubject = new BehaviorSubject<GetClothingItem | AddClothingItem | null>(null);
    private outfitSubject = new BehaviorSubject<GetOutfit | AddOutfit | null>(null);
    private outfitToAddClothingItemSubject = new BehaviorSubject<AddOutfit | null>(null);
    private saveAsNewOutfitSubject = new BehaviorSubject<boolean>(false);
    private fileSubject = new BehaviorSubject<any>(null);
    private needsReloadSubject = new BehaviorSubject<boolean>(false);
    private errorSubject = new BehaviorSubject<CustomError | null>(null);
    private showLoadingScreenSubject = new BehaviorSubject<boolean>(false);

    clothing$ = this.clothingSubject.asObservable();
    outfit$ = this.outfitSubject.asObservable();
    outfitToAddClothingItem$ = this.outfitToAddClothingItemSubject.asObservable();
    saveAsNewOutfit$ = this.saveAsNewOutfitSubject.asObservable();
    file$ = this.fileSubject.asObservable();
    needsReload$ = this.needsReloadSubject.asObservable();
    error$ = this.errorSubject.asObservable();
    showLoadingScreen$ = this.showLoadingScreenSubject.asObservable();

    setClothingData(data: GetClothingItem | AddClothingItem) {
        this.clothingSubject.next(data);
    }

    setOutfitData(data: GetOutfit | AddOutfit) {
        this.outfitSubject.next(data);
    }

    setOutfitToAddClothingItem(data: AddOutfit) {
        this.outfitToAddClothingItemSubject.next(data);
    }

    setSaveAsNewOutfit(data: boolean) {
        this.saveAsNewOutfitSubject.next(data);
    }

    setFile(file: any) {
        this.fileSubject.next(file);
    }

    setNeedsReload(needsReload: boolean) {
        this.needsReloadSubject.next(needsReload);
    }

    setError(error: CustomError) {
        this.errorSubject.next(error);
    }

    setShowLoadingScreen(showLoadingScreen: boolean) {
        this.showLoadingScreenSubject.next(showLoadingScreen);
    }
}
