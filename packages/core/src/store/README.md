# UiKit Provider Configuration

The UiKit Provider is a configuration wrapper that manages global settings for your UI components. This document outlines the available configuration options and their usage.

## Configuration Interface

### Icons Configuration

```typescript
{
  iconsSrc: string;
}
```

The `iconsSrc` property specifies the source path for the SVG sprite that contains your icon definitions. This must be a valid path to a `.svg` file.

**Requirements:**
- Must be a sprite SVG file
- File extension must be `.svg`
- Path should be relative to your project root

**Example:**
```typescript
{
  iconsSrc: '/assets/icons-sprite.svg'
}
```

### Styles Configuration

```typescript
{
  styles: {
    root: string;
    theme: string;
    custom?: string;
  }
}
```

The `styles` object allows you to configure different layers of styling for your UI components.

#### `root`
Contains design tokens variables as a CSS string. These are your global design tokens that define your design system's foundations.

**Example:**
```css
/* Example root tokens */
:root {
  --color-pallete-purple-900: #4a148c;
  --color-pallete-purple-500: #9c27b0;
  --color-pallete-purple-800: #6a1b9a;
  --color-pallete-purple-700: #7b1fa2;
  --color-pallete-purple-600: #8e24aa;
  --color-pallete-purple-400: #ab47bc;
  --color-pallete-purple-300: #ba68c8;
  --color-pallete-purple-200: #ce93d8;
  --color-pallete-purple-100: #e1bee7;
  --color-pallete-red-900: #b71c1c;
  --color-pallete-red-800: #c62828;
  --color-pallete-red-700: #d32f2f;
  --color-pallete-red-600: #e53935;
  --color-pallete-red-500: #f44336;
  --color-pallete-red-400: #ef5350;
  --color-pallete-red-300: #e57373;
  --color-pallete-red-200: #ef9a9a;
  --color-pallete-red-100: #ffcdd2;
  --color-pallete-pink-900: #880e4f;
  --color-pallete-pink-800: #ad1457;
  --color-pallete-pink-700: #c2185b;
  --color-pallete-pink-600: #d81b60;
  --color-pallete-pink-500: #e91e63;
  --color-pallete-pink-400: #ec407a;
  --color-pallete-pink-300: #f06292;
  --color-pallete-pink-200: #f48fb1;
  --color-pallete-pink-100: #f8bbd0;
  --color-pallete-indigo-900: #1a237e;
  --color-pallete-indigo-800: #283593;
  --color-pallete-indigo-700: #303f9f;
  --color-pallete-indigo-600: #3949ab;
  --color-pallete-indigo-500: #394899;
  --color-pallete-indigo-400: #5c6bc0;
  --color-pallete-indigo-300: #7986cb;
  --color-pallete-indigo-200: #9fa8da;
  --color-pallete-indigo-100: #c5cae9;
  --color-pallete-blue-900: #0d47a1;
  --color-pallete-blue-800: #1565c0;
  --color-pallete-blue-700: #1976d2;
  --color-pallete-blue-600: #1e88e5;
  --color-pallete-blue-500: #2196f3;
  --color-pallete-blue-400: #42a5f5;
  --color-pallete-blue-300: #64b5f6;
  --color-pallete-blue-200: #90caf9;
  --color-pallete-blue-100: #bbdefb;
  --color-pallete-cyan-900: #006064;
  --color-pallete-cyan-800: #00838f;
  --color-pallete-cyan-700: #0097a7;
  --color-pallete-cyan-600: #00acc1;
  --color-pallete-cyan-500: #00bcd4;
  --color-pallete-cyan-400: #26c6da;
  --color-pallete-cyan-300: #4dd0e1;
  --color-pallete-cyan-200: #80deea;
  --color-pallete-cyan-100: #b2ebf2;
  --color-pallete-green-900: #1b5e20;
  --color-pallete-green-800: #2e7d32;
  --color-pallete-green-700: #388e3c;
  --color-pallete-green-600: #43a047;
  --color-pallete-green-500: #4caf50;
  --color-pallete-green-400: #66bb6a;
  --color-pallete-green-300: #81c784;
  --color-pallete-green-200: #a5d6a7;
  --color-pallete-green-100: #c8e6c9;
  --color-pallete-green-50: #e8f5e9;
  --color-pallete-lightgreen-900: #33691e;
  --color-pallete-lightgreen-800: #558b2f;
  --color-pallete-lightgreen-700: #689f38;
  --color-pallete-lightgreen-600: #7cb342;
  --color-pallete-lightgreen-500: #8bc34a;
  --color-pallete-lightgreen-400: #9ccc65;
  --color-pallete-lightgreen-300: #aed581;
  --color-pallete-lightgreen-200: #c5e1a5;
  --color-pallete-lightgreen-100: #dcedc8;
  --color-pallete-lightgreen-50: #f1f8f6;
  --color-pallete-lime-900: #827717;
  --color-pallete-lime-800: #9e9d24;
  --color-pallete-lime-700: #afb42b;
  --color-pallete-lime-600: #c0ca33;
  --color-pallete-lime-500: #cddc39;
  --color-pallete-lime-400: #d4e157;
  --color-pallete-lime-300: #dce775;
  --color-pallete-lime-200: #e6ee9c;
  --color-pallete-lime-100: #f0f4c3;
  --color-pallete-lime-50: #f9fbe7;
  --color-pallete-yellow-900: #f57f17;
  --color-pallete-yellow-800: #f9a825;
  --color-pallete-yellow-700: #fbc02d;
  --color-pallete-yellow-600: #fdd835;
  --color-pallete-yellow-500: #ffeb3b;
  --color-pallete-yellow-400: #ffee58;
  --color-pallete-yellow-300: #fff176;
  --color-pallete-yellow-200: #fff59d;
  --color-pallete-yellow-100: #fff9c4;
  --color-pallete-yellow-50: #fffde7;
  --color-pallete-amber-900: #ff6f00;
  --color-pallete-amber-800: #ff8f00;
  --color-pallete-amber-700: #ffa000;
  --color-pallete-amber-600: #ffb300;
  --color-pallete-amber-500: #ffc107;
  --color-pallete-amber-400: #ffca28;
  --color-pallete-amber-300: #ffd54f;
  --color-pallete-amber-200: #ffe082;
  --color-pallete-amber-100: #ffecb3;
  --color-pallete-amber-50: #fff8e1;
  --color-pallete-orange-900: #e65100;
  --color-pallete-orange-800: #ef6c00;
  --color-pallete-orange-700: #f57c00;
  --color-pallete-orange-600: #fb8c00;
  --color-pallete-orange-500: #ff9800;
  --color-pallete-orange-400: #ffa726;
  --color-pallete-orange-300: #ffb74d;
  --color-pallete-orange-200: #ffcc80;
  --color-pallete-orange-100: #ffe0b2;
  --color-pallete-orange-50: #fff3e0;
  --color-pallete-deeporange-900: #bf360c;
  --color-pallete-deeporange-800: #d84315;
  --color-pallete-deeporange-700: #e64a19;
  --color-pallete-deeporange-600: #f4511e;
  --color-pallete-deeporange-500: #ff5722;
  --color-pallete-deeporange-400: #ff7043;
  --color-pallete-deeporange-300: #ff8a65;
  --color-pallete-deeporange-200: #ffab91;
  --color-pallete-deeporange-100: #ffccbc;
  --color-pallete-deeporange-50: #fbe9e7;
  --color-pallete-brown-900: #3e2723;
  --color-pallete-brown-800: #4e342e;
  --color-pallete-brown-700: #5d4037;
  --color-pallete-brown-600: #6d4c41;
  --color-pallete-brown-500: #795548;
  --color-pallete-brown-400: #8d6e63;
  --color-pallete-brown-300: #a1887f;
  --color-pallete-brown-200: #bcaaa4;
  --color-pallete-brown-100: #d7ccc8;
  --color-pallete-brown-50: #efebe9;
  --color-pallete-gray-900: #212121;
  --color-pallete-gray-800: #424242;
  --color-pallete-gray-700: #616161;
  --color-pallete-gray-600: #757575;
  --color-pallete-gray-500: #9e9e9e;
  --color-pallete-gray-400: #bdbdbd;
  --color-pallete-gray-300: #e0e0e0;
  --color-pallete-gray-200: #eeeeee;
  --color-pallete-gray-100: #f5f5f5;
  --color-pallete-gray-50: #fafafa;
  --color-pallete-bluegray-900: #37474f;
  --color-pallete-bluegray-800: #455a64;
  --color-pallete-bluegray-700: #546e7a;
  --color-pallete-bluegray-600: #607d8b;
  --color-pallete-bluegray-500: #6f8f9e;
  --color-pallete-bluegray-400: #78909c;
  --color-pallete-bluegray-300: #90a4ae;
  --color-pallete-bluegray-200: #b0bec5;
  --color-pallete-bluegray-100: #cfd8dc;
  --color-pallete-bluegray-50: #eceff1;
  --color-pallete-purple-50: #f3e5f5;
  --color-pallete-red-50: #ffebee;
  --color-pallete-pink-50: #fce4ec;
  --color-pallete-deeppurple-900: #311b92;
  --color-pallete-deeppurple-800: #4527a0;
  --color-pallete-deeppurple-700: #512da8;
  --color-pallete-deeppurple-600: #5e35b1;
  --color-pallete-deeppurple-500: #673ab7;
  --color-pallete-deeppurple-400: #7e57c2;
  --color-pallete-deeppurple-300: #9575cd;
  --color-pallete-deeppurple-200: #b39ddb;
  --color-pallete-deeppurple-100: #d1c4e9;
  --color-pallete-deeppurple-50: #ede7f6;
  --color-pallete-indigo-50: #e8eaf6;
  --color-pallete-blue-50: #e3f2fd;
  --color-pallete-lightblue-900: #01579b;
  --color-pallete-lightblue-800: #0277bd;
  --color-pallete-lightblue-700: #0288d1;
  --color-pallete-lightblue-600: #039be5;
  --color-pallete-lightblue-500: #03a9f4;
  --color-pallete-lightblue-400: #29b6f6;
  --color-pallete-lightblue-300: #4fc3f7;
  --color-pallete-lightblue-200: #81d4fa;
  --color-pallete-lightblue-100: #b3e5fc;
  --color-pallete-lightblue-50: #e1f5fe;
  --color-pallete-cyan-50: #e0f7fa;
  --color-pallete-teal-900: #004d40;
  --color-pallete-teal-800: #00695c;
  --color-pallete-teal-700: #00796b;
  --color-pallete-teal-600: #00897b;
  --color-pallete-teal-500: #009688;
  --color-pallete-teal-400: #26a69a;
  --color-pallete-teal-300: #4db6ac;
  --color-pallete-teal-200: #80cbc4;
  --color-pallete-teal-100: #b2dfdb;
  --color-pallete-teal-50: #e0f2f1;
  --spacing-px: 0.0625rem;
  --spacing-0-5: 0.125rem;
  --spacing-1: 0.25rem;
  --spacing-1-5: 0.375rem;
  --spacing-2: 0.5rem;
  --spacing-2-5: 0.625rem;
  --spacing-3: 0.75rem;
  --spacing-3-5: 0.875rem;
  --spacing-4: 1rem;
  --spacing-4-5: 1.125rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-7: 1.75rem;
  --spacing-8: 2rem;
  --spacing-9: 2.25rem;
  --spacing-10: 2.5rem;
  --spacing-11: 2.75rem;
  --spacing-12: 3rem;
  --spacing-14: 3.5rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
  --spacing-28: 7rem;
  --spacing-32: 8rem;
  --spacing-36: 9rem;
  --spacing-40: 10rem;
  --spacing-44: 11rem;
  --spacing-48: 12rem;
  --spacing-52: 13rem;
  --spacing-56: 14rem;
  --spacing-60: 15rem;
  --spacing-64: 16rem;
  --spacing-72: 18rem;
  --spacing-80: 20rem;
  --spacing-96: 24rem;
  --breakpoint-sm: 40rem;
  --breakpoint-md: 48rem;
  --breakpoint-lg: 64rem;
  --breakpoint-xl: 80rem;
  --breakpoint-2xl: 96rem;
  --text-xs: 0.75rem;
  --text-xs-line--height: 1rem;
  --text-sm: 0.875rem;
  --text-sm-line--height: 1.25rem;
  --text-base: 1rem;
  --text-base-line--height: 1.5rem;
  --text-lg: 1.125rem;
  --text-lg-line--height: 1.125rem;
  --text-xl: 1.25rem;
  --text-xl-line--height: 1.75rem;
  --text-2xl: 1.5rem;
  --text-2xl-line--height: 2rem;
  --text-3xl: 1.875rem;
  --text-3xl-line--height: 2.25rem;
  --text-4xl: 2.25rem;
  --text-4xl-line--height: 2.5rem;
  --text-5xl: 3rem;
  --radius-xs: 0.125rem;
  --radius-sm: 0.1875rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-4xl: 2rem;
  --size-3xs: 16rem;
  --size-2xs: 18rem;
  --size-xs: 20rem;
  --size-sm: 24rem;
  --size-md: 28rem;
  --size-lg: 32rem;
  --size-xl: 36rem;
  --size-2xl: 42rem;
  --size-3xl: 48rem;
  --size-4xl: 56rem;
  --size-5xl: 64rem;
  --size-6xl: 72rem;
  --size-7xl: 80rem;
  --font-weight-thin: 100;
  --font-weight-extralight: 200;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;
  --z-index-highest: 300;
  --z-index-higher: 200;
  --z-index-high: 100;
  --z-index-normal: 1;
  --z-index-low: -100;
  --z-index-lower: -200;
  --blur-none: 0px;
  --blur-sm: 4px;
  --blur-base: 8px;
  --blur-md: 12px;
  --blur-lg: 16px;
  --blur-xl: 24px;
  --blur-2xl: 40px;
  --blur-3xl: 64px;
  --blur-backdrop-none: 0px;
  --blur-backdrop-sm: 4px;
  --blur-backdrop-blur: 8px;
  --blur-backdrop-md: 12px;
  --blur-backdrop-lg: 16px;
  --blur-backdrop-xl: 24px;
  --blur-backdrop-2xl: 40px;
  --blur-backdrop-3xl: 64px;
  --opacity-5: 5;
  --opacity-10: 10;
  --opacity-15: 15;
  --opacity-20: 20;
  --opacity-25: 25;
  --opacity-30: 30;
  --opacity-35: 35;
  --opacity-40: 40;
  --opacity-45: 45;
  --opacity-50: 50;
  --opacity-55: 55;
  --opacity-60: 60;
  --opacity-65: 65;
  --opacity-70: 70;
  --opacity-75: 75;
  --opacity-80: 80;
  --opacity-85: 85;
  --opacity-90: 90;
  --opacity-95: 95;
  --opacity-0: 0;
  --opacity-100: 100;
  --counter-amount: 0rem;
  --color-pallete-red-a100: #ff8a80;
  --color-pallete-red-a200: #ff5252;
  --color-pallete-red-a400: #ff1744;
  --color-pallete-red-a700: #d50000;
  --color-pallete-pink-a100: #ff80ab;
  --color-pallete-pink-a200: #ff4081;
  --color-pallete-pink-a400: #f50057;
  --color-pallete-pink-a700: #c51162;
  --color-pallete-purple-a100: #ea80fc;
  --color-pallete-purple-a200: #e040fb;
  --color-pallete-purple-a400: #d500f9;
  --color-pallete-purple-a700: #aa00ff;
  --color-pallete-deeppurple-a100: #b388ff;
  --color-pallete-deeppurple-a200: #7c4dff;
  --color-pallete-deeppurple-a400: #651fff;
  --color-pallete-deeppurple-a700: #6200ea;
  --color-pallete-indigo-a100: #8c9eff;
  --color-pallete-indigo-a200: #536dfe;
  --color-pallete-indigo-a400: #3d5afe;
  --color-pallete-indigo-a700: #304ffe;
  --color-pallete-blue-a100: #82b1ff;
  --color-pallete-blue-a200: #448aff;
  --color-pallete-blue-a400: #2979ff;
  --color-pallete-blue-a700: #2962ff;
  --color-pallete-lightblue-a100: #80d8ff;
  --color-pallete-lightblue-a200: #40c4ff;
  --color-pallete-lightblue-a400: #00b0ff;
  --color-pallete-lightblue-a700: #0091ea;
  --color-pallete-cyan-a100: #84ffff;
  --color-pallete-cyan-a200: #18ffff;
  --color-pallete-cyan-a400: #00e5ff;
  --color-pallete-cyan-a700: #00b8d4;
  --color-pallete-teal-a100: #a7ffeb;
  --color-pallete-teal-a200: #64ffda;
  --color-pallete-teal-a400: #1de9b6;
  --color-pallete-teal-a700: #00bfa5;
  --color-pallete-green-a100: #b9f6ca;
  --color-pallete-green-a200: #69f0ae;
  --color-pallete-green-a400: #00e676;
  --color-pallete-green-a700: #00c853;
  --color-pallete-lightgreen-a100: #ccff90;
  --color-pallete-lightgreen-a200: #b2ff59;
  --color-pallete-lightgreen-a400: #76ff03;
  --color-pallete-lightgreen-a700: #64dd17;
  --color-pallete-lime-a100: #f4ff81;
  --color-pallete-lime-a200: #eeff41;
  --color-pallete-lime-a400: #c6ff00;
  --color-pallete-lime-a700: #aeea00;
  --color-pallete-yellow-a100: #ffff8d;
  --color-pallete-yellow-a200: #ffff00;
  --color-pallete-yellow-a400: #ffea00;
  --color-pallete-yellow-a700: #ffd600;
  --color-pallete-amber-a100: #ffe57f;
  --color-pallete-amber-a200: #ffd740;
  --color-pallete-amber-a400: #ffc400;
  --color-pallete-amber-a700: #ffab00;
  --color-pallete-orange-a100: #ffd180;
  --color-pallete-orange-a200: #ffab40;
  --color-pallete-orange-a400: #ff9100;
  --color-pallete-orange-a700: #ff6d00;
  --color-pallete-deeporange-a100: #ff9e80;
  --color-pallete-deeporange-a200: #ff6e40;
  --color-pallete-deeporange-a400: #ff3d00;
  --color-pallete-deeporange-a700: #dd2c00;
  --color-theme-primary-500: #44b991;
  --color-theme-secondary-500: #00e2c2;
  --color-theme-tetriary-500: var(--color-pallete-teal-500);
  --color-theme-quatemary-500: #ffffff;
  --color-theme-neutral-500: var(--color-pallete-gray-500);
  --color-theme-accent-200: #a2dcc8;
  --color-theme-invert-500: #ffffff;
  --color-theme-success-500: #0fff03;
  --color-theme-error-500: #d12a2d;
  --color-theme-warning-500: #dddd00;
  --color-theme-info-500: #ffffff;
  --color-theme-neutral-on-500: var(--color-pallete-white-500);
  --color-theme-accent-on-default: #f0f6fc;
  --color-theme-error-on-default: #f0f6fc;
  --size-4xs: 12rem;
  --font: primary;
  --font-primary: Inter;
  --color-theme-primary-400: #60c4a2;
  --color-theme-primary-600: #3eb289;
  --color-theme-accent-500: #44b991;
  --color-theme-accent-700: #35aa7e;
  --color-pallete-white-500: #ffffff;
  --color-pallete-black-500: #000000;
  --color-theme-text-primary-default: var(--color-pallete-gray-900);
  --color-theme-text-secondary-default: var(--color-pallete-gray-600);
  --color-theme-background-primary-default: var(--color-theme-white);
  --color-theme-background-light-highlighted: var(--color-pallete-gray-100);
  --color-theme-disabled-500: var(--color-pallete-gray-500);
  --color-theme-disabled-100: var(--color-pallete-gray-100);
  --color-theme-disabled-200: var(--color-pallete-gray-200);
  --color-theme-disabled-400: var(--color-pallete-gray-400);
  --color-theme-neutral-700: var(--color-pallete-gray-700);
  --color-theme-tetriary-400: var(--color-pallete-teal-400);
  --color-theme-tetriary-600: var(--color-pallete-teal-600);
  --color-theme-neutral-600: var(--color-pallete-gray-600);
  --color-theme-neutral-400: var(--color-pallete-gray-400);
  --color-theme-neutral-300: var(--color-pallete-gray-300);
  --color-theme-neutral-200: var(--color-pallete-gray-200);
  --color-theme-neutral-100: var(--color-pallete-gray-100);
  --color-theme-primary-default: var(--color-theme-primary-500);
  --color-theme-primary-100: #c7eade;
  --color-theme-primary-50: #e9f7f2;
  --color-theme-primary-200: #a2dcc8;
  --color-theme-primary-300: #7cceb2;
  --color-theme-primary-700: #35aa7e;
  --color-theme-primary-800: #2da274;
  --color-theme-primary-900: #1f9362;
  --color-theme-secondary-default: var(--color-theme-secondary-500);
  --color-theme-secondary-100: #b3f6ed;
  --color-theme-secondary-200: #80f1e1;
  --color-theme-secondary-300: #4debd4;
  --color-theme-secondary-400: #26e6cb;
  --color-theme-secondary-600: #00dfbc;
  --color-theme-secondary-700: #00dab4;
  --color-theme-secondary-800: #00d6ac;
  --color-theme-secondary-900: #00cf9f;
  --color-theme-secondary-50: #e0fcf8;
  --color-theme-accent-default: var(--color-theme-accent-500);
  --color-theme-accent-100: #c7eade;
  --color-theme-accent-300: #7cceb2;
  --color-theme-accent-400: #60c4a2;
  --color-theme-accent-600: #3eb289;
  --color-theme-accent-800: #2da274;
  --color-theme-accent-900: #1f9362;
  --color-theme-accent-50: #e9f7f2;
  --color-theme-neutral-50: #ffffff;
  --color-theme-neutral-default: #ffffff;
  --color-theme-neutral-800: #ffffff;
  --color-theme-neutral-900: #ffffff;
  --color-theme-black: #010409;
  --color-theme-white: #ffffff;
  --color-theme-error-400: #de5356;
  --color-theme-error-default: var(--color-theme-error-500);
  --color-theme-warning-600: #e1c400;
  --color-theme-warning-default: var(--color-theme-warning-500);
  --color-theme-primary-on-default: #ffffff;
  --color-theme-primary-inverse-default: #ffffff;
  --color-theme-highlight-light-default: #ffffff;
  --color-theme-highlight-dark-default: #ffffff;
  --color-theme-highlight-accent-default: #ffffff;
  --color-theme-divider-dark-default: #e8e8e8;
  --color-theme-divider-light-default: #ffffff;
  --color-theme-gray-default: var(--color-theme-gray-500);
  --color-theme-transparent: #ffffff;
  --color-theme-primary-disabled-default: var(--color-theme-disabled-100);
  --color-theme-primary-disabled-on-default: var(--color-theme-disabled-400);
  --color-theme-success-default: var(--color-theme-success-500);
  --color-theme-success-on-default: #ffffff;
  --color-theme-warning-on-default: var(--color-pallete-gray-900);
  --color-theme-success-600: #20cb05;
  --color-theme-text-secondary-disabled-default: var(--color-theme-disabled-100);
  --color-theme-secondary-on-default: #ffffff;
  --color-theme-inverse-default: #ffffff;
  --color-theme-gray-50: #f0f0f0;
  --color-theme-gray-100: #d9d9d9;
  --color-theme-gray-200: #c0c0c0;
  --color-theme-gray-300: #a7a7a7;
  --color-theme-gray-400: #949494;
  --color-theme-gray-500: #818181;
  --color-theme-gray-600: #797979;
  --color-theme-gray-700: #6e6e6e;
  --color-theme-gray-800: #646464;
  --color-theme-gray-900: #515151;
  --color-theme-gray-on-default: #f0f0f0;
  --color-theme-text-primary-active: var(--color-pallete-gray-700);
  --color-theme-text-secondary-active: var(--color-pallete-gray-400);
  --radius-full: 624.9375rem;
  --color-theme-gray-950: #595959;
  --color-theme-disabled-default: var(--color-theme-disabled-500);
  --color-theme-background-color: #ffffff;
  --color-theme-background-primary-inverse-default: var(--color-theme-black);
  --icon-set: optimacros;
  --size-1-3: 33.333333%;
  --size-1-2: 50%;
  --size-2-3: 66.66667%;
  --size-1-4: 25%;
  --size-1-5: 20%;
  --size-2-4: 50%;
  --size-3-4: 75%;
  --size-full: 100%;
  --text-5xl-line--height: 3.375rem;
}
```

