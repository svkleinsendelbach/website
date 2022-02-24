import { Component, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { lastValueFrom } from 'rxjs';
import { DBPlayer, Datum } from '../../../../services/fetch-home-top.service';

@Component({
  selector: 'app-birthday-view',
  templateUrl: './birthday-view.component.html',
  styleUrls: ['./birthday-view.component.sass'],
})
export class BirthdayViewComponent {
  public Datum = Datum;

  @Input() player!: DBPlayer;

  @Input() playerImage?: string;

  imageUrl?: string;

  constructor(private storage: AngularFireStorage) {}

  ngOnInit(): void {
    this.getImageUrl();
  }

  async getImageUrl() {
    if (this.playerImage === null) {
      return;
    }
    const ref = this.storage.ref(`images/${this.playerImage}`);
    this.imageUrl = await lastValueFrom(ref.getDownloadURL());
  }
}
