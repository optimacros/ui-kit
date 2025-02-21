import { within, expect, waitFor, fireEvent } from '@storybook/test';
import { PlayFunction } from 'storybook/internal/types';
import { ReactRenderer } from '@storybook/react';
import { props } from '../props';
import { menuItems } from '../../mock';

export const nested: PlayFunction<ReactRenderer> = async ({ canvasElement, globals }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const firstEnabledItem = menuItems.find((i) => !i.disabled);

    const trigger = canvas.getByTestId('trigger');
    const content = canvas.getByTestId('menu-content');
    const subContent = canvas.getByTestId(`${firstEnabledItem.value} sub-menu-content`);
    const subSubMenuTrigger = within(subContent).getByText('nested');
    const subSubContent = within(subContent).getByTestId(`sub-sub-menu-content`);

    expect(trigger).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-state', 'closed');
    expect(subSubMenuTrigger).toBeInTheDocument();
    expect(subContent).toBeInTheDocument();
    expect(subContent).toHaveAttribute('data-state', 'closed');
    expect(subSubContent).toBeInTheDocument();
    expect(subSubContent).toHaveAttribute('data-state', 'closed');

    await fireEvent.click(trigger);
    await fireEvent.click(within(content).getByText(firstEnabledItem.valueText));
    await fireEvent.click(subSubMenuTrigger);

    await waitFor(() => expect(subSubContent).toHaveAttribute('data-state', 'open'));
    expect(subSubContent).toBeVisible();
    expect(content).toHaveAttribute('data-state', 'open');
    expect(content).toBeVisible();
    expect(subContent).toHaveAttribute('data-state', 'open');
    expect(subContent).toBeVisible();

    await window.takeScreenshot?.('open-nested');

    const enabledSubSubMenuElements = (
        [...subSubContent.querySelectorAll(':scope > ul > li')] as HTMLLIElement[]
    ).filter((e) => !Object.hasOwn(e.dataset, 'disabled'));

    await fireEvent.click(enabledSubSubMenuElements[0]);

    await waitFor(() => expect(subSubContent).toHaveAttribute('data-state', 'closed'));
    expect(subSubContent).not.toBeVisible();
    expect(content).toHaveAttribute('data-state', 'closed');
    expect(content).not.toBeVisible();
    expect(subContent).toHaveAttribute('data-state', 'closed');
    expect(subContent).not.toBeVisible();
};
