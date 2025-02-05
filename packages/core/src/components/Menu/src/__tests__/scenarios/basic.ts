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

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

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

    await window.takeScreenshot?.();

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

        const firstEnabledMenuItemValue = menuItems.find((item) => !item.disabled).valueText;

        await fireEvent.click(within(content).getByTitle(firstEnabledMenuItemValue));

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
        expect(content).not.toBeVisible();

        window.testing.updateArgs({ closeOnSelect: false });
        await sleep(1000);

        await fireEvent.click(trigger);

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'open'));
        expect(content).toBeVisible();

        await fireEvent.click(within(content).getByTitle(firstEnabledMenuItemValue));

        await sleep(100);
        expect(content).toHaveAttribute('data-state', 'open');
        expect(content).toBeVisible();

        await fireEvent.click(trigger);

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
        expect(content).not.toBeVisible();
    });

    await step('open/close controlled', async () => {
        window.testing.updateArgs({ ...props, 'open.controlled': true });
        window.testing.args.onOpenChange.mockClear();

        await sleep(100);

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
        expect(content).not.toBeVisible();

        await fireEvent.click(trigger);

        await waitFor(() => expect(window.testing.args.onOpenChange).toBeCalledTimes(1));
        await waitFor(() =>
            expect(window.testing.args.onOpenChange).toBeCalledWith({ open: true }),
        );

        await sleep(100);

        expect(content).toHaveAttribute('data-state', 'closed');
        expect(content).not.toBeVisible();

        // also resets onOpenChange spy
        window.testing.updateArgs({
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

        window.testing.updateArgs({
            open: false,
        });

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
        expect(content).not.toBeVisible();
    });

    await step('keyboard navigation', async () => {
        (document.activeElement as HTMLElement).blur();
        window.testing.updateArgs(props);

        await sleep(100);

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

        window.testing.updateArgs({ loopFocus: true });

        await sleep(100);

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
