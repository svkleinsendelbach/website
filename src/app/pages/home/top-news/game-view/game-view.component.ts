import { Component, Input } from '@angular/core';
import { TeamSpieleSpiele } from 'src/app/services/fetch-home-top.service';
import { FullDatum, ResultParameters } from '../../../../services/fetch-home-top.service';
import { DeviceTypeService } from '../../../../services/device-type.service';

@Component({
  selector: 'app-top-news-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.sass'],
})
export class GameViewComponent {
  public FullDatum = FullDatum;

  @Input() nextLastGame!: 'next' | 'last';

  @Input() team!: 'firstTeam' | 'secondTeam';

  @Input() gameProperties!: TeamSpieleSpiele;

  constructor(public deviceType: DeviceTypeService) {}

  get firstLine(): string {
    const team = this.team === 'firstTeam' ? 'Erste Mannschaft' : 'Zweite Mannschaft';
    const nextLastGame = this.nextLastGame === 'next' ? 'Nächstes Spiel' : 'Letztes Spiel';
    const homeAway = this.gameProperties.homeAway !== 'A' ? 'Daheim' : 'Auswärts';
    return `${team} | ${nextLastGame} | ${homeAway}`;
  }

  get result(): string | null {
    if (this.gameProperties.result === undefined) {
      return null;
    }
    const result =
      this.gameProperties.result.homeTeam === this.gameProperties.result.awayTeam
        ? 'Unentschieden'
        : this.gameProperties.result.homeTeam > this.gameProperties.result.awayTeam &&
          this.gameProperties.homeAway !== 'A'
        ? 'Sieg'
        : 'Niederlage';
    return `${this.gameProperties.result.homeTeam}:${this.gameProperties.result.awayTeam} | ${result}`;
  }

  resultUrl(resultParameters: ResultParameters): string {
    return `http://www.anpfiff.info/sites/fb/spielbericht.aspx?SK=${resultParameters.spielkreis}&Lg=${resultParameters.liga}&Sp=${resultParameters.spiel}&Ver=${resultParameters.verein}&TmHm=${resultParameters.teamHeim}&TmGt=${resultParameters.teamAway}&Top=${resultParameters.top}&Ticker=${resultParameters.ticker}&Men=${resultParameters.men}`;
  }
}
