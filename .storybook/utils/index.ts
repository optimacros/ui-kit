import { StoryContext } from '@storybook/react';
import { storyMapping } from '../figma/storyMapping';
import { last } from '../../packages/utils/src';

export const setFigmaLink = (ctx: StoryContext) => {
    const { title, parameters } = ctx;

    // already added
    if (parameters?.design?.url) {
        return;
    }

    // detect package
    const pkg = getPackageNameByPath(parameters.fileName);

    if (!pkg || !storyMapping[pkg]) {
        return;
    }

    const mapping = storyMapping[pkg];

    const componentName = (last(title.split('/')) as string).replaceAll(' ', '').toLowerCase();
    const key = Object.keys(mapping).find((k) => k.toLowerCase() === componentName);

    if (key) {
        const figmaLink = mapping[key];

        if (figmaLink) {
            ctx.parameters.design = {
                type: 'figma',
                url: figmaLink,
            };
        }
    }
};

const getPackageNameByPath = (path: string) => {
    if (!path.startsWith('./packages/')) {
        return null;
    }

    const pkg = path.replace('./packages/', '').split('/')[0];

    return pkg;
};
