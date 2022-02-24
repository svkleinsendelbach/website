import { Component, Input } from '@angular/core';
import trainingTimesData from 'src/app/assets/training-times-data.json';

interface TrainingTime {
  text: string;
  map: {
    zoom: number;
    center: google.maps.LatLngLiteral | google.maps.LatLng;
    options: google.maps.MapOptions;
    marker: (google.maps.LatLngLiteral | google.maps.LatLng)[];
  };
}

@Component({
  selector: 'app-component-training-time',
  templateUrl: './training-time.component.html',
  styleUrls: ['./training-time.component.sass'],
})
export class TrainingTimeComponent {
  @Input() pageId!: keyof typeof trainingTimesData.pages;

  constructor() {}

  public get trainingTime(): TrainingTime {
    return trainingTimesData.pages[this.pageId];
  }
}
