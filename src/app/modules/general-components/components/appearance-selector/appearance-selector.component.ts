import { Appearance, AppearanceService } from 'src/app/services/appearance.service';
import { Component } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
    selector: 'app-appearance-selector',
    styleUrls: ['./appearance-selector.component.sass'],
    templateUrl: './appearance-selector.component.html'
})
export class AppearanceSelectorComponent {
    public constructor(
        public readonly appearanceService: AppearanceService
    ) {}

    public get current(): Appearance | 'system' {
        return this.appearanceService.currentConfig;
    }

    public get icon(): IconProp {
        if (this.appearanceService.currentConfig === 'light')
            return 'sun';
        if (this.appearanceService.currentConfig === 'dark')
            return 'moon';
        return 'circle-half-stroke';
    }

    public setAppearance(appearance: Appearance | 'system') {
        this.appearanceService.setAppearance(appearance);
    }

    public nextAppearance() {
        if (this.appearanceService.currentConfig === 'light')
            this.setAppearance('system');
        else if (this.appearanceService.currentConfig === 'dark')
            this.setAppearance('light');
        else
            this.setAppearance('dark');
    }
}
