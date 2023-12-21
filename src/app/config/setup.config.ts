import { AppearanceColor, Color, StyleColor } from "kleinsendelbach-website-library";

export const baseUrl = 'https://svkleinsendelbach-website.web.app';

export const colorConfig: Record<StyleColor, AppearanceColor> = {
    primary: new AppearanceColor(Color.hex('#C90024'), Color.hex('#C4354F')),
    accent: new AppearanceColor(Color.hex('#FFD93D'), Color.hex('#F2BE22')),
    background: new AppearanceColor(Color.hex('#FFFFFF'), Color.hex('#24252A')),
    hoveredBackground: new AppearanceColor(Color.hex('#E0E0E0'), Color.hex('#44454A')),
    shadow: new AppearanceColor(Color.hex('#80808080'), Color.hex('#80808080')),
    text: new AppearanceColor(Color.hex('#24252A'), Color.hex('#C8D6E5')),
    secondaryText: new AppearanceColor(Color.hex('#868E90'), Color.hex('#868E90')),
    formStatusSuccess: new AppearanceColor(Color.hex('#54B435'), Color.hex('#B6E2A1')),
    formStatusError: new AppearanceColor(Color.hex('#CE3A0F'), Color.hex('#EB4511')),
    formStatusInfo: new AppearanceColor(Color.hex('#868E90'), Color.hex('#868E90')),
    pageBackground: new AppearanceColor(Color.hex('#F0F0F0'), Color.hex('#2C3A47'))
}
