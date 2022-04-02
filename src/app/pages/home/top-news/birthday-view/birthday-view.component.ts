import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { lastValueFrom } from 'rxjs';
import { DBPlayer, Datum } from '../../../../services/api/fetch-home-top.service';
import { DeviceTypeService } from '../../../../services/device-type.service';

@Component({
  selector: 'app-birthday-view',
  templateUrl: './birthday-view.component.html',
  styleUrls: ['./birthday-view.component.sass'],
})
export class BirthdayViewComponent implements OnInit {
  public Datum = Datum;

  @Input() player!: DBPlayer;

  @Input() playerImage?: string;

  imageUrl?: string;

  constructor(private storage: AngularFireStorage, public deviceType: DeviceTypeService) {}

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
