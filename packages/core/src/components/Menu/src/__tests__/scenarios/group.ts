import { within, expect, waitFor, fireEvent } from '@storybook/test';
import { PlayFunction } from 'storybook/internal/types';
import { ReactRenderer } from '@storybook/react';
import { props } from '../props';

export const group: PlayFunction<ReactRenderer> = async ({ canvasElement, globals }) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const canvas = within(canvasElement);

    const trigger = canvas.getByTestId('trigger');
    const content = canvas.getByTestId('menu-content');

    expect(trigger).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-state', 'closed');

    await fireEvent.click(trigger);

    await waitFor(() => expect(content).toHaveAttribute('data-state', 'open'));
    expect(content).toBeVisible();

    await window.takeScreenshot?.('open-group');

    await fireEvent.click(trigger);

    await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
    expect(content).not.toBeVisible();
};
