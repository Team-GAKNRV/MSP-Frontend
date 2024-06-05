import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddClothingItem, GetClothingItem } from '../interfaces/clothing.interface';
import { AddOutfit, GetOutfit } from '../interfaces/outfit.interface';

@Injectable({
    providedIn: 'root'
})
export class ModalDataService {
    private clothingSubject = new BehaviorSubject<GetClothingItem | AddClothingItem | null>(null);
    private outfitSubject = new BehaviorSubject<GetOutfit | AddOutfit | null>(null);
    private fileSubject = new BehaviorSubject<any>(null);
    private needsReloadSubject = new BehaviorSubject<boolean>(false);

    clothing$ = this.clothingSubject.asObservable();
    outfit$ = this.outfitSubject.asObservable();
    file$ = this.fileSubject.asObservable();
    needsReload$ = this.needsReloadSubject.asObservable();

    setClothingData(data: GetClothingItem | AddClothingItem) {
        this.clothingSubject.next(data);
    }

    setOutfitData(data: GetOutfit | AddOutfit) {
        this.outfitSubject.next(data);
    }

    setFile(file: any) {
        this.fileSubject.next(file);
    }

    setNeedsReload(needsReload: boolean) {
        this.needsReloadSubject.next(needsReload);
    }
}
