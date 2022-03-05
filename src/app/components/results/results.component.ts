import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import gameResultsData from 'src/app/assets/game-results-data.json';

@Component({
  selector: 'app-component-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass'],
})
export class ResultsComponent implements AfterViewInit {
  @Input() pageId?: keyof typeof gameResultsData.pages;

  @Input() results?: {
    teamName: string;
    id: keyof typeof gameResultsData.pages;
  }[];

  @ViewChild('bfvWidget') bfvWidget?: ElementRef;

  @ViewChild('bfvWidgetContainer') bfvWidgetContainer?: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    if (this.pageId !== undefined) {
      const bfvWidgetIFrame = this.getBfvWidget(this.pageId)
      this.bfvWidget?.nativeElement.appendChild(bfvWidgetIFrame);
    } else if (this.results !== undefined) {
      for (const result of this.results) {
        const title = document.createElement('h2');
        title.innerHTML = `Ergebisse der ${result.teamName}`;
        const container = document.createElement('span');
        container.classList.add('bfv-widget');
        const bfvWidgetIFrame = this.getBfvWidget(result.id);
        container.appendChild(bfvWidgetIFrame);
        this.bfvWidgetContainer?.nativeElement.appendChild(title);
        this.bfvWidgetContainer?.nativeElement.appendChild(container);
      }
    } else {
      throw new Error('pageId and results are undefined.');
    }
  }

  private getBfvWidget(id: keyof typeof gameResultsData.pages): HTMLIFrameElement {
    const teamId = gameResultsData.pages[id];
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
    const appPath = `widget/widgetresource/iframe${'https:' === document.location.protocol ? '/ssl' : ''}?url=${window.location.hostname
      }`;
    iFrame.src = `${bfvHost}/${appPath}&widget=${encodeURIComponent(
      `widget/team/complete/team${teamId}/${options.selectedTab}?css=${encodeURIComponent(
        JSON.stringify(options),
      )}&referrer=${window.location.hostname}`,
    )}`;
    return iFrame;
  }
}

