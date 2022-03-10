import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import trainingTimesData from 'src/app/assets/training-times-data.json';
import { JsonDecodingError } from 'src/app/utils/jsonDecodingError';
import { mapStyleDarkAppearence } from 'src/app/utils/mapStyleDarkAppearence';
import { DarkModeService } from '../../services/dark-mode.service';

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
export class TrainingTimeComponent implements OnInit, OnDestroy {
  public trainingTime!: TrainingTime;

  public mapOptions!: google.maps.MapOptions;

  @Input() pageId!: keyof typeof trainingTimesData.pages;

  constructor(private darkMode: DarkModeService) {}

  ngOnInit(): void {
    this.getTrainingTime();
    this.mapOptions = {
      ...this.trainingTime.map.options,
      styles: this.darkMode.isDarkMode ? mapStyleDarkAppearence : null,
    };
    this.darkMode.addListener('training.time-map', isDarkMode => {
      this.mapOptions = {
        ...this.mapOptions,
        styles: isDarkMode ? mapStyleDarkAppearence : null,
      };
    });
  }

  ngOnDestroy(): void {
    this.darkMode.removeListener('training.time-map');
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
