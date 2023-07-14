import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { Guid } from 'src/app/modules/firebase-api/types/guid';
import { Report, ReportGroup, ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { InternalLink } from 'src/app/types/internal-path';

@Component({
    selector: 'pages-editing-reports.page',
    templateUrl: './editing-reports.page.html',
    styleUrls: ['./editing-reports.page.sass']
})
export class EditingReportsPage {
    public logInPageLink = InternalLink.all['bearbeiten/anmelden'];
    public mainEditingPageLink = InternalLink.all['bearbeiten'];
    public reportGroupTitle = ReportGroupId.title;

    public reportGroups: ReportGroup[] | undefined = undefined;

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
        private router: Router
    ) {
        this.titleService.setTitle('Berichte bearbeiten');
        this.getReports();
    }

    private async getReports() {
        const reportGroups = await Promise.all(ReportGroupId.all.map(async groupId => {
            const result = await this.firebaseApiService.function('report').function('get').call({
                groupId: groupId,
                numberReports: undefined
            });
            return {
                groupId: groupId,
                reports: result.reports
            };
        }));
        this.reportGroups = reportGroups.flatMap(reportGroup => {
            if (reportGroup.reports.length === 0)
                return [];
            return {
                groupId: reportGroup.groupId,
                reports: reportGroup.reports.map(report => Report.concrete(report))
            };
        });
    }

    public getReportGroupOf(groupId: ReportGroupId): ReportGroup | undefined {
        return this.reportGroups?.find(reportGroup => reportGroup.groupId === groupId);
    }

    public async deleteReport(groupId: ReportGroupId, reportId: Guid) {
        this.reportGroups = this.reportGroups?.flatMap(reportGroup => {
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
        await this.firebaseApiService.function('report').function('edit').call({
            editType: 'remove',
            groupId: groupId,
            previousGroupId: undefined,
            reportId: reportId.guidString,
            report: undefined
        });
    }

    public async editReport(groupId: ReportGroupId, report: Report) {
        this.sharedData.setValue('editReport', {
            groupId: groupId,
            report: Report.flatten(report)
        });
        await this.router.navigateByUrl(InternalLink.all['bearbeiten/berichte/bearbeiten'].link);
    }

    public async addNewReport() {
        this.sharedData.removeValue('editReport');
        await this.router.navigateByUrl(InternalLink.all['bearbeiten/berichte/bearbeiten'].link);
    }
}
