import { within, expect, waitFor, fireEvent } from '@storybook/test';
import { menuItems } from '../../mock';

import { PlayFunction } from 'storybook/internal/types';
import { ReactRenderer } from '@storybook/react';
import { props } from '../props';

export const contextMenu: PlayFunction<ReactRenderer> = async ({
    canvasElement,
    step,
    globals,
}) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const canvas = within(canvasElement);

    const trigger = canvas.getByTestId('trigger');
    const content = canvas.getByTestId('menu-content');

    expect(trigger).toBeInTheDocument();
    expect(
        canvasElement.querySelector('[data-scope="menu"][data-part="positioner"]'),
    ).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-state', 'closed');
    expect(canvasElement.querySelectorAll('[data-testid="menu-list"] > li')).toHaveLength(
        menuItems.length,
    );

    await step('open/close', async () => {
        await fireEvent.contextMenu(trigger, {
            clientX: 100,
            clientY: 50,
        });

        await waitFor(() => {
            expect(content).toHaveAttribute('data-state', 'open');
            expect(content).toBeVisible();
        });

        await window.takeScreenshot?.();

        const firstEnabledMenuItemValue = menuItems.find((item) => !item.disabled).valueText;

        await fireEvent.click(within(content).getByTitle(firstEnabledMenuItemValue));

        await waitFor(() => {
            expect(content).toHaveAttribute('data-state', 'closed');
            expect(content).not.toBeVisible();
        });
    });
};
