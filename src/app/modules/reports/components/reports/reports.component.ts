import { Component, Input, OnInit } from '@angular/core';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { Report, ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { FetchState } from 'src/app/types/fetch-state';
import { InternalLink } from 'src/app/types/internal-path';

@Component({
    selector: 'reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {
    public Report = Report;

    @Input() isGameReport: boolean = false;

    @Input() public groupId!: ReportGroupId;

    @Input() public maxListCount?: number;

    @Input() public showAllReportsButton: boolean = false;

    public readonly allReportsLink = InternalLink.all['berichte'];

    public fetchedReports: FetchState<{ reports: Report.Flatten[]; hasMore: boolean }> = FetchState.loading;

    public constructor(
        private readonly firebaseApiService: FirebaseApiService,
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {}

    public ngOnInit() {
        this.firebaseApiService.function('report').function('get').call({
            groupId: this.groupId,
            numberReports: this.maxListCount
        }).then(result => {
            this.fetchedReports = FetchState.success(result);
        }).catch(reason => {
            this.fetchedReports = FetchState.failure(reason);
        });
    }
}
