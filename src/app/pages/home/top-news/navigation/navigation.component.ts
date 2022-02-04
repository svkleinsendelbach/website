import { Component, Input } from '@angular/core';
import { DBPlayer, TeamSpieleSpiele } from 'src/app/services/fetch-home-top.service';

export type NavigationItem = NavigationItem.Birthday | NavigationItem.Game;

export namespace NavigationItem {
  export interface Birthday {
    type: 'birthday';
    player: DBPlayer;
    playerImage?: string;
  }

  export interface Game {
    type: 'game';
    nextLastGame: 'next' | 'last';
    team: 'firstTeam' | 'secondTeam';
    gameProperties: TeamSpieleSpiele;
  }
}

@Component({
  selector: 'app-top-news-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass'],
})
export class NavigationComponent {
  @Input() itemList!: NavigationItem[];

  currentPage = 1;

  constructor() {}

  get currentItem(): NavigationItem {
    return this.itemList[this.currentPage - 1];
  }

  handleButtonClick(direction: 'left' | 'right') {
    if (direction === 'left') {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      } else {
        this.currentPage = this.itemList.length;
      }
    } else if (direction === 'right') {
      if (this.currentPage < this.itemList.length) {
        this.currentPage += 1;
      } else {
        this.currentPage = 1;
      }
    }
  }
}
