import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Report, NavigationBarComponent, AuthenticationCheckComponent, TextSectionComponent, InputFormComponent, TextInputComponent, SelectInputComponent, DateTimeInputComponent, CheckboxInputComponent, NavigationBarData, AuthenticationService, FirebaseApiService, InternalLinkService, SharedDataService, SelectOptions, InputError, InputField, InputForm, Validator, StyleConfigService, MarkdownParser, UtcDate, Guid, TextAreaInputComponent } from 'kleinsendelbach-website-library';
import { InternalPathKey } from '../../../../types/internal-paths';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FirebaseFunctions } from '../../../../types/firebase-functions';
import { ReportGroupId } from '../../../../types/report-group-id';
import { UserRole } from '../../../../types/user-role';
import { GameInfo } from '../../../../types/game-info';

@Component({
    selector: 'edit-reports-page',
    standalone: true,
    imports: [CommonModule, NavigationBarComponent, AuthenticationCheckComponent, TextAreaInputComponent, TextSectionComponent, InputFormComponent, TextInputComponent, SelectInputComponent, DateTimeInputComponent, CheckboxInputComponent],
    templateUrl: './edit-reports.page.html',
    styleUrl: './edit-reports.page.sass'
})
export class EditReportsPage implements OnInit, AfterViewInit, OnDestroy {