Reference implementation can be found at: `packages/themes/src/default/tokens.css`

#### `theme`
Contains component-specific token variables as a CSS string. These tokens are used to style individual components in your UI kit.

**Example:**
```css
/* Example component tokens */
:root {
  --color-button-primary-active: var(--color-theme-primary-100);
  --color-button-neutral-active: #212121;
  --color-button-accent-active: var(--color-theme-accent-800);
  --color-button-success-active: #ffffff;
  --color-button-error-active: var(--color-theme-error-400);
  --color-button-primary-disabled: var(--color-theme-primary-disabled-default);
  --color-button-primary-default: var(--color-theme-transparent);
  --color-button-neutral-default: var(--color-theme-transparent);
  --color-button-inverse-default: var(--color-theme-background-primary-inverse-default);
  --color-button-accent-default: var(--color-theme-accent-default);
  --color-button-outline-default: var(--color-theme-neutral-100);
  --color-button-bordered-default: var(--color-theme-transparent);
  --color-button-accent-on-default: var(--color-theme-accent-on-default);
  --color-button-primary-on-disabled: var(--color-theme-primary-disabled-on-default);
  --color-button-primary-on-default: var(--color-theme-primary-800);
  --color-button-neutral-on-default: var(--color-pallete-gray-900);
  --color-button-inverse-on-default: var(--color-theme-background-primary-default);
  --color-button-bordered-on-default: var(--color-theme-primary-default);
  --color-button-bordered-active: var(--color-theme-primary-700);
  --color-button-bordered-on-active: var(--color-button-accent-on-default);
  --color-button-error-on-default: var(--color-theme-error-on-default);
  --color-button-error-default: var(--color-theme-error-default);
  --color-button-bordered-border-default: var(--color-theme-primary-default);
  --color-button-bordered-border-active: var(--color-theme-transparent);
  --color-button-success-default: var(--color-theme-success-default);
  --color-button-success-on-default: var(--color-theme-success-on-default);
  --color-button-secondary-active: var(--color-theme-secondary-300);
  --color-button-secondary-disabled: var(--color-theme-primary-disabled-default);
  --color-button-secondary-default: var(--color-theme-secondary-default);
  --color-button-secondary-on-default: var(--color-theme-primary-on-default);
  --color-button-secondary-on-disabled: var(--color-theme-primary-disabled-on-default);
  --color-button-warning-active: var(--color-theme-warning-600);
  --color-button-warning-on-default: var(--color-theme-warning-on-default);
  --color-button-warning-default: var(--color-theme-warning-default);
  --color-button-inverse-active: var(--color-pallete-gray-900);
  --color-button-neutral-disabled: #ffffff;
  --color-button-gray-default: var(--color-theme-gray-50);
  --color-button-gray-active: var(--color-theme-gray-200);
  --color-button-gray-on-default: var(--color-theme-gray-900);
  --color-button-accent-disabled: var(--color-theme-disabled-default);
  --color-button-bordered-disabled: #ff0000;
  --color-color-picker-primary-hover: #ffffff;
  --color-color-picker-primary-focus: #ffffff;
  --color-color-picker-primary-active: #ffffff;
  --color-divider-primary-default: var(--color-theme-divider-dark-default);
  --color-menu-primary-default: var(--color-theme-white);
  --color-menu-primary-shadow-default: var(--color-theme-gray-100);
  --color-menu-primary-border-default: var(--color-theme-gray-100);
  --color-menu-primary-on-default: var(--color-theme-text-primary-default);
  --color-menu-primary-group-label-default: var(--color-theme-text-secondary-default);
  --color-menu-primary-group-label-border-default: var(--color-theme-gray-200);
  --color-menu-primary-divider-default: var(--color-divider-primary-default);
  --color-menu-primary-item-active: var(--color-theme-primary-50);
  --color-menu-primary-item-disabled: var(--color-theme-disabled-500);
  --color-menu-secondary-item-on-active: var(--color-theme-primary-default);
  --color-menu-secondary-item-border-active: var(--color-theme-primary-400);
  --color-radio-group-primary-hover: #ffffff;
  --color-radio-group-primary-focus: #ffffff;
  --color-radio-group-primary-active: #ffffff;
  --color-radio-group-primary-Color: #ffffff;
  --color-radio-group-primary-control-default: var(--color-theme-transparent);
  --color-radio-group-primary-control-on-default: var(--color-theme-text-primary-default);
  --color-radio-group-primary-control-border-default: var(--color-theme-gray-200);
  --color-radio-group-primary-control-border-checked: var(--color-theme-primary-default);
  --color-radio-group-primary-control-border-disabled: var(--color-theme-disabled-default);
  --color-radio-group-primary-control-checked: var(--color-theme-primary-default);
  --color-sidebar-primary-hover: #ffffff;
  --color-sidebar-primary-focus: #ffffff;
  --color-sidebar-primary-active: #ffffff;
  --color-sidebar-primary: #ffffff;
  --color-sidebar-secondary: #ffffff;
  --color-sidebar-neutral: #ffffff;
  --color-sidebar-accent: #ffffff;
  --color-sidebar-warning: #ffffff;
  --color-sidebar-success: #ffffff;
  --color-sidebar-error: #ffffff;
  --color-tooltip-primary-on-default: var(--color-theme-white);
  --color-tooltip-primary-default: var(--color-theme-gray-800);
  --color-tooltip-primary: #ffffff;
  --color-navigation-primary-default: #ffffff;
  --color-footer-primary-default: var(--color-theme-accent-default);
  --color-footer-primary-on-default: var(--color-theme-text-primary-default);
  --color-memory-counter-primary: #ffffff;
  --color-toast-default: var(--color-theme-background-primary-inverse-default);
  --color-toast-success-default: var(--color-theme-success-default);
  --color-toast-cancel-default: var(--color-theme-error-default);
  --color-toast-warning-default: var(--color-theme-warning-default);
  --color-toast-on-default: var(--color-theme-background-primary-default);
  --color-toolbar-primary: #ffffff;
  --color-field-primary-default: var(--color-theme-gray-950);
  --color-field-primary-disabled: var(--color-theme-disabled-400);
  --color-field-primary-label-default: var(--color-theme-gray-200);
  --color-field-primary-label-active: var(--color-theme-gray-950);
  --color-field-primary-border-default: var(--color-theme-gray-200);
  --color-field-primary-border-active: var(--color-theme-gray-950);
  --color-field-primary-label-required: var(--color-theme-error-default);
  --color-field-primary-label-error: var(--color-theme-error-default);
  --color-field-primary-border-error: var(--color-theme-error-default);
  --color-field-primary-Color: #ffffff;
  --color-field-primary-border-disabled: var(--color-theme-disabled-400);
  --color-field-primary-icon-default: var(--color-theme-gray-200);
  --color-field-primary-icon-active: var(--color-theme-primary-default);
  --Color: var(--color-button-bordered-active);
  --color-button-group-primary-border-default: var(--color-theme-primary-default);
  --color-calendar-primary-header-default: var(--color-theme-primary-default);
  --color-calendar-primary-header-on-default: var(--color-theme-primary-on-default);
  --color-calendar-primary-default: var(--color-theme-primary-default);
  --color-calendar-primary-inverse-default: var(--color-theme-primary-inverse-default);
  --color-calendar-primary-button-default: #ffffff;
  --color-calendar-primary-item-selected-default: var(--color-theme-primary-default);
  --color-calendar-primary-item-selected-on-default: var(--color-theme-primary-inverse-default);
  --color-calendar-primary-item-default: var(--color-theme-transparent);
  --color-calendar-primary-trigger-default: #ffffff;
  --color-calendar-primary-trigger-border-default: var(--color-theme-neutral-400);
  --color-checkbox-primary-box-control-checked: var(--color-theme-primary-default);
  --color-checkbox-primary-box-control-on-checked: var(--color-theme-primary-on-default);
  --color-checkbox-primary-box-control-default: var(--color-theme-transparent);
  --color-checkbox-primary-box-control-border-checked: var(
    --color-checkbox-primary-box-control-checked
  );
  --color-checkbox-primary-box-control-border-default: var(--color-theme-black);
  --color-checkbox-primary-box-control-on-default: var(--color-theme-transparent);
  --color-checkbox-primary-label-default: var(--color-theme-text-primary-default);
  --color-checkbox-primary-label-active: var(--color-theme-text-primary-active);
  --color-checkbox-primary-label-disabled: #ffffff;
  --color-checkbox-primary-box-control-disabled: var(--color-theme-disabled-default);
  --color-checkbox-primary-box-control-border-disabled: var(--color-theme-disabled-default);
  --color-chip-primary-default: var(--color-theme-gray-50);
  --color-chip-primary-icon-default: var(--color-theme-gray-400);
  --color-chip-primary-icon-active: var(--color-theme-gray-500);
  --color-chip-primary-on-default: var(--color-theme-text-secondary-default);
  --color-counter-primary-default: var(--color-theme-gray-200);
  --color-counter-primary-on-default: var(--color-theme-white);
  --color-counter-primary-decrease-default: #ffffff;
  --color-counter-primary-increase-default: #ffffff;
  --color-file-upload-primary-on-default: var(--color-theme-text-secondary-default);
  --color-file-upload-primary-item-default: var(--color-theme-background-light-highlighted);
  --color-file-upload-primary-dropzone-default: var(--color-theme-background-light-highlighted);
  --color-file-upload-primary-dropzone-on-default: var(--color-theme-primary-default);
  --color-file-upload-primary-item-on-default: var(--color-theme-primary-default);
  --color-file-upload-primary-content-border-default: var(--color-theme-divider-dark-default);
  --color-file-upload-primary-content-on-default: var(--color-theme-text-secondary-default);
  --color-header-primary-default: var(--color-theme-primary-default);
  --color-header-primary-on-default: var(--color-theme-white);
  --color-header-primary-notification-badge-default: var(--color-theme-error-default);
  --color-header-primary-notification-badge-on-default: var(--color-theme-white);
  --color-icon-button-accent-default: var(--color-pallete-gray-200);
  --color-icon-button-accent-on-default: var(--color-theme-text-secondary-default);
  --color-icon-button-border-default: var(--color-pallete-gray-400);
  --color-loader-primary-track-default: var(--color-divider-primary-default);
  --color-loader-primary-range-disabled: var(--color-divider-primary-default);
  --color-loader-primary-range-default: var(--color-theme-primary-default);
  --color-loader-primary-buffer-from-default: var(--color-theme-primary-inverse-default);
  --color-loader-primary-buffer-to-default: var(--color-theme-primary-default);
  --color-loader-primary-on-default: var(--color-theme-accent-default);
  --color-markdown-editor-primary-border-default: var(--color-theme-primary-default);
  --color-modal-primary-backdrop-default: #323232;
  --color-modal-primary-default: var(--color-theme-background-primary-default);
  --color-select-primary-default: var(--color-theme-white);
  --color-select-primary-item-active: var(--color-pallete-gray-100);
  --color-select-primary-item-disabled: var(--color-theme-disabled-500);
  --color-select-primary-border-default: var(--color-theme-gray-100);
  --color-select-primary-on-default: var(--color-theme-text-primary-default);
  --color-select-primary-group-label-defult: var(--color-theme-text-secondary-default);
  --color-select-primary-divider-default: var(--color-divider-primary-default);
  --color-select-primary-group-label-border-default: var(--color-theme-gray-200);
  --color-select-primary-shadow-default: var(--color-theme-gray-100);
  --color-select-secondary-item-on-active: var(--color-theme-primary-default);
  --color-select-secondary-item-border-active: var(--color-theme-primary-400);
  --color-slider-primary-track-default: #ffffff;
  --color-slider-primary-range-default: var(--color-theme-primary-900);
  --color-slider-primary-range-disabled: var(--color-theme-primary-200);
  --color-slider-primary-thumb-default: var(--color-theme-white);
  --color-slider-primary-thumb-disabled: var(--color-theme-disabled-400);
  --color-slider-primary-thumb-outline-default: var(--color-button-secondary-default);
  --color-tabs-primary-tab-on-active: var(--color-theme-primary-default);
  --color-tabs-primary-tab-border-active: var(--color-theme-primary-default);
  --color-tabs-primary-tab-border-default: var(--color-divider-primary-default);
  --color-tabs-primary-tab-shadow-active: #000000;
  --color-tabs-primary-tab-on-default: var(--color-theme-text-primary-default);
  --color-icon-primary-default: var(--color-theme-gray-300);
  --color-icon-secondary-default: var(--color-theme-gray-800);
  --color-icon-secondary-100: var(--color-theme-primary-default);
}
```

