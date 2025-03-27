import { within, expect, waitFor, fireEvent, userEvent } from '@storybook/test';
import { menuItems } from '../../mock';

import { PlayFunction } from 'storybook/internal/types';
import { ReactRenderer } from '@storybook/react';
import { sleep } from '@optimacros-ui/utils';
import { props } from '../props';

export const basic: PlayFunction<ReactRenderer> = async ({ canvasElement, step, globals }) => {
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

    const user = userEvent.setup();

    await step('open/close', async () => {
        await fireEvent.click(trigger);

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'open'));
        expect(content).toBeVisible();

        await window.takeScreenshot?.('open');

        const firstDisabledMenuItemValue = menuItems.find((item) => item.disabled).valueText;

        await fireEvent.click(within(content).getByTitle(firstDisabledMenuItemValue));

        await sleep(100);
        expect(content).toHaveAttribute('data-state', 'open');
        expect(content).toBeVisible();

        const firstEnabledMenuItem = menuItems.find((item) => !item.disabled);
        const firstEnabledMenuItemElement = within(content).getByTitle(
            firstEnabledMenuItem.valueText,
        );

        await user.hover(firstEnabledMenuItemElement);
        await fireEvent.click(firstEnabledMenuItemElement);

        await waitFor(() => {
            expect(window.testing.args.onSelect).toHaveBeenCalledTimes(1);
            expect(window.testing.args.onSelect).toHaveBeenLastCalledWith({
                value: firstEnabledMenuItem.value,
            });
        });

        await window.testing.updateArgs({ closeOnSelect: false });

        await fireEvent.click(trigger);

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'open'));
        expect(content).toBeVisible();

        await fireEvent.click(within(content).getByTitle(firstEnabledMenuItem.valueText));

        await sleep(100);
        expect(content).toHaveAttribute('data-state', 'open');
        expect(content).toBeVisible();

        await fireEvent.click(trigger);

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
        expect(content).not.toBeVisible();
    });

    await step('open/close controlled', async () => {
        await window.testing.updateArgs({ open: false });
        window.testing.args.onOpenChange.mockClear();

        await sleep(100);

        expect(content).toHaveAttribute('data-state', 'closed');
        expect(content).not.toBeVisible();

        await fireEvent.click(trigger);

        await waitFor(() => expect(window.testing.args.onOpenChange).toBeCalledTimes(1));
        await waitFor(() =>
            expect(window.testing.args.onOpenChange).toBeCalledWith({ open: true }),
        );

        await sleep(100);

        expect(content).toHaveAttribute('data-state', 'closed');
        expect(content).not.toBeVisible();

        await window.testing.updateArgs({
            open: true,
        });

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'open'));
        expect(content).toBeVisible();

        await fireEvent.click(trigger);

        await waitFor(() => expect(window.testing.args.onOpenChange).toBeCalledTimes(2));
        await waitFor(() =>
            expect(window.testing.args.onOpenChange).toBeCalledWith({ open: false }),
        );

        await sleep(100);

        expect(content).toHaveAttribute('data-state', 'open');
        expect(content).toBeVisible();

        await window.testing.updateArgs({
            open: false,
        });

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
        expect(content).not.toBeVisible();
    });

    await step('keyboard navigation', async () => {
        await window.testing.updateArgs(props);

        (document.activeElement as HTMLElement).blur();

        await user.keyboard('{Tab}');

        await waitFor(() => expect(trigger).toHaveFocus());

        await user.keyboard('{Enter}');

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'open'));
        expect(content).toBeVisible();

        await sleep(100);

        const enabledElements = (
            [...document.querySelectorAll('[data-testid="menu-list"] > li')] as HTMLLIElement[]
        ).filter((e) => !Object.hasOwn(e.dataset, 'disabled'));

        await waitFor(() => expect(enabledElements[0]).toHaveAttribute('data-highlighted'));

        await user.keyboard('{ArrowDown}');

        await waitFor(() => expect(enabledElements[1]).toHaveAttribute('data-highlighted'));

        await window.takeScreenshot?.('highlighted-item');

        await user.keyboard(
            '{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}',
        );

        await waitFor(() => expect(enabledElements[4]).toHaveAttribute('data-highlighted'));

        await window.testing.updateArgs({ loopFocus: true });

        await user.keyboard('{ArrowDown}');

        await waitFor(() => expect(enabledElements[0]).toHaveAttribute('data-highlighted'));

        await user.keyboard('{t}');

        await waitFor(() =>
            expect(within(content).getByText('typeahead')).toHaveAttribute('data-highlighted'),
        );

        await user.keyboard('{Enter}');

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
        expect(content).not.toBeVisible();

        await user.keyboard('{Space}');

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'open'));
        expect(content).toBeVisible();

        await user.keyboard('{Escape}');

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
        expect(content).not.toBeVisible();
    });
};
