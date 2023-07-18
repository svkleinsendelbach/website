import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Crypter } from 'src/app/modules/firebase-api/crypter/Crypter';
import { unishortBytes, unishortString } from 'src/app/modules/firebase-api/crypter/utils';
import { FileStorageService } from 'src/app/modules/firebase-api/services/file-storage.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { GameInfo } from 'src/app/modules/firebase-api/types/game-info';
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
import { UtcDate } from 'src/app/types/utc-date';
import { environment } from 'src/environments/environment';

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
        report: Report;
    } | undefined;

    public bfvGameInputForm = new InputForm({
        bfvGameLink: new InputField<string>('', [
            Validator.required('Der BFV Link ist erforderlich.'),
            Validator.url('Das ist kein gültiger Link.')
        ])
    }, {
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        gameIdNotFound: new InputError('Die Spiel-Id wurde im Link nicht gefunden.'),
        gameNotFound: new InputError('Das Spiel wurde bei BFV nicht gefunden.'),
        reportNotFound: new InputError('Das Spiel hat keinen Bericht bei BFV.'),
        loading: new InputError('BFV Daten werden übernommen.', ErrorLevel.Info),
        failed: new InputError('Der Bericht konnte nicht gefunden werden.')
    });

    public inputForm = new InputForm({
        groupId: new InputField<ReportGroupId>('general', [
            Validator.required('Ein zugehöiges Thema ist erforderlich.'),
            Validator.isOneOf(ReportGroupId.all, 'Das zugehörige Thema ist ungültig.')
        ]),
        title: new InputField<string>('', [
            Validator.required('Der Titel ist erfordelich.')
        ]),
        message: new InputField<string>('', [
            Validator.required('Die Nachricht ist erfordelich.')
        ]),
    }, {
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        loading: new InputError('Der Bericht wird gespeichert.', ErrorLevel.Info),
        failed: new InputError('Der Bericht konnte nicht gespeichert werden.')
    });

    public imageUrl?: string;

    @ViewChild('messagePreview') public messagePreviewElement?: ElementRef<HTMLElement>;

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
        private router: Router
    ) {
        const previousReport = this.sharedData.getValue('editReport');
        if (previousReport !== undefined) {
            this.previousReport = {
                groupId: previousReport.groupId,
                report: Report.concrete(previousReport.report)
            };
        }
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
        const gameId = /^(?:https:\/\/)?(?:www\.)?bfv\.de\/spiele\/(?:\S+?\/)?(?<id>\S+?)$/g.exec(this.bfvGameInputForm.field('bfvGameLink').value)?.groups?.['id'];
        if (gameId === undefined) {
            this.bfvGameInputForm.status = 'gameIdNotFound';
            return;
        }
        try {
            const gameInfo = await this.firebaseApiService.function('bfvData').function('gameInfo').call({
                gameId: gameId
            });
            if (gameInfo.report === undefined) {
                this.bfvGameInputForm.status = 'reportNotFound';
                return;
            }
            const { isSg2, sgHomeAway } = GameInfo.additionalProperties(gameInfo);
            this.inputForm.field('groupId').initialValue = isSg2 ? 'football-adults/second-team/game-report' : 'football-adults/first-team/game-report';
            this.inputForm.field('title').initialValue = UtcDate.decode(gameInfo.date).description + ' | ' + gameInfo.report.title;
            this.inputForm.field('message').initialValue = gameInfo.report.paragraphs.reduce((result, paragraph) => {
                return result + paragraph.reduce((result, value) => {
                    if (value.link === undefined)
                        return result + value.text;
                    return result + `[${value.text}](${value.link})`;
                }, '') + '\n\n';
            }, '').trim();
            this.imageUrl = `https://service-prod.bfv.de/export.media?action=getLogo&format=16&id=${sgHomeAway === 'home' ? gameInfo.awayTeam.imageId : gameInfo.homeTeam.imageId }`;
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

    private updateMessagePreview(message: string) {
        if (this.messagePreviewElement === undefined)
            return;
        while (this.messagePreviewElement.nativeElement.firstChild !== null)
            this.messagePreviewElement.nativeElement.removeChild(this.messagePreviewElement.nativeElement.firstChild);
        this.messagePreviewElement.nativeElement.style.color = this.styleConfig.css('textColor');
        const parser = new ReportMessageParser();
        const elements = parser.parse(message);
        if (elements === null) {
            this.messagePreviewElement.nativeElement.style.color = this.styleConfig.css('primaryColor');
            this.messagePreviewElement.nativeElement.append('Es gab ein Fehler bei der Nachricht.');
        } else {
            for (const element of elements)
                this.messagePreviewElement.nativeElement.append(element);
        }
    }

    public async uploadImage(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file === undefined) return;
        const fileExtension = /.[^/.]+$/.exec(file.name)?.[0];
        if (fileExtension === undefined) return;
        const filePath = `${environment.databaseType}/uploads/images/${Guid.newGuid().guidString}${fileExtension}`;
        this.imageUrl = await this.fileStorage.upload(file, filePath);
    }

    public async saveReport() {
        if (this.inputForm.status === 'loading')
            return;
        this.inputForm.status = 'valid';
        const validation = this.inputForm.evaluate();
        if (validation === ValidationResult.Invalid)
            return;
        this.inputForm.status = 'loading';
        const reportId = this.previousReport?.report.id ?? Guid.newGuid();
        const createDate = (this.previousReport?.report.createDate ?? UtcDate.now).encoded;
        await this.firebaseApiService.function('report').function('edit').call({
            editType: this.previousReport !== undefined ? 'change' : 'add',
            groupId: this.inputForm.field('groupId').value,
            previousGroupId: this.previousReport?.groupId,
            reportId: reportId.guidString,
            report: {
                title: this.inputForm.field('title').value,
                message: this.inputForm.field('message').value,
                imageUrl: this.imageUrl,
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
