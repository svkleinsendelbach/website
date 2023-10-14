import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Report, ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { ReportMessageParser } from '../../types/ReportMessageParser';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { UtcDate } from 'src/app/types/utc-date';

@Component({
    selector: 'report',
    styleUrls: ['./report.component.sass'],
    templateUrl: './report.component.html'
})
export class ReportComponent implements AfterViewInit {
    @Input() public report!: Report;

    @Input() public groupId: ReportGroupId | null = null;

    @ViewChild('message') public messageElement: ElementRef<HTMLElement> | null = null;

    public ReportGroupId = ReportGroupId;

    public isMessageClipped = false;

    public isShownMore = false;

    public constructor(
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {}

    public get isRecent(): boolean {
        const referenceDate = UtcDate.now.advanced({ day: -3 });
        return this.report.createDate.compare(referenceDate) !== 'less';
    }

    public ngAfterViewInit() {
        if (!this.messageElement)
            return;
        const parser = new ReportMessageParser();
        const elements = parser.parse(this.report.message);
        if (elements === null) {
            this.messageElement.nativeElement.style.color = this.styleConfig.css('primary');
            this.messageElement.nativeElement.append('Es gab ein Fehler bei der Nachricht.');
        } else {
            for (const element of elements)
                this.messageElement.nativeElement.append(element);
        }
        this.isMessageClipped = this.messageElement.nativeElement.clientHeight >= 150;
    }

    public toggleShowMore() {
        this.isShownMore = !this.isShownMore;
    }
}
