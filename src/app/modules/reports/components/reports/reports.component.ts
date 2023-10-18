import { Component, Input, OnInit } from '@angular/core';
import { Report, ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { FetchState } from 'src/app/types/fetch-state';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { TrackBy } from 'src/app/types/track-by';

@Component({
    selector: 'reports',
    styleUrls: ['./reports.component.sass'],
    templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {
    @Input() public isGameReport: boolean = false;

    @Input() public groupId!: ReportGroupId;

    @Input() public maxListCount: number | null = null;

    @Input() public showAllReportsButton: boolean = false;

    public TrackBy = TrackBy;

    public Report = Report;

    public fetchedReports: FetchState<{ reports: Report[]; hasMore: boolean }> = FetchState.loading;

    public constructor(
        private readonly firebaseApiService: FirebaseApiService,
        public readonly styleConfig: StyleConfigService,
        public readonly deviceType: DeviceTypeService
    ) {}

    public ngOnInit() {
        this.firebaseApiService.function('report').function('get')
            .call({
                groupId: this.groupId,
                numberReports: this.maxListCount
            })
            .then(result => {
                this.fetchedReports = FetchState.success({
                    hasMore: result.hasMore,
                    reports: result.reports.map(report => Report.concrete(report))
                });
            })
            .catch(reason => {
                this.fetchedReports = FetchState.failure(reason);
            });
    }
}
