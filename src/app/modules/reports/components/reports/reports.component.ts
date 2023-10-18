import { Component, Input, OnInit } from '@angular/core';
import { Report, ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { TrackBy } from 'src/app/types/track-by';
import { Result } from 'src/app/modules/firebase-api/types/result';

@Component({
    selector: 'reports',
    styleUrls: ['./reports.component.sass'],
    templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {
    @Input() public groupId!: ReportGroupId;

    @Input() public maxListCount: number | null = null;

    public TrackBy = TrackBy;

    public fetchedReports: Result<{ reports: Report[]; hasMore: boolean }> | null = null;

    public constructor(
        private readonly firebaseApiService: FirebaseApiService,
        public readonly deviceType: DeviceTypeService
    ) {}

    public get isGameReport(): boolean {
        return this.groupId === 'football-adults/first-team/game-report' ||
            this.groupId === 'football-adults/second-team/game-report' ||
            this.groupId === 'football-youth/c-youth/game-report' ||
            this.groupId === 'football-youth/e-youth/game-report' ||
            this.groupId === 'football-youth/f-youth/game-report' ||
            this.groupId === 'football-youth/g-youth/game-report';
    }

    public async ngOnInit() {
        this.fetchedReports = await this.firebaseApiService.function('report-get').call({
            groupId: this.groupId,
            numberReports: this.maxListCount
        });
    }
}
