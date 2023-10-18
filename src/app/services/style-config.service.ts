import { Appearance, AppearanceService } from './appearance.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Color, AppearanceColor } from 'src/app/types/color';

@Injectable({
    providedIn: 'root'
})
export class StyleConfigService implements OnDestroy {
    public static readonly config = {
        primary: new AppearanceColor(Color.hex('#C90024'), Color.hex('#C4354F')),
        accent: new AppearanceColor(Color.hex('#FFD93D'), Color.hex('#F2BE22')),
        background: new AppearanceColor(Color.hex('#FFFFFF'), Color.hex('#24252A')),
        secondaryBackground: new AppearanceColor(Color.hex('#FFFFFF'), Color.hex('#3C4A57')),
        hoveredBackground: new AppearanceColor(Color.hex('#E0E0E0'), Color.hex('#44454A')),
        shadow: new AppearanceColor(Color.hex('#80808080'), Color.hex('#80808080')),
        text: new AppearanceColor(Color.hex('#24252A'), Color.hex('#C8D6E5')),
        secondaryText: new AppearanceColor(Color.hex('#868E90'), Color.hex('#868E90')),
        formStatusSuccess: new AppearanceColor(Color.hex('#54B435'), Color.hex('#B6E2A1')),
        formStatusError: new AppearanceColor(Color.hex('#CE3A0F'), Color.hex('#EB4511')),
        formStatusInfo: new AppearanceColor(Color.hex('#868E90'), Color.hex('#868E90')),
        pageBackground: new AppearanceColor(Color.hex('#F0F0F0'), Color.hex('#2C3A47'))
    } satisfies Record<string, AppearanceColor>;

    public constructor(
        private readonly appearance: AppearanceService
    ) {
        this.setConfig(this.appearance.current);
        this.appearance.listeners.add('style-config', newAppearance => {
            this.setConfig(newAppearance);
        });
    }

    public ngOnDestroy(): void {
        this.appearance.listeners.remove('style-config');
    }

    public css<Key extends keyof typeof StyleConfigService.config>(key: Key): string {
        return StyleConfigService.config[key].color(this.appearance.current).css;
    }

    private setConfig(appearance: Appearance) {
        document.body.style.backgroundColor = StyleConfigService.config.pageBackground.css(appearance);
        const styleElement = document.getElementById('dynamic-color-style');
        if (!styleElement)
            return;
        const cssConfigVariables = Object.entries(StyleConfigService.config).map(([key, color]) => `\t--${key}: ${color.color(appearance).css};`);
        styleElement.innerHTML = `:root {\n${cssConfigVariables.join('\n')}\n}`;
    }
}
