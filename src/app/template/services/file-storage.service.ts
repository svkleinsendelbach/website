import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
  constructor(
    private readonly storage: AngularFireStorage,
    private http: HttpClient
  ) {}

  public async upload(file: Blob | string, filename: string, onUpload?: (percentage: number | undefined) => void): Promise<string> {
    const ref = this.storage.ref(filename);
    const task = typeof file === 'string' ? ref.putString(file) : ref.put(file);
    task.percentageChanges().forEach(percentage => onUpload?.(percentage));
    await task.then();
    return await lastValueFrom(ref.getDownloadURL());
  }

  private async getDownloadUrl(filename: string): Promise<string> {
    const ref = this.storage.ref(filename);
    return await lastValueFrom(ref.getDownloadURL());
  }

  public async downloadFile(filename: string): Promise<string> {
    const url = await this.getDownloadUrl(filename);
    return await this.download(url);
  }

  public async download(url: string): Promise<string> {
    return await (await fetch(url)).text();
  }
}
