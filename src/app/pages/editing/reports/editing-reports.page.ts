import { Report, ReportGroup, ReportGroupId } from 'src/app/types/report';
import { Component } from '@angular/core';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { Guid } from 'src/app/types/guid';
import { internalLinks } from 'src/app/types/internal-link-path';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { TrackBy } from 'src/app/types/track-by';

@Component({
    selector: 'pages-editing-reports.page',
    styleUrls: ['./editing-reports.page.sass'],
    templateUrl: './editing-reports.page.html'
})
export class EditingReportsPage {
    public TrackBy = TrackBy;

    public Report = Report;

    public reportGroupTitle = ReportGroupId.title;

    public reportGroups: ReportGroup[] | null = null;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly sharedData: SharedDataService<{
            editReport: {
                groupId: ReportGroupId;
                report: Report.Flatten;
            };
        }>,
        private readonly router: Router
    ) {
        this.titleService.setTitle('Berichte bearbeiten');
    }

    public getReportGroupOf(groupId: ReportGroupId): ReportGroup | null {
        if (!this.reportGroups)
            return null;
        return this.reportGroups.find(reportGroup => reportGroup.groupId === groupId) ?? null;
    }

    public async deleteReport(groupId: ReportGroupId, reportId: Guid) {
        if (!this.reportGroups)
            return;
        this.reportGroups = this.reportGroups.flatMap(reportGroup => {
            if (reportGroup.groupId !== groupId)
                return reportGroup;
            const reports = reportGroup.reports.filter(report => report.id.guidString !== reportId.guidString);
            if (reports.length === 0)
                return [];
            return {
                groupId: reportGroup.groupId,
                reports: reports
            };
        });
        await this.firebaseApiService.function('report-edit').call({
            editType: 'remove',
            groupId: groupId,
            previousGroupId: null,
            report: null,
            reportId: reportId.guidString
        });
    }

    public async editReport(groupId: ReportGroupId, report: Report) {
        this.sharedData.setValue('editReport', {
            groupId: groupId,
            report: Report.flatten(report)
        });
        await this.router.navigateByUrl(internalLinks['bearbeiten/berichte/bearbeiten'].link);
    }

    public async addNewReport() {
        this.sharedData.removeValue('editReport');
        await this.router.navigateByUrl(internalLinks['bearbeiten/berichte/bearbeiten'].link);
    }

    public async getReports() {
        this.reportGroups = await Promise.all(ReportGroupId.all.map(async groupId => {
            const result = await this.firebaseApiService.function('report-get').call({
                groupId: groupId,
                numberReports: null
            });
            if (result.isFailure())
                throw result.error;
            return {
                groupId: groupId,
                reports: result.value.reports
            };
        }));
    }
}
