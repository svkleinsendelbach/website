import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Report, ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { ReportMessageParser } from '../../types/ReportMessageParser';
import { UtcDate } from 'src/app/types/utc-date';

@Component({
    selector: 'report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.sass']
})
export class ReportComponent implements AfterViewInit {
    public ReportGroupId = ReportGroupId;

    @Input() report!: Report;

    @Input() groupId?: ReportGroupId;

    @ViewChild('message') public messageElement?: ElementRef<HTMLElement>;

    public isMessageClipped = false;

    public isShownMore = false;

    public constructor(
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {}

    public ngAfterViewInit() {
        if (this.messageElement === undefined)
            return;
        const parser = new ReportMessageParser();
        const elements = parser.parse(this.report.message);
        if (elements === null) {
            this.messageElement.nativeElement.style.color = this.styleConfig.css('primaryColor');
            this.messageElement.nativeElement.append('Es gab ein Fehler bei der Nachricht.');
        } else {
            for (const element of elements)
                this.messageElement.nativeElement.append(element);
        }
        this.isMessageClipped = this.messageElement.nativeElement.clientHeight >= 150;
    }

    public get isRecent(): boolean {
        const referenceDate = UtcDate.now.advanced({ day: -3 });
        return this.report.createDate.compare(referenceDate) !== 'less';
    }

    public toggleShowMore() {
        this.isShownMore = !this.isShownMore;
    }
}
