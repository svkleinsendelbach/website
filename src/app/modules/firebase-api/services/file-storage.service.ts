import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileStorageService {
    public constructor(
        private readonly storage: AngularFireStorage
    ) {}

    public async upload(file: Blob | string, filename: string, onUpload?: (percentage: number | undefined) => void): Promise<string> {
        const ref = this.storage.ref(filename);
        const task = typeof file === 'string' ? ref.putString(file) : ref.put(file);
        void task.percentageChanges().forEach(percentage => onUpload?.(percentage));
        await task.then();
        return lastValueFrom(ref.getDownloadURL() as Observable<string>);
    }

    public async downloadFile(filename: string): Promise<string> {
        const url = await this.getDownloadUrl(filename);
        return this.download(url);
    }

    public async download(url: string): Promise<string> {
        return (await fetch(url)).text();
    }

    private async getDownloadUrl(filename: string): Promise<string> {
        const ref = this.storage.ref(filename);
        return lastValueFrom(ref.getDownloadURL() as Observable<string>);
    }
}
