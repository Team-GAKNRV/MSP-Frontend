import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalDataService {
    private dataSubject = new BehaviorSubject<any>(null);
    private fileSubject = new BehaviorSubject<any>(null);
    private needsReloadSubject = new BehaviorSubject<boolean>(false);

    data$ = this.dataSubject.asObservable();
    file$ = this.fileSubject.asObservable();
    needsReload$ = this.needsReloadSubject.asObservable();

    setData(data: any) {
        this.dataSubject.next(data);
    }

    setFile(file: any) {
        this.fileSubject.next(file);
    }

    setNeedsReload(needsReload: boolean) {
        this.needsReloadSubject.next(needsReload);
    }
}
