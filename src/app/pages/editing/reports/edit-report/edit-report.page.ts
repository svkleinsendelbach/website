import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { Guid } from 'src/app/modules/firebase-api/types/guid';
import { Report, ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { SelectOptions } from 'src/app/modules/input-form/components/input-field/select/select.component';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { ValidationResult } from 'src/app/modules/input-form/types/validation-result';
import { Validator } from 'src/app/modules/input-form/types/validator';
import { ReportMessageParser } from 'src/app/modules/reports/types/ReportMessageParser';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { InternalLink } from 'src/app/types/internal-path';

@Component({
    selector: 'pages-edit-report',
    templateUrl: './edit-report.page.html',
    styleUrls: ['./edit-report.page.sass']
})
export class EditReportPage implements OnInit, AfterViewInit, OnDestroy {
    public logInPageLink = InternalLink.all['bearbeiten/anmelden'];
    public editReportsLink = InternalLink.all['bearbeiten/berichte'];

    public previousReport: {
        groupId: ReportGroupId;
        report: Report.Flatten;
    } | undefined;

    public inputForm = new InputForm({
        groupId: new InputField<ReportGroupId>('general', [
            Validator.required('Ein zugehöiges Thema ist erforderlich.'),
            Validator.isOneOf(ReportGroupId.all, 'Das zugehörige Thema ist ungültig.')
        ]),
        message: new InputField<string>('', [
            Validator.required('Die Nachricht is erfordelich.')
        ]),
    }, {
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        loading: new InputError('Bericht wird gespeichert.', ErrorLevel.Info),
        failed: new InputError('Bericht konnte nicht gespeichert werden.')
    });

    @ViewChild('messagePreview') public messagePreviewElement?: ElementRef<HTMLElement>;

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
        this.previousReport = this.sharedData.getValue('editReport');
        this.titleService.setTitle(this.previousReport === undefined ? 'Bericht hinzufügen' : 'Bericht bearbeiten');
    }

    public get groupIdSelectOptions(): SelectOptions<ReportGroupId> {
        return SelectOptions.grouped<ReportGroupId>(
            ReportGroupId.grouped.map(group => {
                return {
                    title: group.title,
                    options: group.groupIds.map(groupId => {
                        return {
                            id: groupId,
                            text: ReportGroupId.title[groupId]
                        };
                    })
                };
            })
        );
    }

    public ngOnInit() {
        this.inputForm.field('message').listeners.add('report-message-preview', message => {
            this.updateMessagePreview(message);
        });
        if (this.previousReport !== undefined) {
            this.inputForm.field('groupId').initialValue = this.previousReport.groupId;
            this.inputForm.field('message').initialValue = this.previousReport.report.message;
        }
    }

    public ngAfterViewInit() {
        this.updateMessagePreview(this.inputForm.field('message').value);
    }

    public ngOnDestroy() {
        this.inputForm.field('message').listeners.remove('report-message-preview');
    }

    private updateMessagePreview(message: string) {
        if (this.messagePreviewElement === undefined)
            return;
        while (this.messagePreviewElement.nativeElement.firstChild !== null)
            this.messagePreviewElement.nativeElement.removeChild(this.messagePreviewElement.nativeElement.firstChild);
        this.messagePreviewElement.nativeElement.style.color = this.styleConfig.css('textColor');
        const parser = new ReportMessageParser(this.styleConfig.css('primaryColor'));
        const elements = parser.parse(message);
        if (elements === null) {
            this.messagePreviewElement.nativeElement.style.color = this.styleConfig.css('primaryColor');
            this.messagePreviewElement.nativeElement.append('Es gab ein Fehler bei der Nachricht.');
        } else {
            for (const element of elements)
                this.messagePreviewElement.nativeElement.append(element);
        }
    }

    public async saveReport() {
        if (this.inputForm.status === 'loading')
            return;
        this.inputForm.status = 'valid';
        const validation = this.inputForm.evaluate();
        if (validation === ValidationResult.Invalid)
            return;
        this.inputForm.status = 'loading';
        const reportId = this.previousReport?.report.id ?? Guid.newGuid().guidString;
        const createDate = this.previousReport?.report.createDate ?? new Date().toISOString();
        await this.firebaseApiService.function('report').function('edit').call({
            editType: this.previousReport !== undefined ? 'change' : 'add',
            groupId: this.inputForm.field('groupId').value,
            previousGroupId: this.previousReport?.groupId,
            reportId: reportId,
            report: {
                message: this.inputForm.field('message').value,
                createDate: createDate
            }
        }).catch(reason => {
            this.inputForm.status = 'failed';
            throw reason;
        });
        await this.router.navigateByUrl(InternalLink.all['bearbeiten/berichte'].link);
        this.inputForm.status = 'valid';
    }
}