Reference implementation can be found at: `packages/themes/src/default/component-tokens.css`

#### `custom`
Optional string containing any additional custom CSS you want to apply to your application.

**Example:**
```css
/* Example custom styles */
.custom-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-unit);
}
```

### Feature Flags Configuration

```typescript
{
  featureFlags: Record<string, Record<string, boolean>>;
}
```

Feature flags allow you to toggle specific features or behaviors within the UI kit. They are organized in a nested structure where:
- The outer key represents the feature category
- The inner key represents the specific feature
- The boolean value determines if the feature is enabled

**Example:**
```typescript
{
  featureFlags: {
    menu: {
        submenu: true,
        virtualScroll: false
    },
    performance: {
      lazyLoading: true
    }
  }
}
```

For a complete list of available feature flags and their descriptions, refer to: `packages/core/src/store/config/feature_flags.md`

## Complete Configuration Example

```typescript
const uiKitConfig = {
  iconsSrc: '/assets/icons-sprite.svg',
  styles: {
    root: `:root { 
      --color-pallete-purple-900: #4a148c;
  --color-pallete-purple-500: #9c27b0;
  --color-pallete-purple-800: #6a1b9a;
  --color-pallete-purple-700: #7b1fa2;
  --color-pallete-purple-600: #8e24aa;
  --color-pallete-purple-400: #ab47bc;
  --color-pallete-purple-300: #ba68c8;
  --color-pallete-purple-200: #ce93d8;
  --color-pallete-purple-100: #e1bee7;
    }`,
    theme: `:root{
    --color-button-primary-active: var(--color-theme-primary-100);
  --color-button-neutral-active: #212121;
  --color-button-accent-active: var(--color-theme-accent-800);
    }`,
    custom: `.custom-styles {
      background: var(--secondary-color);
    }`
  },
  featureFlags: {
    menu: {
        submenu: true,
        virtualScroll: false
    },
  }
};
```

## Usage

```typescript
import { UiKit } from '@optimacros-ui/kit-store';

function App() {
  return (
    <UiKit.Provider {...uiKitConfig}>
      <YourApplication />
    </UiKit.Provider>
  );
}
```