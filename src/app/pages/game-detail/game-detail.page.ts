import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { InternalLink } from 'src/app/types/internal-path';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'pages-game-detail',
    templateUrl: './game-detail.page.html',
    styleUrls: ['./game-detail.page.sass']
})
export class GameDetailPage {
    public gameId: string | null;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {
        this.titleService.setTitle('Spiel wird geladen');
        this.gameId = this.route.snapshot.paramMap.get('id');
        if (this.gameId === null)
            void this.router.navigateByUrl(InternalLink.all.home.link);
    }

    public titleChanged(title: string) {
        this.titleService.setTitle(title);
    }
}
