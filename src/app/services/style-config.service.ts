import { Injectable } from '@angular/core';
import { Style } from 'src/app/types/style';
import { AppearanceService } from './appearance.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StyleConfigService {
    private styleConfig = StyleConfigService.StyleConfig.defaultConfig;

    public constructor(
        private readonly appearance: AppearanceService,
        private readonly httpClient: HttpClient
    ) {}

    public setConfig() {
        void this.parseConfig();
    }

    public setStyle<Key extends keyof StyleConfigService.StyleConfig>(key: Key, style: StyleConfigService.StyleConfig[Key]) {
        this.styleConfig[key] = style;
    }

    public style<Key extends keyof StyleConfigService.StyleConfig>(key: Key): StyleConfigService.StyleConfig[Key] {
        return this.styleConfig[key];
    }

    public color<Key extends keyof StyleConfigService.StyleConfig>(key: Key): Style.Color {
        return this.style(key).color(this.appearance.current);
    }

    public css<Key extends keyof StyleConfigService.StyleConfig>(key: Key): string {
        return this.color(key).css;
    }

    private async parseConfig() {
        const sassContent = await lastValueFrom(this.httpClient.get('./sass/color.sass', { responseType: 'text' }));
        function getColorsMap(name: string): Record<string, string> {
            const colorsMap = new RegExp(`^\\$${name}:\\s*\\((?<colorsMap>[\\S\\s]*?)\\)$`, 'gm').exec(sassContent)?.groups?.['colorsMap'];
            return colorsMap?.split(/,\s*/g).reduce((styleConfig, value) => {
                const groups = /^'(?<name>\S+?)':\s*(?<color>#[0-9A-F]{6})$/g.exec(value)?.groups;
                if (groups !== undefined && 'name' in groups && 'color' in groups)
                    styleConfig[`${groups['name']}Color`] = groups['color'];
                return styleConfig;
            }, {} as Record<string, string>) ?? {};
        }
        const lightColors = getColorsMap('light-colors-map');
        const darkColors = getColorsMap('dark-colors-map');
        for (const key of Object.keys(this.styleConfig) as (keyof typeof this.styleConfig)[]) {
            if (!(key in lightColors) || !(key in darkColors))
                throw new Error(`Couldn't get ${key} for style color.`);
            this.styleConfig[key] = new Style.AppearanceColor(Style.Color.hex(lightColors[key]), Style.Color.hex(darkColors[key]));
        }
    }
}

export namespace StyleConfigService {
    export interface StyleConfig {
        primaryColor: Style.AppearanceColor;
        accentColor: Style.AppearanceColor;
        backgroundColor: Style.AppearanceColor;
        secondaryBackgroundColor: Style.AppearanceColor;
        hoveredBackgroundColor: Style.AppearanceColor;
        textColor: Style.AppearanceColor;
        secondaryTextColor: Style.AppearanceColor;
        formSuccessStatusColor: Style.AppearanceColor;
        formErrorStatusColor: Style.AppearanceColor;
        formInfoStatusColor: Style.AppearanceColor;
    }

    export namespace StyleConfig {
        export const defaultConfig: StyleConfig = {
            primaryColor: new Style.AppearanceColor(Style.Color.hex('#C90024'), Style.Color.hex('#C4354F')),
            accentColor: new Style.AppearanceColor(Style.Color.hex('#FFD93D'), Style.Color.hex('#F2BE22')),
            backgroundColor: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#24252A')),
            secondaryBackgroundColor: new Style.AppearanceColor(Style.Color.hex('#FFFFFF'), Style.Color.hex('#3C4A57')),
            hoveredBackgroundColor: new Style.AppearanceColor(Style.Color.hex('#E0E0E0'), Style.Color.hex('#44454A')),
            textColor: new Style.AppearanceColor(Style.Color.hex('#24252A'), Style.Color.hex('#C8D6E5')),
            secondaryTextColor: new Style.AppearanceColor(Style.Color.hex('#868E90'), Style.Color.hex('#868E90')),
            formSuccessStatusColor: new Style.AppearanceColor(Style.Color.hex('#54B435'), Style.Color.hex('#B6E2A1')),
            formErrorStatusColor: new Style.AppearanceColor(Style.Color.hex('#CE3A0F'), Style.Color.hex('#EB4511')),
            formInfoStatusColor: new Style.AppearanceColor(Style.Color.hex('#FFBF00'), Style.Color.hex('#FFE15D'))
        };
    }
}