    public navigationBarData: NavigationBarData<InternalPathKey> = [
        {
            text: 'Zurück',
            alignment: 'left',
            link: 'editing/reports',
            action: null
        },
        {
            text: 'Abmelden',
            alignment: 'right',
            link: 'editing/login',
            action: async () => void this.authenticationService.logout()
        }
    ];

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
        loading: new InputError('BFV Daten werden übernommen.', 'info'),
        reportNotFound: new InputError('Das Spiel hat keinen Bericht bei BFV.')
    });

    public inputForm = new InputForm({
        groupId: new InputField<ReportGroupId>('general', [
            Validator.required('Ein zugehöiges Thema ist erforderlich.'),
            Validator.isOneOf(ReportGroupId.all, 'Das zugehörige Thema ist ungültig.')
        ]),
        message: new InputField<string>('', [Validator.required('Die Nachricht ist erfordelich.')]),
        title: new InputField<string>('', [Validator.required('Der Titel ist erfordelich.')]),
        imageUrl: new InputField<string>('', [Validator.eitherOne('Das ist kein gültiger Link.', Validator.empty(''), Validator.url(''))])
    }, {
        failed: new InputError('Der Bericht konnte nicht gespeichert werden.'),
        invalidInput: new InputError('Nicht alle Eingaben sind gültig.'),
        loading: new InputError('Der Bericht wird gespeichert.', 'info')
    });

    @ViewChild('messagePreview') public messagePreviewElement: ElementRef<HTMLElement> | null = null;

    public previousReport: (Report & { groupId: ReportGroupId }) | null = null;

    constructor(
        private readonly titleService: Title,
        private readonly authenticationService: AuthenticationService<UserRole>,
        private readonly firebaseApi: FirebaseApiService<FirebaseFunctions>,
        private readonly router: Router,
        private readonly linkService: InternalLinkService<InternalPathKey>,
        private readonly styleConfig: StyleConfigService,
        private readonly sharedData: SharedDataService<{
            editReport: {
                event: Report.Flatten,
                groupId: ReportGroupId
            }
        }>
    ) {
        const previousReport = this.sharedData.getValue('editReport');
        if (previousReport) {
            this.previousReport = {
                ... Report.concrete(previousReport.event),
                groupId: previousReport.groupId
            }
        }
        this.titleService.setTitle('Aktueller Bericht');
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
        this.inputForm.field('message').listener.add('report-message-preview', message => {
            this.updateMessagePreview(message);
        });
        if (this.previousReport) {
            this.inputForm.field('groupId').initialValue = this.previousReport.groupId;
            this.inputForm.field('title').initialValue = this.previousReport.title;
            this.inputForm.field('message').initialValue = this.previousReport.message;
            this.inputForm.field('imageUrl').initialValue = this.previousReport.imageUrl ?? '';
        }
    }

    public ngAfterViewInit() {
        this.updateMessagePreview(this.inputForm.field('message').value);
    }

    public ngOnDestroy() {
        this.inputForm.field('message').listener.remove('report-message-preview');
    }

    private updateMessagePreview(message: string) {
        if (!this.messagePreviewElement)
            return;
        while (this.messagePreviewElement.nativeElement.firstChild !== null)
            this.messagePreviewElement.nativeElement.removeChild(this.messagePreviewElement.nativeElement.firstChild);
        this.messagePreviewElement.nativeElement.style.color = this.styleConfig.css('text');
        const elements = MarkdownParser.parse(message);
        if (elements === null) {
            this.messagePreviewElement.nativeElement.style.color = this.styleConfig.css('primary');
            this.messagePreviewElement.nativeElement.append('Es gab ein Fehler bei der Nachricht.');
        } else {
            for (const element of elements)
                this.messagePreviewElement.nativeElement.append(element);
        }
    }

    public async takeBfvGame() {
        if (this.bfvGameInputForm.evaluate() === 'invalid')
            return;
        this.bfvGameInputForm.status = 'loading';
        const match = (/^(?:https:\/\/)?(?:www\.)?bfv\.de\/spiele\/(?:\S+?\/)?(?<id>\S+?)$/gu).exec(this.bfvGameInputForm.field('bfvGameLink').value);
        if (!match || !match.groups) {
            this.bfvGameInputForm.status = 'gameIdNotFound';
            return;
        }
        const gameInfo = await this.firebaseApi.function('bfvData-gameInfo').call({
            gameId: match.groups['id']
        });
        if (gameInfo.isFailure()) {
            if (gameInfo.error.code === 'not-found')
                this.bfvGameInputForm.status = 'gameNotFound';
            else
                this.bfvGameInputForm.status = 'failed';
        } else {
            if (!gameInfo.value.report) {
                this.bfvGameInputForm.status = 'reportNotFound';
                return;
            }
            const { isSg2, sgHomeAway } = GameInfo.additionalProperties(gameInfo.value);
            this.inputForm.field('groupId').initialValue = isSg2 ? 'football-adults/second-team' : 'football-adults/first-team';
            this.inputForm.field('title').initialValue = `${UtcDate.decode(gameInfo.value.date).description} | ${gameInfo.value.report.title}`;
            this.inputForm.field('message').initialValue = gameInfo.value.report.paragraphs.reduce((result1, paragraph) => `${result1 + paragraph.reduce((result2, value) => {
                if (value.link === null)
                    return result2 + value.text;
                return `${result2}[${value.text}](${value.link})`;
            }, '')}\n\n`, '').trim();
            this.inputForm.field('imageUrl').initialValue = `https://service-prod.bfv.de/export.media?action=getLogo&format=16&id=${sgHomeAway === 'home' ? gameInfo.value.awayTeam.imageId : gameInfo.value.homeTeam.imageId}`;
        }
        this.bfvGameInputForm.status = 'valid';
    }

    public async saveReport() {
        if (this.inputForm.evaluate() === 'invalid')
            return;
        this.inputForm.status = 'loading';
        const reportId = this.previousReport ? this.previousReport.id : Guid.newGuid();
        const createDate = (this.previousReport ? this.previousReport.createDate : UtcDate.now).encoded;
        const result = await this.firebaseApi.function('report-edit').call({
            editType: this.previousReport ? 'change' : 'add',
            groupId: this.inputForm.field('groupId').value,
            previousGroupId: this.previousReport ? this.previousReport.groupId : null,
            report: {
                createDate: createDate,
                imageUrl: this.inputForm.field('imageUrl').value,
                message: this.inputForm.field('message').value,
                title: this.inputForm.field('title').value
            },
            reportId: reportId.guidString
        });
        if (result.isFailure())
            this.inputForm.status = 'failed';
        else {
            await this.router.navigateByUrl(this.linkService.link('editing/reports').link);
            this.inputForm.status = 'valid';
        }
    }
}
