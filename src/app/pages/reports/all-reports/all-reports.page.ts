import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { Report, ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { FetchState } from 'src/app/types/fetch-state';

@Component({
    selector: 'pages-all-reports',
    templateUrl: './all-reports.page.html',
    styleUrls: ['./all-reports.page.sass']
})
export class AllReportsPage implements OnInit {
    public Report = Report;

    public fetchedReports: FetchState<(Report.Flatten & { groupId: ReportGroupId })[]> = FetchState.loading;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService
    ) {
        this.titleService.setTitle('Aktuelle Berichte');
    }

    public ngOnInit() {
        this.firebaseApiService.function('report').function('getAll').call({})
            .then(reports => {
                this.fetchedReports = FetchState.success(reports);
            }).catch(reason => {
                this.fetchedReports = FetchState.failure(reason);
            });
    }
}
