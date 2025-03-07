import { within, expect, waitFor, fireEvent, userEvent } from '@storybook/test';
import { PlayFunction } from 'storybook/internal/types';
import { ReactRenderer } from '@storybook/react';
import { props } from '../props';
import { last } from '@optimacros-ui/utils';

export const orientation: PlayFunction<ReactRenderer> = async ({ canvasElement, globals }) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const canvas = within(canvasElement);

    const trigger = canvas.getByTestId('trigger');
    const orientationTrigger = canvas.getByTestId('orientation-trigger');
    const content = canvas.getByTestId('menu-content');
    const lastActiveItem = last(
        ([...content.querySelectorAll(':scope > ul > li')] as HTMLLIElement[]).filter(
            (e) => !Object.hasOwn(e.dataset, 'disabled'),
        ),
    );

    expect(trigger).toBeInTheDocument();
    expect(orientationTrigger).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-state', 'closed');

    const user = userEvent.setup();

    await fireEvent.click(orientationTrigger);
    await fireEvent.click(trigger);

    await waitFor(() => expect(content).toHaveAttribute('data-state', 'open'));
    expect(content).toBeVisible();

    await user.keyboard('{ArrowDown>10}');

    await waitFor(() => expect(lastActiveItem).toHaveAttribute('data-highlighted'));

    // TODO a kak scrollit
    lastActiveItem.scrollIntoView();

    await window.takeScreenshot?.('vertical-open-highlighted');

    await fireEvent.click(lastActiveItem);

    await waitFor(() => {
        expect(content).toHaveAttribute('data-state', 'closed');
        expect(content).not.toBeVisible();
    });
};
