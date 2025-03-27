import { within, expect, waitFor, fireEvent, userEvent } from '@storybook/test';
import { menuItems } from '../../mock';

import { PlayFunction } from 'storybook/internal/types';
import { ReactRenderer } from '@storybook/react';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const highlighted: PlayFunction<ReactRenderer> = async ({
    canvasElement,
    step,
    globals,
}) => {
    if (!globals.test) {
        return;
    }

    const enabledItemIds = menuItems.filter((i) => !i.disabled).map((i) => i.value);

    await window.testing.updateArgs({ ...props, defaultHighlightedValue: enabledItemIds[0] });

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

    const enabledItemElements = [
        ...canvasElement.querySelectorAll('[data-testid="menu-list"] > li'),
    ].filter((el) => !el.hasAttribute('data-disabled'));

    const user = userEvent.setup();

    await step('default highlighted', async () => {
        await fireEvent.click(trigger);

        await waitFor(() => {
            expect(content).toHaveAttribute('data-state', 'open');
            expect(content).toBeVisible();
            expect(enabledItemElements[0]).toHaveAttribute('data-highlighted');
        });

        await user.keyboard('[ArrowDown]');

        await waitFor(() => {
            expect(enabledItemElements[1]).toHaveAttribute('data-highlighted');
        });

        expect(window.testing.args.onHighlightChange).toHaveBeenCalledTimes(1);
        expect(window.testing.args.onHighlightChange).toHaveBeenLastCalledWith({
            highlightedValue: enabledItemIds[1],
        });

        await user.keyboard('t');

        await waitFor(() => {
            expect(enabledItemElements[2]).toHaveAttribute('data-highlighted');
        });

        expect(window.testing.args.onHighlightChange).toHaveBeenCalledTimes(2);
        expect(window.testing.args.onHighlightChange).toHaveBeenLastCalledWith({
            highlightedValue: enabledItemIds[2],
        });

        await window.testing.updateArgs({ ...props, highlightedValue: enabledItemIds[3] });

        await waitFor(() => {
            expect(enabledItemElements[3]).toHaveAttribute('data-highlighted');
        });

        await user.keyboard('[ArrowDown]');

        await sleep(100);

        expect(enabledItemElements[3]).toHaveAttribute('data-highlighted');
        expect(window.testing.args.onHighlightChange).toHaveBeenCalledTimes(3);
        expect(window.testing.args.onHighlightChange).toHaveBeenLastCalledWith({
            highlightedValue: enabledItemIds[4],
        });

        await user.keyboard('[Enter]');

        await waitFor(() => {
            expect(content).toHaveAttribute('data-state', 'closed');
            expect(content).not.toBeVisible();
        });
    });
};
