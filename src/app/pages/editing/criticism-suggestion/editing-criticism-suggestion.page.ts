import { AppearanceService } from 'src/app/services/appearance.service';
import { Component } from '@angular/core';
import { CriticismSuggestion } from 'src/app/modules/firebase-api/types/criticism-sugggestion';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { FetchState } from 'src/app/types/fetch-state';
import { FirebaseApiService } from 'src/app/modules/firebase-api/services/firebase-api.service';
import { StyleConfigService } from 'src/app/services/style-config.service';
import { Title } from '@angular/platform-browser';
import { TrackBy } from 'src/app/types/track-by';

@Component({
    selector: 'app-editing-criticism-suggestion',
    styleUrls: ['./editing-criticism-suggestion.page.sass'],
    templateUrl: './editing-criticism-suggestion.page.html'
})
export class EditingCriticismSuggestionPage {
    public TrackBy = TrackBy;

    public CriticismSuggestion = CriticismSuggestion;

    public criticismSuggestions: FetchState<{
        notWorkedOff: CriticismSuggestion[];
        workedOff: CriticismSuggestion[] | null;
    }> = FetchState.loading;

    public constructor(
        public readonly titleService: Title,
        public readonly deviceType: DeviceTypeService,
        public readonly styleConfig: StyleConfigService,
        public readonly appearance: AppearanceService,
        private readonly firebaseApiService: FirebaseApiService
    ) {
        this.titleService.setTitle('Kritik und Vorschläge');
    }

    public getCriticismSuggestions(workedOff: boolean = false) {
        this.firebaseApiService
            .function('criticismSuggestion')
            .function('getAll')
            .call({
                workedOff: workedOff
            })
            .then(criticismSuggestions => {
                if (!workedOff) {
                    this.criticismSuggestions = FetchState.success({
                        notWorkedOff: criticismSuggestions.map(criticismSuggestion => CriticismSuggestion.concrete(criticismSuggestion)),
                        workedOff: null
                    });
                } else if (this.criticismSuggestions.isSuccess())
                    this.criticismSuggestions.content.workedOff = criticismSuggestions.map(criticismSuggestion => CriticismSuggestion.concrete(criticismSuggestion));
            })
            .catch(reason => {
                if (!workedOff)
                    this.criticismSuggestions = FetchState.failure(reason);
            });
    }
}
