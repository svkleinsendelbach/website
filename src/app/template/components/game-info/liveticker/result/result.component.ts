import { Component, Input } from '@angular/core';
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpOutline, faThumbsDown as faThumbsDownOutline, faFlag, faHeart } from '@fortawesome/free-regular-svg-icons';
import { BfvLiveticker } from 'src/app/template/classes/game-info';
import { DeviceTypeService } from 'src/app/template/services/device-type.service';
import { StyleConfigService } from 'src/app/template/services/style-config.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent {
  public thumbsUpSolid = faThumbsUpSolid;
  public thumbsUpOutline = faThumbsUpOutline;
  public thumbsDownOutline = faThumbsDownOutline;
  public reportFlag = faFlag;
  public heart = faHeart;

  @Input() result!: BfvLiveticker.Result;

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService,
    private httpClient: HttpClient
  ) {}

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

  public get iconSource(): string {
    switch (this.result.type) {
      case 'comment': return 'assets/images/liveticker/comment.png';
      case 'section': return '';
      case 'whistle': return 'assets/images/liveticker/whistle.png';
      case 'corner': return 'assets/images/liveticker/corner.png';
      case 'penalty': return 'assets/images/liveticker/penalty.png';
      case 'ownGoal': return 'assets/images/liveticker/goal.png';
      case 'time': return 'assets/images/liveticker/time.png';
      case 'specialAction': return 'assets/images/liveticker/specialAction.png';
      case 'freeKick': return 'assets/images/liveticker/freeKick.png';
      case 'shotOnGoal': return 'assets/images/liveticker/shotOnGoal.png';
      case 'goal': return 'assets/images/liveticker/goal.png';
      case 'penaltyGoal': return 'assets/images/liveticker/goal.png';
      case 'substitute': return 'assets/images/liveticker/substitute.png';
      case 'yellowCard': return 'assets/images/liveticker/yellowCard.png';
      case 'secondYellowCard': return 'assets/images/liveticker/secondYellowCard.png';
      case 'redCard': return 'assets/images/liveticker/redCard.png';
    }
  }

  public get iconTitle(): string {
    switch (this.result.type) {
      case 'comment': return 'Kommentar';
      case 'section': return '';
      case 'whistle': return 'Anpfiff / Abpfiff';
      case 'corner': return 'Eckball';
      case 'penalty': return 'Elfmeter';
      case 'ownGoal': return 'Eigentor';
      case 'time': return 'Zeitstrafe';
      case 'specialAction': return 'Highlight';
      case 'freeKick': return 'Freistoß';
      case 'shotOnGoal': return 'Torschuss';
      case 'goal': return 'Tor';
      case 'penaltyGoal': return 'Elfmetertor';
      case 'substitute': return 'Einwechslung';
      case 'yellowCard': return 'Gelbe Karte';
      case 'secondYellowCard': return 'Gelb-rote Karte';
      case 'redCard': return 'Rote Karte';
    }
  }
}
