import { Component, HostListener } from '@angular/core';
import { FetchHomeTopService, HomeTopProperties } from '../../../services/api/fetch-home-top.service';
import { NavigationItem } from './navigation/navigation.component';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.sass'],
})
export class TopNewsComponent {
  properties: HomeTopProperties | null = null;

  bannerHeight: number;

  contentHeight: number;

  private bannerImageResolution = [2400, 965];

  constructor(private fetcher: FetchHomeTopService) {
    this.bannerHeight = this.calculatedBannerHeight;
    this.contentHeight = this.bannerHeight;
    this.fetcher
      .fetch()
      .then(p => {
        this.properties = p;
      });
  }

  @HostListener('window:resize')
  onResize() {
    this.bannerHeight = this.calculatedBannerHeight;
    this.contentHeight = this.bannerHeight;
  }

  get calculatedBannerHeight(): number {
    const screenWidth = window.innerWidth;
    const calcBannerHeight = (screenWidth * this.bannerImageResolution[1]) / this.bannerImageResolution[0];
    return Math.max(calcBannerHeight, 475);
  }

  get navigationItemist(): NavigationItem[] {
    if (this.properties === null) {
      return [];
    }
    const itemList: NavigationItem[] = [];
    if (this.properties[1].next !== null) {
      itemList.push({
        type: 'game',
        gameProperties: this.properties[1].next,
        nextLastGame: 'next',
        team: 'firstTeam',
      });
    }
    if (this.properties[2].next !== null) {
        itemList.push({
            type: 'game',
            gameProperties: this.properties[2].next,
            nextLastGame: 'next',
            team: 'secondTeam',
        });
    }
    for (const a of this.properties[0]) {
      itemList.push({
        type: 'birthday',
        player: a.player,
        playerImage: a.image,
      });
    }
    if (this.properties[1].last !== null) {
        itemList.push({
            type: 'game',
            gameProperties: this.properties[1].last,
            nextLastGame: 'last',
            team: 'firstTeam',
        });
    }
    if (this.properties[2].last !== null) {
        itemList.push({
            type: 'game',
            gameProperties: this.properties[2].last,
            nextLastGame: 'last',
            team: 'secondTeam',
        });
    }
    return itemList;
  }
}
