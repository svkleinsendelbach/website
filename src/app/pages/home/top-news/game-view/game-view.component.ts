import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { TeamSpieleSpiele } from 'src/app/services/fetch-home-top.service';
import { FullDatum, ResultParameters } from '../../../../services/fetch-home-top.service';

@Component({
  selector: 'app-top-news-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.sass'],
})
export class GameViewComponent implements OnInit, OnChanges {
  public FullDatum = FullDatum;

  @Input() nextLastGame!: 'next' | 'last';

  @Input() team!: 'firstTeam' | 'secondTeam';

  @Input() gameProperties!: TeamSpieleSpiele;

  logo: string | ArrayBuffer | null = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getLogo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const previousLogoId: number | undefined = (changes as any).gameProperties?.previousValue?.logoId;
    const currentLogoId: number | undefined = (changes as any).gameProperties?.currentValue?.logoId;
    if (previousLogoId === undefined || currentLogoId === undefined) {
      return;
    }
    if (previousLogoId !== currentLogoId) {
      this.getLogo();
    }
  }

  async getLogo() {
    if (this.gameProperties.logoId === undefined) {
      return;
    }
    const url = `http://www.anpfiff.info/upload/images/Emblem4/${this.gameProperties.logoId}.png`;
    if (url === null) {
      return;
    }
    const blob = await lastValueFrom(this.httpClient.get(url, { responseType: 'blob' }));
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.logo = reader.result;
      },
      false,
    );
    if (blob) {
      reader.readAsDataURL(blob);
    }
  }

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
