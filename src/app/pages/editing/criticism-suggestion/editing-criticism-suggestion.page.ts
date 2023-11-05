import { AppearanceService } from 'src/app/services/appearance.service';
import { Component } from '@angular/core';
import { CriticismSuggestion } from 'src/app/types/criticism-sugggestion';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { TrackBy } from 'src/app/types/track-by';
import { Result } from 'src/app/types/result';
import { FirebaseFunctionResult } from 'src/app/modules/firebase-api/types/firebase-function-result';

@Component({
    selector: 'app-editing-criticism-suggestion',
    styleUrls: ['./editing-criticism-suggestion.page.sass'],
    templateUrl: './editing-criticism-suggestion.page.html'
})
export class EditingCriticismSuggestionPage {
    public TrackBy = TrackBy;

    public CriticismSuggestion = CriticismSuggestion;

    public fetchedCriticismSuggestions: FirebaseFunctionResult<{
        active: CriticismSuggestion[];
        workedOff: CriticismSuggestion[] | null;
    }> | null = null;

    public expandedCriticismSuggestionId: string | null = null;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        public readonly appearance: AppearanceService,
        private readonly firebaseApiService: FirebaseApiService
    ) {
        this.titleService.setTitle('Kritik und Vorschläge');
    }

    public async getCriticismSuggestions(state: 'active' | 'workedOff' = 'active') {
        const fetchedCriticismSuggestions = await this.firebaseApiService.function('criticismSuggestion-getAll').call({
            workedOff: state === 'workedOff'
        });
        if (fetchedCriticismSuggestions.isFailure())
            this.fetchedCriticismSuggestions = fetchedCriticismSuggestions;
        else if (state === 'active') {
            this.fetchedCriticismSuggestions = Result.success({
                active: fetchedCriticismSuggestions.value,
                workedOff: this.fetchedCriticismSuggestions !== null && this.fetchedCriticismSuggestions.isSuccess() ? this.fetchedCriticismSuggestions.value.workedOff : null
            });
        } else if (this.fetchedCriticismSuggestions !== null && this.fetchedCriticismSuggestions.isSuccess()) {
            this.fetchedCriticismSuggestions = Result.success({
                active: this.fetchedCriticismSuggestions.value.active,
                workedOff: fetchedCriticismSuggestions.value
            });
        }
    }

    public async toggleState(criticismSuggestion: CriticismSuggestion) {
        if (!this.fetchedCriticismSuggestions || this.fetchedCriticismSuggestions.isFailure())
            return;
        if (criticismSuggestion.workedOff) {
            this.fetchedCriticismSuggestions = Result.success({
                active: [...this.fetchedCriticismSuggestions.value.active, { ...criticismSuggestion, workedOff: false }],
                workedOff: this.fetchedCriticismSuggestions.value.workedOff
                    ? this.fetchedCriticismSuggestions.value.workedOff.filter(_criticismSuggestion => _criticismSuggestion.id !== criticismSuggestion.id)
                    : null
            });
        } else {
            this.fetchedCriticismSuggestions = Result.success({
                active: this.fetchedCriticismSuggestions.value.active.filter(_criticismSuggestion => _criticismSuggestion.id !== criticismSuggestion.id),
                workedOff: this.fetchedCriticismSuggestions.value.workedOff
                    ? [...this.fetchedCriticismSuggestions.value.workedOff, { ...criticismSuggestion, workedOff: true }]
                    : null
            });
        }
        await this.firebaseApiService.function('criticismSuggestion-edit').call({
            criticismSuggestion: {
                ...CriticismSuggestion.flatten(criticismSuggestion),
                workedOff: !criticismSuggestion.workedOff
            },
            criticismSuggestionId: criticismSuggestion.id.guidString,
            editType: 'change'
        });
    }

    public expand(criticismSuggestion: CriticismSuggestion) {
        if (this.expandedCriticismSuggestionId === criticismSuggestion.id.guidString)
            this.expandedCriticismSuggestionId = null;
        else
            this.expandedCriticismSuggestionId = criticismSuggestion.id.guidString;
    }
}
