import { Appearance, AppearanceService } from './appearance.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Style } from 'src/app/types/style';

@Injectable({
    providedIn: 'root'
})
export class StyleConfigService implements OnDestroy {
    public static readonly config = {
        primary: new Style.AppearanceColor(Style.Color.hex('#C90024'), Style.Color.hex('#C4354F')),
        accent: new Style.AppearanceColor(Style.Color.hex('#FFD93D'), Style.Color.hex('#F2BE22')),
        background: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#24252A')),
        secondaryBackground: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#3C4A57')),
        hoveredBackground: new Style.AppearanceColor(Style.Color.hex('#E0E0E0'), Style.Color.hex('#44454A')),
        shadow: new Style.AppearanceColor(Style.Color.hex('#80808080'), Style.Color.hex('#80808080')),
        text: new Style.AppearanceColor(Style.Color.hex('#24252A'), Style.Color.hex('#C8D6E5')),
        secondaryText: new Style.AppearanceColor(Style.Color.hex('#868E90'), Style.Color.hex('#868E90')),
        formStatusSuccess: new Style.AppearanceColor(Style.Color.hex('#54B435'), Style.Color.hex('#B6E2A1')),
        formStatusError: new Style.AppearanceColor(Style.Color.hex('#CE3A0F'), Style.Color.hex('#EB4511')),
        formStatusInfo: new Style.AppearanceColor(Style.Color.hex('#868E90'), Style.Color.hex('#868E90')),
        pageBackground: new Style.AppearanceColor(Style.Color.hex('#F0F0F0'), Style.Color.hex('#2C3A47'))
    } satisfies Record<string, Style.AppearanceColor>;

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
