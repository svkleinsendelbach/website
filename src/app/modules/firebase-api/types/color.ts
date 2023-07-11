import { type ByteRepresentation, HexByte } from './hex-byte';

export type Color<Byte extends ByteRepresentation> = {
    red: Byte;
    green: Byte;
    blue: Byte;
};

export namespace Color {
    export const black: Color<HexByte> = {
        red: '00',
        green: '00',
        blue: '00'
    };

    export function toByte(value: Color<HexByte>): Color<number> {
        return {
            red: HexByte.toByte(value.red),
            green: HexByte.toByte(value.green),
            blue: HexByte.toByte(value.blue)
        };
    }

    export function toPercentage(value: Color<HexByte>): Color<number> {
        return {
            red: HexByte.toPercentage(value.red),
            green: HexByte.toPercentage(value.green),
            blue: HexByte.toPercentage(value.blue)
        };
    }

    export function fromByte(value: Color<number>): Color<HexByte> {
        return {
            red: HexByte.fromByte(value.red),
            green: HexByte.fromByte(value.green),
            blue: HexByte.fromByte(value.blue)
        };
    }

    export function fromPercentage(value: Color<number>): Color<HexByte> {
        return {
            red: HexByte.fromPercentage(value.red),
            green: HexByte.fromPercentage(value.green),
            blue: HexByte.fromPercentage(value.blue)
        };
    }

    export function flatten(color: Color<HexByte>): string {
        return '#' + color.red + color.green + color.blue;
    }

    export function concrete(color: string): Color<HexByte> {
        if (color.length !== 7 || color[0] !== '#')
            return Color.black;
        const red = color.slice(1, 3);
        const green = color.slice(3, 5);
        const blue = color.slice(5, 7);
        return {
            red: HexByte.typeGuard(red) ? red : '00',
            green: HexByte.typeGuard(green) ? green : '00',
            blue: HexByte.typeGuard(blue) ? blue : '00'
        };
    }
}
