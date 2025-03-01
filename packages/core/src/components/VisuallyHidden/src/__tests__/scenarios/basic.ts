import { props } from '../props';
import { StoryContext } from '@storybook/react';
import { ComponentProps } from 'react';
import { VisuallyHidden } from '../../VisuallyHidden';
import { within, expect, isInaccessible } from '@storybook/test';

export const basic = async ({
    globals,
    canvasElement,
}: StoryContext<ComponentProps<typeof VisuallyHidden>>) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('root');

    expect(root).toBeInTheDocument();
    expect(root).toBeVisible();
    expect(isInaccessible(root)).toBeFalsy();

    await window.takeScreenshot?.();
};
