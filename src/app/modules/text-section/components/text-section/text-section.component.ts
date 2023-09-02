import { Component, Input } from '@angular/core';
import { StyleConfigService } from '../../../../services/style-config.service';

@Component({
    selector: 'text-section',
    templateUrl: './text-section.component.html',
    styleUrls: ['./text-section.component.sass']
})
export class TextSectionComponent {

    @Input() public title?: string;

    public constructor(
        public readonly styleConfig: StyleConfigService
    ) {}

    public get titleId(): string | null {
        if (this.title === undefined)
            return null;
        const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-#';
        const replaceCharacters = { 'Ä': 'AE', 'Ö': 'OE', 'Ü': 'UE', 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss' };
        let titleId = '';
        function addCharacter(character: string) {
            if (character === '-' && (titleId === '' || titleId.endsWith('-')))
                return;
            titleId += character.toLowerCase();
        }
        for (const character of this.title) {
            if (validCharacters.includes(character)) {
                addCharacter(character);
            } else if (character in replaceCharacters) {
                addCharacter(replaceCharacters[character as keyof typeof replaceCharacters]);
            } else {
                addCharacter('-');
            }
        }
        if (titleId.endsWith('-'))
            titleId = titleId.slice(0, titleId.length - 1);
        return titleId;
    }
}
