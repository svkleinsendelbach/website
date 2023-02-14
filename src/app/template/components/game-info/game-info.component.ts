import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FetchState } from '../../classes/fetch-state';
import { FullDatum } from '../../classes/full-datum';
import { BfvLiveticker, GameInfo } from '../../classes/game-info';
import { ApiService } from '../../services/api.service';
import { DeviceTypeService } from '../../services/device-type.service';
import { StyleConfigService } from '../../services/style-config.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.sass']
})
export class GameInfoComponent implements OnInit {
  public FetchState = FetchState;

  @Input() public gameId!: string;

  @Output() public title = new EventEmitter<string>();

  public gameInfo: FetchState<GameInfo> = FetchState.loading;

  public selectedLivetickerId: string | undefined = undefined;

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    private readonly apiService: ApiService
  ) {}

  public ngOnInit() {
    this.fetchGameInfo();
  }

  private async fetchGameInfo() {
    const gameInfo = await this.apiService.getGameInfo({
      gameId: this.gameId
    }).catch((reason) => {
      this.gameInfo = FetchState.failure(reason);
      throw reason;
    });
    if (gameInfo.livetickers.length !== 0) {
      this.selectedLivetickerId = gameInfo.livetickers[0].id;
    }
    this.title.emit(`${gameInfo.homeTeam.name} gegen ${gameInfo.awayTeam.name}`);
    this.gameInfo = FetchState.success(gameInfo);
    for (const liveticker of FetchState.getContent(this.gameInfo).livetickers) {
      if (liveticker.loadNew) {
        setTimeout(() => {
          this.fetchGameInfo();
        }, 60000);
        return;
      }
    }
  }

  public get gameDateDescription(): string {
    if (!FetchState.isSuccess(this.gameInfo))
      return '';
    return FullDatum.description(FullDatum.fromDate(new Date(FetchState.getContent(this.gameInfo).date)));
  }

  public googleMapsLink(adress: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURI(adress)}&hl=de`;
  }

  public selectLivetickerId(event: Event) {
    this.selectedLivetickerId = (event.target as HTMLSelectElement).value;
  }

  public get selectedLiveticker(): BfvLiveticker | undefined {
    if (!FetchState.isSuccess(this.gameInfo) || this.selectedLivetickerId === undefined)
      return undefined;
    for (const liveticker of FetchState.getContent(this.gameInfo).livetickers) {
      if (liveticker.id === this.selectedLivetickerId)
        return liveticker;
    }
    return undefined;
  }
}
