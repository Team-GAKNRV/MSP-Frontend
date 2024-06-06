import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ClothingImageConverterService {
    BASE64_DATA_URL_SUBSTRING = 'data:image/png;base64,';

    arrayBufferToBase64(buffer: ArrayBuffer): string {
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;

        let binary = '';

        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return window.btoa(binary);
    }

    base64ToImage(base64String: string): string {
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });

        return URL.createObjectURL(blob);
    }

    stripDataUrlPrefix(base64String: string): string {
        const dataUrlPattern = /^data:image\/(png|jpeg|jpg|webp);base64,/;

        return base64String.replace(dataUrlPattern, '');
    }

    addDataUrlPrefix(base64String: string): string {
        return this.BASE64_DATA_URL_SUBSTRING + base64String;
    }
}
