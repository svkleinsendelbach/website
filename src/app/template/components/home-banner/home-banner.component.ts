import { Component, Input, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import { DeviceTypeService } from '../../../services/device-type.service';
import { StyleConfigService } from '../../../services/style-config.service';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.sass']
})
export class HomeBannerComponent implements OnInit {
  public faChevronLeft = faChevronLeft;
  public faChevronRight = faChevronRight;
  public faCircle = faCircle;

  @Input() public bannerData!: HomeBannerComponent.BannerItem[];

  public currentPage = 1;

  private nextPageTimeout: number | null = null;

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {}

  public ngOnInit() {
    this.setPage(1);
  }

  private setPage(page: number) {
    if (this.nextPageTimeout !== null) {
      clearTimeout(this.nextPageTimeout);
    }
    this.currentPage = page;
    this.nextPageTimeout = window.setTimeout(() => {
      if (this.currentPage < this.bannerData.length) {
        this.setPage(this.currentPage + 1);
      } else {
        this.setPage(1);
      }
    }, 5000);
  }

  public handleNavBarClick(page: number) {
    this.setPage(page);
  }

  public handleButtonClick(direction: 'left' | 'right') {
    switch (direction) {
      case 'left':
        if (this.currentPage > 1) {
          this.setPage(this.currentPage - 1);
        } else {
          this.setPage(this.bannerData.length);
        }
        break;
      case 'right':
        if (this.currentPage < this.bannerData.length) {
          this.setPage(this.currentPage + 1);
        } else {
          this.setPage(1);
        }
        break;
    }
  }
}

export namespace HomeBannerComponent {
  export interface BannerItem {
    imageSource: string,
    title: string
  }
}
