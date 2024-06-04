import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalDataService {
    private dataSubject = new BehaviorSubject<any>(null);
    private fileSubject = new BehaviorSubject<any>(null);
    data$ = this.dataSubject.asObservable();
    file$ = this.fileSubject.asObservable();

    setData(data: any) {
        this.dataSubject.next(data);
    }

    setFile(file: any) {
        this.fileSubject.next(file);
    }
}
