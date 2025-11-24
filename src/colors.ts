import p5 from "p5";

export type ColorOption = { id: number, value: p5.Color }

export let COLORS: {
    lightGrey: ColorOption;
    yellow: ColorOption;
    green: ColorOption;
    blue: ColorOption;
    orange: ColorOption;
    purple: ColorOption;
    red: ColorOption;
    cyan: ColorOption;
    clay: ColorOption;
    pink: ColorOption;
    grey: ColorOption;
};

// Call this once in setup()
export function initColors(p: p5) {    
    COLORS = {
        lightGrey : { id: 1, value: p.color(240) },
        yellow : { id: 2, value: p.color(255, 210, 100) },
        green : { id: 3, value: p.color(0, 255, 0) },
        blue : { id: 4, value: p.color(0, 120, 255) },
        orange : { id: 5, value: p.color(150, 0, 200) },
        purple : { id: 6, value: p.color(200, 0, 0) },
        red : { id: 7, value: p.color(0, 255, 255) },
        cyan : { id: 8, value: p.color(255, 90, 0) },
        clay : { id: 9, value: p.color(255, 170, 0) },
        pink : { id: 10, value: p.color(220, 80, 150) },
        grey : { id: 11, value: p.color(80) },
    }
}

export function getColorValueById(id: number): p5.Color {
    const color = Object.values(COLORS).find((c) => c.id === id)?.value;
    if (color) return color;
    return COLORS.lightGrey.value;
}