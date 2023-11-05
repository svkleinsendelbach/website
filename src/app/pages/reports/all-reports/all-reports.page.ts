import { Component, OnInit } from '@angular/core';
import { Report, ReportGroupId } from 'src/app/types/report';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { TrackBy } from 'src/app/types/track-by';
import { FirebaseFunctionResult } from 'src/app/modules/firebase-api/types/firebase-function-result';

@Component({
    selector: 'pages-all-reports',
    styleUrls: ['./all-reports.page.sass'],
    templateUrl: './all-reports.page.html'
})
export class AllReportsPage implements OnInit {
    public TrackBy = TrackBy;

    public Report = Report;

    public fetchedReports: FirebaseFunctionResult<(Report & { groupId: ReportGroupId })[]> | null = null;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService
    ) {
        this.titleService.setTitle('Aktuelle Berichte');
    }

    public async ngOnInit() {
        this.fetchedReports = await this.firebaseApiService.function('report-getAll').call({});
    }
}
