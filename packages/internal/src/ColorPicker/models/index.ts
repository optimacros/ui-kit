type HexColor = string;

//type RgbName = 'r' | 'g' | 'b';

//type RgbColor = Record<RgbName, number>;

export interface ColorFormat {
    hex: HexColor | 'transparent';
    // rgb: RgbColor;
    // hsl: any;
    // hsv: any;
    // oldHue: number;
    // source: string;
}
