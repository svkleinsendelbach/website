import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Report, ReportGroupId } from 'src/app/modules/firebase-api/types/report';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { ErrorLevel } from 'src/app/modules/input-form/types/error-level';
import { FileStorageService } from 'src/app/modules/firebase-api/services/file-storage.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { GameInfo } from 'src/app/modules/firebase-api/types/game-info';
import { Guid } from 'src/app/modules/firebase-api/types/guid';
import { InputError } from 'src/app/modules/input-form/types/input-error';
import { InputField } from 'src/app/modules/input-form/types/input-field';
import { InputForm } from 'src/app/modules/input-form/types/input-form';
import { internalLinks } from 'src/app/types/internal-link-path';
import { ReportMessageParser } from 'src/app/modules/reports/types/ReportMessageParser';
import { Router } from '@angular/router';
import { SelectOptions } from 'src/app/modules/input-form/components/input-field/select/select.component';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { UtcDate } from 'src/app/types/utc-date';
import { ValidationResult } from 'src/app/modules/input-form/types/validation-result';
import { Validator } from 'src/app/modules/input-form/types/validator';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'pages-edit-report',
    styleUrls: ['./edit-report.page.sass'],
    templateUrl: './edit-report.page.html'
})
export class EditReportPage implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('messagePreview') public messagePreviewElement: ElementRef<HTMLElement> | null = null;

    public previousReport: {
        groupId: ReportGroupId;
        report: Report;
    } | null = null;

    public bfvGameInputForm = new InputForm({
        bfvGameLink: new InputField<string>('', [
            Validator.required('Der BFV Link ist erforderlich.'),
            Validator.url('Das ist kein gültiger Link.')
        ])
    }, {
        failed: new InputError('Der Bericht konnte nicht gefunden werden.'),
        gameIdNotFound: new InputError('Die Spiel-Id wurde im Link nicht gefunden.'),
        gameNotFound: new InputError('Das Spiel wurde bei BFV nicht gefunden.'),
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        loading: new InputError('BFV Daten werden übernommen.', ErrorLevel.Info),
        reportNotFound: new InputError('Das Spiel hat keinen Bericht bei BFV.')
    });

    public inputForm = new InputForm({
        groupId: new InputField<ReportGroupId>('general', [
            Validator.required('Ein zugehöiges Thema ist erforderlich.'),
            Validator.isOneOf(ReportGroupId.all, 'Das zugehörige Thema ist ungültig.')
        ]),
        message: new InputField<string>('', [Validator.required('Die Nachricht ist erfordelich.')]),
        title: new InputField<string>('', [Validator.required('Der Titel ist erfordelich.')])
    }, {
        failed: new InputError('Der Bericht konnte nicht gespeichert werden.'),
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        loading: new InputError('Der Bericht wird gespeichert.', ErrorLevel.Info)
    });

    public imageUrl: string | null = null;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        private readonly firebaseApiService: FirebaseApiService,
        private readonly fileStorage: FileStorageService,
        private readonly sharedData: SharedDataService<{
            editReport: {
                groupId: ReportGroupId;
                report: Report.Flatten;
            };
        }>,
        private readonly router: Router
    ) {
        const previousReport = this.sharedData.getValue('editReport');
        if (previousReport) {
            this.previousReport = {
                groupId: previousReport.groupId,
                report: Report.concrete(previousReport.report)
            };
        }
        this.titleService.setTitle(this.previousReport ? 'Bericht bearbeiten' : 'Bericht hinzufügen');
    }

    public get groupIdSelectOptions(): SelectOptions<ReportGroupId> {
        return SelectOptions.grouped<ReportGroupId>(
            ReportGroupId.grouped.map(group => ({
                options: group.groupIds.map(groupId => ({
                    id: groupId,
                    text: ReportGroupId.title[groupId]
                })),
                title: group.title
            }))
        );
    }

    public ngOnInit() {
        this.inputForm.field('message').listeners.add('report-message-preview', message => {
            this.updateMessagePreview(message);
        });
        if (this.previousReport) {
            this.inputForm.field('groupId').initialValue = this.previousReport.groupId;
            this.inputForm.field('title').initialValue = this.previousReport.report.title;
            this.inputForm.field('message').initialValue = this.previousReport.report.message;
            this.imageUrl = this.previousReport.report.imageUrl;
        }
    }

    public ngAfterViewInit() {
        this.updateMessagePreview(this.inputForm.field('message').value);
    }

    public ngOnDestroy() {
        this.inputForm.field('message').listeners.remove('report-message-preview');
    }

    public async takeBfvGame() {
        if (this.bfvGameInputForm.status === 'loading')
            return;
        this.bfvGameInputForm.status = 'valid';
        const validation = this.bfvGameInputForm.evaluate();
        if (validation === ValidationResult.Invalid)
            return;
        this.bfvGameInputForm.status = 'loading';
        const match = (/^(?:https:\/\/)?(?:www\.)?bfv\.de\/spiele\/(?:\S+?\/)?(?<id>\S+?)$/gu).exec(this.bfvGameInputForm.field('bfvGameLink').value);
        if (!match || !match.groups) {
            this.bfvGameInputForm.status = 'gameIdNotFound';
            return;
        }
        try {
            const gameInfo = await this.firebaseApiService.function('bfvData').function('gameInfo')
                .call({
                    gameId: match.groups['id']
                });
            if (!gameInfo.report) {
                this.bfvGameInputForm.status = 'reportNotFound';
                return;
            }
            const { isSg2, sgHomeAway } = GameInfo.additionalProperties(gameInfo);
            this.inputForm.field('groupId').initialValue = isSg2 ? 'football-adults/second-team/game-report' : 'football-adults/first-team/game-report';
            this.inputForm.field('title').initialValue = `${UtcDate.decode(gameInfo.date).description} | ${gameInfo.report.title}`;
            this.inputForm.field('message').initialValue = gameInfo.report.paragraphs.reduce((result1, paragraph) => `${result1 + paragraph.reduce((result2, value) => {
                if (value.link === null)
                    return result2 + value.text;
                return `${result2}[${value.text}](${value.link})`;
            }, '')}\n\n`, '').trim();
            this.imageUrl = `https://service-prod.bfv.de/export.media?action=getLogo&format=16&id=${sgHomeAway === 'home' ? gameInfo.awayTeam.imageId : gameInfo.homeTeam.imageId}`;
        } catch (error) {
            if (error === null || typeof error !== 'object' || !('code' in error) || error.code !== 'not-found') {
                this.bfvGameInputForm.status = 'failed';
                throw error;
            }
            this.bfvGameInputForm.status = 'gameNotFound';
            return;
        }
        this.bfvGameInputForm.status = 'valid';
    }

    public async uploadImage(event: Event) {
        const { files } = (event.target as HTMLInputElement);
        if (!files)
            return;
        const match = (/.[^/.]+$/u).exec(files[0].name);
        if (!match)
            return;
        const filePath = `${environment.databaseType}/uploads/images/${Guid.newGuid().guidString}${match[0]}`;
        this.imageUrl = await this.fileStorage.upload(files[0], filePath);
    }

    public async saveReport() {
        if (this.inputForm.status === 'loading')
            return;
        this.inputForm.status = 'valid';
        const validation = this.inputForm.evaluate();
        if (validation === ValidationResult.Invalid)
            return;
        this.inputForm.status = 'loading';
        const reportId = this.previousReport ? this.previousReport.report.id : Guid.newGuid();
        const createDate = (this.previousReport ? this.previousReport.report.createDate : UtcDate.now).encoded;
        await this.firebaseApiService.function('report').function('edit')
            .call({
                editType: this.previousReport ? 'change' : 'add',
                groupId: this.inputForm.field('groupId').value,
                previousGroupId: this.previousReport ? this.previousReport.groupId : null,
                report: {
                    createDate: createDate,
                    imageUrl: this.imageUrl,
                    message: this.inputForm.field('message').value,
                    title: this.inputForm.field('title').value
                },
                reportId: reportId.guidString
            })
            .catch(reason => {
                this.inputForm.status = 'failed';
                throw reason;
            });
        await this.router.navigateByUrl(internalLinks['bearbeiten/berichte'].link);
        this.inputForm.status = 'valid';
    }

    private updateMessagePreview(message: string) {
        if (!this.messagePreviewElement)
            return;
        while (this.messagePreviewElement.nativeElement.firstChild !== null)
            this.messagePreviewElement.nativeElement.removeChild(this.messagePreviewElement.nativeElement.firstChild);
        this.messagePreviewElement.nativeElement.style.color = this.styleConfig.css('text');
        const parser = new ReportMessageParser();
        const elements = parser.parse(message);
        if (elements === null) {
            this.messagePreviewElement.nativeElement.style.color = this.styleConfig.css('primary');
            this.messagePreviewElement.nativeElement.append('Es gab ein Fehler bei der Nachricht.');
        } else {
            for (const element of elements)
                this.messagePreviewElement.nativeElement.append(element);
        }
    }
}
