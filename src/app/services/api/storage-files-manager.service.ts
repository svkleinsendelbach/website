import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StorageFilesManagerService {
  constructor(private storage: AngularFireStorage, private http: HttpClient) {}

  public async upload(
    file: Blob,
    fileName: string,
    onUpload?: (percentage: number | undefined) => void,
  ): Promise<string> {
    const ref = this.storage.ref(fileName);
    const task = ref.put(file);
    task.percentageChanges().forEach(onUpload ?? (_ => {}));
    await task.then();
    return await lastValueFrom(ref.getDownloadURL());
  }

  public async uploadString(value: string, fileName: string, onUpload?: (percentage: number | undefined) => void): Promise<string> {
    const ref = this.storage.ref(fileName);
    const task = ref.putString(value);
    task.percentageChanges().forEach(onUpload ?? (_ => { }));
    await task.then();
    return await lastValueFrom(ref.getDownloadURL());
  }

  public async getDownloadUrl(fileName: string): Promise<string> {
    const ref = this.storage.ref(fileName);
    return await lastValueFrom(ref.getDownloadURL());
  }

  public async download(url: string): Promise<string> {
    return await (await fetch(url)).text()
  }
}
