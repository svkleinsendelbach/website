import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TextSectionComponent, ReportsComponent, ResultDisplayComponent, ReportGroup, Result, FirebaseApiService } from 'kleinsendelbach-website-library';
import { ReportGroupId } from '../../types/report-group-id';
import { Title } from '@angular/platform-browser';
import { FirebaseFunctions } from '../../types/firebase-functions';

@Component({
    selector: 'reports-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, ReportsComponent, ResultDisplayComponent],
    templateUrl: './reports.page.html',
    styleUrl: './reports.page.sass'
})
export class ReportsPage {

    public reportGroupsResult: Result<ReportGroup<ReportGroupId>[]> | null = null

    public reportGroupTitle: Record<ReportGroupId, string> = ReportGroupId.title;

    constructor(
        private readonly titleService: Title,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>
    ) {
        this.titleService.setTitle('Berichte')
        void this.fetchReportGroups();
    }

    private async fetchReportGroups() {
        this.reportGroupsResult = await this.firebaseApi.function('report-get').call({
            groupIds: ReportGroupId.all,
            count: null
        });
    }
}
