import { Appearance, AppearanceService } from 'src/app/services/appearance.service';
import { IconDefinition, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { Component } from '@angular/core';

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

    public get icon(): IconDefinition {
        if (this.appearanceService.currentConfig === 'light')
            return faSun;
        if (this.appearanceService.currentConfig === 'dark')
            return faMoon;
        return faCircleHalfStroke;
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
