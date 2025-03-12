import { ICONS_SETS, THEMES } from '@optimacros-ui/themes';

export const commonGlobalTypes = {
    theme: {
        description: 'Global theme of storybook',
        toolbar: {
            title: 'Theme',
            icon: 'circle',
            items: Object.values(THEMES).map((value) => ({ value, title: value })),
            dynamicTitle: true,
        },
        defaultValue: 'optimacros',
    },
    iconsSet: {
        description: 'Global icon set of storybook',
        toolbar: {
            title: 'Icons set',
            icon: 'star',
            items: Object.values(ICONS_SETS).map((value) => ({ value, title: value })),
            dynamicTitle: true,
        },
        defaultValue: 'optimacros',
    },
};
