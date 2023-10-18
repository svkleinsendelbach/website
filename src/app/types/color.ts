import { Appearance } from '../services/appearance.service';

class ColorDecodingError implements Error {
    public readonly name = 'ColorDecodingError';

    public constructor(
        public readonly message: string
    ) {}
}

type HexNumber = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type HexColorComponent = `${HexNumber}${HexNumber}`;

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

    export function hex(value: string): ColorComponent {
        if (value.length === 0)
            return new ColorComponent(0);
        else if (value.length === 1)
            return new ColorComponent(16 * Number.parseInt(value, 16));
        else if (value.length === 2)
            return new ColorComponent(Number.parseInt(value, 16));
        throw new ColorDecodingError(`Invalid hex color component: ${value}`);
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
        if (!value.startsWith('#'))
            throw new ColorDecodingError('Hex color have to start with #');

        if (value.length === 4)
            return new Color(ColorComponent.hex(value[1]), ColorComponent.hex(value[2]), ColorComponent.hex(value[3]), ColorComponent.hex('FF'));
        else if (value.length === 5)
            return new Color(ColorComponent.hex(value[1]), ColorComponent.hex(value[2]), ColorComponent.hex(value[3]), ColorComponent.hex(value[4]));
        else if (value.length === 7)
            return new Color(ColorComponent.hex(value.substring(1, 3)), ColorComponent.hex(value.substring(3, 5)), ColorComponent.hex(value.substring(5, 7)), ColorComponent.hex('FF'));
        else if (value.length === 9)
            return new Color(ColorComponent.hex(value.substring(1, 3)), ColorComponent.hex(value.substring(3, 5)), ColorComponent.hex(value.substring(5, 7)), ColorComponent.hex(value.substring(7, 9)));

        throw new ColorDecodingError(`Invalid hex color: ${value}`);
    }
}

export class AppearanceColor {
    public constructor(
        private readonly lightColor: Color,
        private readonly darkColor: Color | null = null
    ) {}

    public get light(): Color {
        return this.lightColor;
    }

    public get dark(): Color {
        return this.darkColor ?? this.lightColor;
    }

    public color(appearance: Appearance): Color {
        switch (appearance) {
        case 'light':
            return this.light;
        case 'dark':
            return this.dark;
        default:
            return this.light;
        }
    }

    public css(appearance: Appearance): string {
        return this.color(appearance).css;
    }

    public withAlpha(alpha: number): AppearanceColor {
        return new AppearanceColor(this.lightColor.withAlpha(alpha), this.darkColor ? this.darkColor.withAlpha(alpha) : null);
    }
}
