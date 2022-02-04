import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { lastValueFrom } from 'rxjs';
import { DBPlayer, Datum } from '../../../../services/fetch-home-top.service';

@Component({
  selector: 'app-birthday-view',
  templateUrl: './birthday-view.component.html',
  styleUrls: ['./birthday-view.component.sass'],
})
export class BirthdayViewComponent implements OnInit, OnChanges {
  public Datum = Datum;

  @Input() player!: DBPlayer;

  @Input() playerImage?: string;

  image: string | ArrayBuffer | null = null;

  constructor(private storage: AngularFireStorage, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getImage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const previousImage: string | undefined = (changes as any).playerImage?.previousValue;
    const currentImage: string | undefined = (changes as any).playerImage?.currentValue;
    if (previousImage === undefined || currentImage === undefined) {
      return;
    }
    if (previousImage !== currentImage) {
      this.getImage();
    }
  }

  async getImageUrl(): Promise<string | null> {
    if (this.playerImage === null) {
      return null;
    }
    const ref = this.storage.ref(`images/${this.playerImage}`);
    return lastValueFrom(ref.getDownloadURL());
  }

  async getImage() {
    const url = await this.getImageUrl();
    if (url === null) {
      return;
    }
    const blob = await lastValueFrom(this.httpClient.get(url, { responseType: 'blob' }));
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.image = reader.result;
      },
      false,
    );
    if (blob) {
      reader.readAsDataURL(blob);
    }
  }
}
