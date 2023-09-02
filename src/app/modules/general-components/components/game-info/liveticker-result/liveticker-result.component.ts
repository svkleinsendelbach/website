import { Component, Input } from '@angular/core';
import { faFlag, faHeart, faThumbsDown as faThumbsDownOutline, faThumbsUp as faThumbsUpOutline } from '@fortawesome/free-regular-svg-icons';
import { BfvLiveticker } from 'src/app/modules/firebase-api/types/game-info';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { HttpClient } from '@angular/common/http';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'liveticker-result',
    styleUrls: ['./liveticker-result.component.sass'],
    templateUrl: './liveticker-result.component.html'
})
export class LivetickerResultComponent {
    @Input() public result!: BfvLiveticker.Result;

    public thumbsUpSolid = faThumbsUpSolid;

    public thumbsUpOutline = faThumbsUpOutline;

    public thumbsDownOutline = faThumbsDownOutline;

    public reportFlag = faFlag;

    public heart = faHeart;

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly httpClient: HttpClient
    ) {}

    public get iconSource(): string {
        switch (this.result.type) {
        case 'comment':
            return 'assets/images/liveticker/comment.png';
        case 'section':
            return '';
        case 'whistle':
            return 'assets/images/liveticker/whistle.png';
        case 'corner':
            return 'assets/images/liveticker/corner.png';
        case 'penalty':
            return 'assets/images/liveticker/penalty.png';
        case 'ownGoal':
            return 'assets/images/liveticker/goal.png';
        case 'time':
            return 'assets/images/liveticker/time.png';
        case 'specialAction':
            return 'assets/images/liveticker/specialAction.png';
        case 'freeKick':
            return 'assets/images/liveticker/freeKick.png';
        case 'shotOnGoal':
            return 'assets/images/liveticker/shotOnGoal.png';
        case 'goal':
            return 'assets/images/liveticker/goal.png';
        case 'penaltyGoal':
            return 'assets/images/liveticker/goal.png';
        case 'substitute':
            return 'assets/images/liveticker/substitute.png';
        case 'yellowCard':
            return 'assets/images/liveticker/yellowCard.png';
        case 'secondYellowCard':
            return 'assets/images/liveticker/secondYellowCard.png';
        case 'redCard':
            return 'assets/images/liveticker/redCard.png';
        default:
            return '';
        }
    }

    public get iconTitle(): string {
        switch (this.result.type) {
        case 'comment':
            return 'Kommentar';
        case 'section':
            return '';
        case 'whistle':
            return 'Anpfiff / Abpfiff';
        case 'corner':
            return 'Eckball';
        case 'penalty':
            return 'Elfmeter';
        case 'ownGoal':
            return 'Eigentor';
        case 'time':
            return 'Zeitstrafe';
        case 'specialAction':
            return 'Highlight';
        case 'freeKick':
            return 'Freistoß';
        case 'shotOnGoal':
            return 'Torschuss';
        case 'goal':
            return 'Tor';
        case 'penaltyGoal':
            return 'Elfmetertor';
        case 'substitute':
            return 'Einwechslung';
        case 'yellowCard':
            return 'Gelbe Karte';
        case 'secondYellowCard':
            return 'Gelb-rote Karte';
        case 'redCard':
            return 'Rote Karte';
        default:
            return '';
        }
    }

    public async likeResult() {
        if (this.result.type === 'section' || this.result.resultLikes.liked)
            return;
        await lastValueFrom(this.httpClient.get(this.result.resultLikes.likeApiRoute));
        this.result.resultLikes.likes += 1;
    }

    public unlikeResult() {
        if (this.result.type === 'section')
            return;
        this.httpClient.get(this.result.resultLikes.unlikeApiRoute);
    }

    public reportResult() {
        if (this.result.type === 'section' || this.result.reportLink === null)
            return;
        this.httpClient.get(this.result.reportLink);
    }
}
