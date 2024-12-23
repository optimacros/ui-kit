import { StoryContext } from '@storybook/react';
import { storyMapping } from '../figma/storyMapping';
import { last } from '../../packages/utils/src';

export const setFigmaLink = (ctx: StoryContext) => {
    const { title } = ctx;

    const componentName = (last(title.split('/')) as string).replaceAll(' ', '').toLowerCase();
    const key = Object.keys(storyMapping).find((k) => k.toLowerCase() === componentName);

    if (key) {
        const figmaLink = storyMapping[key];

        if (figmaLink) {
            ctx.parameters.design = {
                type: 'figma',
                url: figmaLink,
            };
        }
    }
};
