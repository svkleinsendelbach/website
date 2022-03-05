import { Component, Input, OnInit } from '@angular/core';
import trainingTimesData from 'src/app/assets/training-times-data.json';
import { JsonDecodingError } from 'src/app/utils/jsonDecodingError';

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
export class TrainingTimeComponent implements OnInit {
  public trainingTime!: TrainingTime;

  @Input() pageId!: keyof typeof trainingTimesData.pages;

  constructor() { }

  ngOnInit(): void {
    this.getTrainingTime();
  }

  private getTrainingTime(): void {
    const pageData = trainingTimesData.pages[this.pageId];
    if (!trainingTimesData.locations.hasOwnProperty(pageData.map)) {
      throw new JsonDecodingError(`Couldn't get training time location for page: ${this.pageId}`);
    }
    this.trainingTime = {
      text: pageData.text,
      map: trainingTimesData.locations[pageData.map as keyof typeof trainingTimesData.locations],
    };
  }
}
