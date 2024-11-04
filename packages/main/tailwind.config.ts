import { Config } from 'tailwindcss';

const config = {
    darkMode: [
        'variant',
        ['@media (prefers-color-scheme: dark) { &:not(.light *) }', '&:is(.dark *)'],
    ],
    content: [
        '../core/src/**/*.{css,scss}',
        './src/**/*.{css,scss}',
        '../themes/src/**/*.{css,scss}',
    ],
} satisfies Config;

export default config;
