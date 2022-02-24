import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import gameResultsData from 'src/app/assets/game-results-data.json';

@Component({
  selector: 'app-component-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass'],
})
export class ResultsComponent implements AfterViewInit {
  @Input() pageId!: keyof typeof gameResultsData.pages;

  @ViewChild('bfvWidget') bfvWidget?: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    const teamId = gameResultsData.pages[this.pageId];
    const options = {
      selectedTab: 'teammatches',
      colorResults: `#24252a;}</style><link rel='stylesheet' href='${window.location.protocol}//${window.location.hostname}/assets/other/bfvWidgetStyle.css'><style type='text/css'>xy{x:y`,
      colorNav: '#edf0f1',
      colorClubName: '#1e3799',
      backgroundNav: '#24252a',
      width: '100%',
      height: '100%',
    };
    const iFrame = document.createElement('iframe');
    iFrame.setAttribute('allowFullScreen', 'true');
    iFrame.width = '100%';
    iFrame.height = '100%';
    iFrame.style.border = 'none';
    const bfvHost = `${window.location.protocol}//widget-prod.bfv.de`;
    const appPath = `widget/widgetresource/iframe${'https:' === document.location.protocol ? '/ssl' : ''}?url=${
      window.location.hostname
    }`;
    iFrame.src = `${bfvHost}/${appPath}&widget=${encodeURIComponent(
      `widget/team/complete/team${teamId}/${options.selectedTab}?css=${encodeURIComponent(
        JSON.stringify(options),
      )}&referrer=${window.location.hostname}`,
    )}`;
    this.bfvWidget?.nativeElement.appendChild(iFrame);
  }
}
