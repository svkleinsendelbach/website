import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { GameInfo, BfvLiveticker } from 'src/app/modules/firebase-api/types/game-info';
import { FetchState } from 'src/app/types/fetch-state';
import { Datum } from 'src/app/types/datum';
import { DeviceTypeService } from '../../../../services/device-type.service';
import { StyleConfigService } from '../../../../services/style-config.service';

@Component({
    selector: 'game-info',
    templateUrl: './game-info.component.html',
    styleUrls: ['./game-info.component.sass']
})
export class GameInfoComponent implements OnInit {
    public Datum = Datum;

    @Input() public gameId!: string;

    @Output() public title = new EventEmitter<string>();

    public fetchedGameInfo: FetchState<GameInfo> = FetchState.loading;

    public selectedLivetickerId: string | undefined = undefined;

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService,
    ) {}

    public ngOnInit() {
        this.fetchGameInfo();
    }

    private async fetchGameInfo() {
        const gameInfo = await this.firebaseApiService.function('bfvData').function('gameInfo').call({
            gameId: this.gameId
        }).catch((reason) => {
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
                    this.fetchGameInfo();
                }, 60000);
                return;
            }
        }
    }

    public googleMapsLink(adress: string): string {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURI(adress)}&hl=de`;
    }

    public selectLivetickerId(event: Event) {
        this.selectedLivetickerId = (event.target as HTMLSelectElement).value;
    }

    public get selectedLiveticker(): BfvLiveticker | undefined {
        if (!this.fetchedGameInfo.isSuccess() || this.selectedLivetickerId === undefined)
            return undefined;
        for (const liveticker of this.fetchedGameInfo.content.livetickers) {
            if (liveticker.id === this.selectedLivetickerId)
                return liveticker;
        }
        return undefined;
    }
}
