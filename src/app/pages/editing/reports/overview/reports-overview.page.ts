import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TextSectionComponent, NavigationBarComponent, AuthenticationCheckComponent, ButtonComponent, OverviewListComponent, ResultDisplayComponent, Report, AuthenticationService, FirebaseApiService, InternalLinkService, NavigationBarData, ReportGroup, Result, SharedDataService, TrackBy, OverviewListData } from 'kleinsendelbach-website-library';
import { FirebaseFunctions } from '../../../../types/firebase-functions';
import { InternalPathKey } from '../../../../types/internal-paths';
import { ReportGroupId } from '../../../../types/report-group-id';
import { UserRole } from '../../../../types/user-role';

@Component({
    selector: 'reports-overview-page',
    standalone: true,
    imports: [CommonModule, TextSectionComponent, NavigationBarComponent, AuthenticationCheckComponent, ButtonComponent, OverviewListComponent, ResultDisplayComponent],
    templateUrl: './reports-overview.page.html',
    styleUrl: './reports-overview.page.sass'
})
export class ReportsOverviewPage {

    public navigationBarData: NavigationBarData<InternalPathKey> = [
        {
            text: 'Zurück',
            alignment: 'left',
            link: 'editing/main',
            action: null
        },
        {
            text: 'Abmelden',
            alignment: 'right',
            link: 'editing/login',
            action: async () => void this.authenticationService.logout()
        }
    ];

    public reportGroupTitle = ReportGroupId.title;

    public reportGroupsResult: Result<ReportGroup<ReportGroupId>[]> | null = null;

    public TrackBy = TrackBy;

    constructor(
        private readonly titleService: Title,
        private readonly authenticationService: AuthenticationService<UserRole>,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly router: Router,
        private readonly linkService: InternalLinkService<InternalPathKey>,
        private readonly sharedData: SharedDataService<{
            editReport: {
                report: Report.Flatten,
                groupId: ReportGroupId
            }
        }>
    ) {
        this.titleService.setTitle('Berichte');
    }

    public async getReports() {
        this.reportGroupsResult = await this.firebaseApi.function('report-get').call({
            groupIds: ReportGroupId.all,
            count: null
        });
    }

    public clearSharedData() {
        this.sharedData.removeValue('editReport');
    }

    public reportOverviewListData(reportGroup: ReportGroup<ReportGroupId>): OverviewListData<InternalPathKey> {
        return reportGroup.reports.map(report => ({
            title: report.title,
            subtitle: report.message.length > 250 ? `${report.message.slice(0, 250)}...` : report.message,
            buttons: [
                {
                    title: 'Bearbeiten',
                    action: () => void this.editReport(reportGroup.groupId, report),
                    link: null,
                    options: null
                },
                {
                    title: 'Löschen',
                    action: () => void this.deleteReport(reportGroup.groupId, report),
                    link: null,
                    options: null
                }
            ]
        }));
    }

    public async deleteReport(groupId: ReportGroupId, report: Report) {
        if (!this.reportGroupsResult || this.reportGroupsResult.isFailure())
            return;
        this.reportGroupsResult = Result.success(this.reportGroupsResult.value.flatMap(reportGroup => {
            if (reportGroup.groupId !== groupId)
                return reportGroup;
            const reports = reportGroup.reports.filter(report => report.id.guidString !== report.id.guidString);
            if (reports.length === 0)
                return [];
            return {
                reports: reports,
                groupId: reportGroup.groupId
            };
        }));
        await this.firebaseApi.function('report-edit').call({
            editType: 'remove',
            report: null,
            reportId: report.id.guidString,
            groupId: groupId,
            previousGroupId: null
        });
    }

    public async editReport(groupId: ReportGroupId, report: Report) {
        this.sharedData.setValue('editReport', {
            report: Report.flatten(report),
            groupId: groupId
        });
        await this.router.navigateByUrl(this.linkService.link('editing/reports/edit').link);
    }
}
