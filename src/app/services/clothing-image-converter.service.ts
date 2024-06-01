import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ClothingImageConverter {
    convertDataURIToBinary(dataURI?: string): Uint8Array {
        if (dataURI != null) {
            const base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
            const base64 = dataURI.substring(base64Index);
            const raw = window.atob(base64);

            const rawLength = raw.length;
            const array = new Uint8Array(new ArrayBuffer(rawLength));
            for (let i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
            }
            return array;
        } else {
            throw new Error('Data URI is null or undefined.');
        }
    }

    public upload(image: File): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                try {
                    const byteArray = this.convertDataURIToBinary(
                        reader.result as string
                    );
                    resolve(byteArray);
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = (error) => {
                reject(error);
            };

            if (image) {
                reader.readAsDataURL(image);
            } else {
                reject(new Error('No image file provided.'));
            }
        });
    }
}
