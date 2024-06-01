import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FileUploadService {
    private file: File | undefined;

    setFile(file: File) {
        this.file = file;
    }

    getFile(): File | undefined {
        return this.file;
    }
}
