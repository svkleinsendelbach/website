import { Component, Input, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import { DeviceTypeService } from '../../../services/device-type.service';
import { Link } from 'src/app/types/link';
import { StyleConfigService } from '../../../services/style-config.service';
import { TrackBy } from 'src/app/types/track-by';

export interface BannerItem {
    imageSource: string;
    title: string;
    subTitle: string | null;
    link: Link;
    isCurrent: boolean;
}

@Component({
    selector: 'app-home-banner',
    styleUrls: ['./home-banner.component.sass'],
    templateUrl: './home-banner.component.html'
})
export class HomeBannerComponent implements OnInit {
    @Input() public bannerData!: BannerItem[];

    public TrackBy = TrackBy;

    public faChevronLeft = faChevronLeft;

    public faChevronRight = faChevronRight;

    public faCircle = faCircle;

    public currentPage = 1;

    private nextPageTimeout: number | null = null;

    private mouseDownPosition: [number, number] | null = null;

    public constructor(
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService
    ) {}

    public get current(): BannerItem {
        return this.bannerData[this.currentPage - 1];
    }

    public get heightStyle(): string {
        if (this.deviceType.isMobile)
            return '360px';
        return '720px';
    }

    public ngOnInit() {
        this.bannerData.sort((lhs, rhs) => lhs.isCurrent ? -1 : rhs.isCurrent ? 1 : 0);
        this.setPage(1);
    }

    public openCurrentLink() {
        window.open(this.current.link.link, this.current.link.target);
    }

    public handleNavBarClick(page: number) {
        this.setPage(page);
    }

    public handleButtonClick(direction: 'left' | 'right') {
        switch (direction) {
        case 'left':
            if (this.currentPage > 1)
                this.setPage(this.currentPage - 1);
            else
                this.setPage(this.bannerData.length);
            break;
        case 'right':
            if (this.currentPage < this.bannerData.length)
                this.setPage(this.currentPage + 1);
            else
                this.setPage(1);
            break;
        default:
            break;
        }
    }

    public onMouseDown(event: MouseEvent | TouchEvent) {
        if (!this.isClickOnNavContainer(event))
            return;
        this.mouseDownPosition = this.getTapPosition(event);
    }

    public onMouseUp(event: MouseEvent | TouchEvent) {
        if (!this.isClickOnNavContainer(event))
            return;
        if (!this.mouseDownPosition)
            return;
        const position = this.getTapPosition(event);
        if (!position)
            return;
        const absX = Math.abs(this.mouseDownPosition[0] - position[0]);
        const absY = Math.abs(this.mouseDownPosition[1] - position[1]);
        if (absX <= 10 && absY <= 10) {
            this.openCurrentLink();
            this.mouseDownPosition = null;
            return;
        }
        if (absY > absX)
            return;
        if (this.deviceType.current === 'desktop' && absX < 250)
            return;
        if (this.deviceType.current === 'tablet' && absX < 150)
            return;
        if (this.deviceType.current === 'mobile' && absX < 50)
            return;
        const direction = this.mouseDownPosition[0] >= position[0] ? 'left' : 'right';
        this.handleButtonClick(direction);
        this.mouseDownPosition = null;
    }

    private getTapPosition(event: MouseEvent | TouchEvent): [number, number] | null {
        if ('pageX' in event && 'pageY' in event)
            return [event.pageX, event.pageY];
        if ('touches' in event) {
            if (event.touches.length !== 1)
                return null;
            const touch = event.touches.item(0);
            if (touch === null)
                return null;
            return [touch.screenX, touch.screenY];
        }
        return null;
    }

    private setPage(page: number) {
        if (this.nextPageTimeout !== null)
            clearTimeout(this.nextPageTimeout);
        this.currentPage = page;
        this.nextPageTimeout = window.setTimeout(() => {
            if (this.currentPage < this.bannerData.length)
                this.setPage(this.currentPage + 1);
            else
                this.setPage(1);
        }, 10000);
    }

    private isClickOnNavContainer(event: MouseEvent | TouchEvent): boolean {
        if (event.target === null)
            return false;
        if (!('id' in event.target) || typeof event.target.id !== 'string')
            return false;
        return event.target.id === 'nav-bar-container' || event.target.id === 'nav-button-container';
    }
}
