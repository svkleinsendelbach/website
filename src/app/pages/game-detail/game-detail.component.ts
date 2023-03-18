import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { InternalLink } from 'src/app/types/InternalPath';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';

@Component({
    selector: 'app-game-detail',
    templateUrl: './game-detail.component.html',
    styleUrls: ['./game-detail.component.sass']
})
export class GameDetailComponent {
    public gameId: string | null;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.titleService.setTitle('Spiel wird geladen');
        this.gameId = this.route.snapshot.paramMap.get('id');
        if (this.gameId === null)
            this.router.navigateByUrl(InternalLink.all['home'].link);
    }

    public titleChanged(title: string) {
        this.titleService.setTitle(title);
    }
}
