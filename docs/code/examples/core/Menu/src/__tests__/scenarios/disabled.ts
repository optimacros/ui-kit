import { within, expect, waitFor, fireEvent } from '@storybook/test';
import { PlayFunction } from 'storybook/internal/types';
import { ReactRenderer } from '@storybook/react';
import { props } from '../props';

export const disabled: PlayFunction<ReactRenderer> = async ({ canvasElement, globals }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const trigger = canvas.getByTestId('trigger');
    const content = canvas.getByTestId('menu-content');

    expect(trigger).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-state', 'closed');

    window.testing.updateArgs({ disabled: true });

    await waitFor(() => expect(trigger).toHaveAttribute('data-disabled', 'true'));

    await fireEvent.click(trigger);

    await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
    expect(content).not.toBeVisible();
};
