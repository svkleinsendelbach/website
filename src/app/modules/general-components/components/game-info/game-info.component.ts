import { BfvLiveticker, GameInfo } from 'src/app/modules/firebase-api/types/game-info';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceTypeService } from '../../../../services/device-type.service';
import { FetchState } from 'src/app/types/fetch-state';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { StyleConfigService } from '../../../../services/style-config.service';
import { UtcDate } from 'src/app/types/utc-date';

@Component({
    selector: 'game-info',
    styleUrls: ['./game-info.component.sass'],
    templateUrl: './game-info.component.html'
})
export class GameInfoComponent implements OnInit {
    @Input() public gameId!: string;

    @Output() public title = new EventEmitter<string>();

    public UtcDate = UtcDate;

    public fetchedGameInfo: FetchState<GameInfo> = FetchState.loading;

    public selectedLivetickerId: string | null = null;

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService
    ) {}

    public get selectedLiveticker(): BfvLiveticker | null {
        if (!this.fetchedGameInfo.isSuccess() || this.selectedLivetickerId === null)
            return null;
        for (const liveticker of this.fetchedGameInfo.content.livetickers) {
            if (liveticker.id === this.selectedLivetickerId)
                return liveticker;
        }
        return null;
    }

    public ngOnInit() {
        void this.fetchGameInfo();
    }

    public googleMapsLink(adress: string): string {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURI(adress)}&hl=de`;
    }

    public selectLivetickerId(event: Event) {
        this.selectedLivetickerId = (event.target as HTMLSelectElement).value;
    }

    private async fetchGameInfo() {
        const gameInfo = await this.firebaseApiService.function('bfvData').function('gameInfo')
            .call({
                gameId: this.gameId
            })
            .catch(reason => {
                this.fetchedGameInfo = FetchState.failure(reason);
                throw reason;
            });
        if (gameInfo.livetickers.length !== 0)
            this.selectedLivetickerId = gameInfo.livetickers[0].id;
        this.title.emit(`${gameInfo.homeTeam.name} gegen ${gameInfo.awayTeam.name}`);
        this.fetchedGameInfo = FetchState.success(gameInfo);
        for (const liveticker of gameInfo.livetickers) {
            if (liveticker.loadNew) {
                setTimeout(() => {
                    void this.fetchGameInfo();
                }, 60000);
                return;
            }
        }
    }
}
