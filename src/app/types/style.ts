import { Appearance } from '../services/appearance.service';

export namespace Style {
    export class DecodingError implements Error {
        public readonly name = 'StyleDecodingError';

        public constructor(
            public readonly message: string
        ) {}
    }

    export type HexColorComponent =
        '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '0A' | '0B' | '0C' | '0D' | '0E' | '0F' |
        '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '1A' | '1B' | '1C' | '1D' | '1E' | '1F' |
        '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '2A' | '2B' | '2C' | '2D' | '2E' | '2F' |
        '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '3A' | '3B' | '3C' | '3D' | '3E' | '3F' |
        '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '4A' | '4B' | '4C' | '4D' | '4E' | '4F' |
        '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59' | '5A' | '5B' | '5C' | '5D' | '5E' | '5F' |
        '60' | '61' | '62' | '63' | '64' | '65' | '66' | '67' | '68' | '69' | '6A' | '6B' | '6C' | '6D' | '6E' | '6F' |
        '70' | '71' | '72' | '73' | '74' | '75' | '76' | '77' | '78' | '79' | '7A' | '7B' | '7C' | '7D' | '7E' | '7F' |
        '80' | '81' | '82' | '83' | '84' | '85' | '86' | '87' | '88' | '89' | '8A' | '8B' | '8C' | '8D' | '8E' | '8F' |
        '90' | '91' | '92' | '93' | '94' | '95' | '96' | '97' | '98' | '99' | '9A' | '9B' | '9C' | '9D' | '9E' | '9F' |
        'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'AA' | 'AB' | 'AC' | 'AD' | 'AE' | 'AF' |
        'B0' | 'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'B6' | 'B7' | 'B8' | 'B9' | 'BA' | 'BB' | 'BC' | 'BD' | 'BE' | 'BF' |
        'C0' | 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6' | 'C7' | 'C8' | 'C9' | 'CA' | 'CB' | 'CC' | 'CD' | 'CE' | 'CF' |
        'D0' | 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6' | 'D7' | 'D8' | 'D9' | 'DA' | 'DB' | 'DC' | 'DD' | 'DE' | 'DF' |
        'E0' | 'E1' | 'E2' | 'E3' | 'E4' | 'E5' | 'E6' | 'E7' | 'E8' | 'E9' | 'EA' | 'EB' | 'EC' | 'ED' | 'EE' | 'EF' |
        'F0' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'FA' | 'FB' | 'FC' | 'FD' | 'FE' | 'FF';

    export class ColorComponent {
        public readonly value: number;

        public constructor(value: number) {
            this.value = Math.max(0, Math.min(Math.round(value), 255));
        }
    }

    export namespace ColorComponent {
        export function byte(value: number): ColorComponent {
            return new ColorComponent(value);
        }

        export function percent(value: number): ColorComponent {
            return new ColorComponent(value * 255);
        }

        export function hex(value: string): ColorComponent;
        export function hex(value: HexColorComponent): ColorComponent;
        export function hex(value: string): ColorComponent {
            if (value.length === 0) {
                return new ColorComponent(0);
            } else if (value.length === 1) {
                return new ColorComponent(16 * Number.parseInt(value, 16));
            } else if (value.length === 2) {
                return new ColorComponent(Number.parseInt(value, 16));
            }
            throw new DecodingError(`Invalid hex color component: ${value}`);
        }
    }

    export class Color {
        public constructor(
            private readonly red: ColorComponent,
            private readonly green: ColorComponent,
            private readonly blue: ColorComponent,
            private readonly alpha: ColorComponent
        ) {}

        public get css(): string {
            return `rgba(${this.red.value}, ${this.green.value}, ${this.blue.value}, ${this.alpha.value / 255})`;
        }

        public withAlpha(alpha: number): Color {
            return new Color(this.red, this.green, this.blue, ColorComponent.percent(alpha));
        }
    }

    export namespace Color {
        export function hex(value: string): Color {
            if (value[0] !== '#') {
                throw new DecodingError('Hex color have to start with #');
            }
            if (value.length === 4) {
                return new Color(ColorComponent.hex(value[1]), ColorComponent.hex(value[2]), ColorComponent.hex(value[3]), ColorComponent.hex('FF'));
            } else if (value.length === 5) {
                return new Color(ColorComponent.hex(value[1]), ColorComponent.hex(value[2]), ColorComponent.hex(value[3]), ColorComponent.hex(value[4]));
            } else if (value.length === 7) {
                return new Color(ColorComponent.hex(value.substring(1, 3)), ColorComponent.hex(value.substring(3, 5)), ColorComponent.hex(value.substring(5, 7)), ColorComponent.hex('FF'));
            } else if (value.length === 9) {
                return new Color(ColorComponent.hex(value.substring(1, 3)), ColorComponent.hex(value.substring(3, 5)), ColorComponent.hex(value.substring(5, 7)), ColorComponent.hex(value.substring(7, 9)));
            }
            throw new DecodingError(`Invalid hex color: ${value}`);
        }
    }

    export class AppearanceColor {
        public constructor(
            private readonly lightColor: Color,
            private readonly darkColor?: Color
        ) {}

        public get light(): Color {
            return this.lightColor;
        }

        public get dark(): Color {
            return this.darkColor ?? this.lightColor;
        }

        public color(appearance: Appearance): Color {
            switch (appearance) {
            case 'light': return this.light;
            case 'dark': return this.dark;
            }
        }

        public css(appearance: Appearance): string {
            return this.color(appearance).css;
        }

        public withAlpha(alpha: number): AppearanceColor {
            return new AppearanceColor(this.lightColor.withAlpha(alpha), this.darkColor?.withAlpha(alpha));
        }
    }
}
