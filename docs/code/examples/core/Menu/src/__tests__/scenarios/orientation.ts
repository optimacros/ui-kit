import { within, expect, waitFor, fireEvent, userEvent } from '@storybook/test';
import { PlayFunction } from 'storybook/internal/types';
import { ReactRenderer } from '@storybook/react';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const orientation: PlayFunction<ReactRenderer> = async ({ canvasElement, globals }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const trigger = canvas.getByTestId('trigger');
    const orientationTrigger = canvas.getByTestId('orientation-trigger');
    const content = canvas.getByTestId('menu-content');
    const subMenuTrigger = canvas.getByText('nested');
    const subContent = canvas.getByTestId('sub-menu-content');

    expect(trigger).toBeInTheDocument();
    expect(orientationTrigger).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-state', 'closed');
    expect(subMenuTrigger).toBeInTheDocument();
    expect(subContent).toBeInTheDocument();
    expect(subContent).toHaveAttribute('data-state', 'closed');

    const user = userEvent.setup();

    await fireEvent.click(orientationTrigger);
    await fireEvent.click(trigger);

    await waitFor(() => expect(content).toHaveAttribute('data-state', 'open'));
    expect(content).toBeVisible();

    // TODO a kak scrollit
    subMenuTrigger.scrollIntoView();

    await fireEvent.click(subMenuTrigger);

    await waitFor(() => expect(subContent).toHaveAttribute('data-state', 'open'));
    expect(subContent).toBeVisible();

    await sleep(100);

    const enabledSubMenuElements = (
        [...subContent.querySelectorAll(':scope > ul > li')] as HTMLLIElement[]
    ).filter((e) => !Object.hasOwn(e.dataset, 'disabled'));

    await sleep(100);

    await user.keyboard('{ArrowDown}');

    await waitFor(() => expect(enabledSubMenuElements[0]).toHaveAttribute('data-highlighted'));

    await window.takeScreenshot?.('vertical-open-highlighted');

    await fireEvent.click(enabledSubMenuElements[0]);

    await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
    expect(content).not.toBeVisible();
};
