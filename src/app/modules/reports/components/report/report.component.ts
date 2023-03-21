import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Report } from 'src/app/modules/firebase-api/types/report';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Datum } from 'src/app/types/datum';
import { ReportMessageParser } from '../../types/ReportMessageParser';

@Component({
    selector: 'report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.sass']
})
export class ReportComponent implements AfterViewInit {
    public Datum = Datum;

    @Input() report!: Report.Flatten;

    @ViewChild('message') public messageElement?: ElementRef<HTMLElement>;

    public constructor(
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {}

    public ngAfterViewInit() {
        if (this.messageElement === undefined)
            return;
        const parser = new ReportMessageParser(this.styleConfig.css('primaryColor'));
        const elements = parser.parse(this.report.message);
        if (elements === null) {
            this.messageElement.nativeElement.style.color = this.styleConfig.css('primaryColor');
            this.messageElement.nativeElement.append('Es gab ein Fehler bei der Nachricht.');
        } else {
            for (const element of elements)
                this.messageElement.nativeElement.append(element);
        }
    }
}
