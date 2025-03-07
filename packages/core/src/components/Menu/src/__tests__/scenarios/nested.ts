import { within, expect, waitFor, fireEvent, userEvent } from '@storybook/test';
import { PlayFunction } from 'storybook/internal/types';
import { ReactRenderer } from '@storybook/react';
import { props } from '../props';

export const nested: PlayFunction<ReactRenderer> = async ({ globals }) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const canvas = within(document.body);

    const trigger = canvas.getByTestId('trigger');
    const content = canvas.getByTestId('menu-content');
    const subTrigger = canvas.getByTestId('sub-1-trigger');
    const subContent = canvas.getByTestId('sub-1-content');
    const subSubTrigger = canvas.getByTestId('sub-1-1-trigger');
    const subSubContent = canvas.getByTestId('sub-1-1-content');
    const subSubSubTrigger = canvas.getByTestId('sub-1-1-1-trigger');
    const subSubSubContent = canvas.getByTestId('sub-1-1-1-content');

    expect(trigger).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-state', 'closed');
    expect(subTrigger).toBeInTheDocument();
    expect(subContent).toBeInTheDocument();
    expect(subContent).toHaveAttribute('data-state', 'closed');
    expect(subSubTrigger).toBeInTheDocument();
    expect(subSubContent).toBeInTheDocument();
    expect(subSubContent).toHaveAttribute('data-state', 'closed');
    expect(subSubSubTrigger).toBeInTheDocument();
    expect(subSubSubContent).toBeInTheDocument();
    expect(subSubSubContent).toHaveAttribute('data-state', 'closed');

    await fireEvent.click(trigger);

    await waitFor(() => expect(content).toHaveAttribute('data-state', 'open'));

    await fireEvent.click(subTrigger);

    await waitFor(() => expect(subContent).toHaveAttribute('data-state', 'open'));

    await fireEvent.click(subSubTrigger);

    await waitFor(() => expect(subSubContent).toHaveAttribute('data-state', 'open'));

    await userEvent.hover(subSubSubTrigger);

    await waitFor(() => expect(subSubSubContent).toHaveAttribute('data-state', 'open'));

    expect(content).toBeVisible();
    expect(subContent).toBeVisible();
    expect(subSubContent).toBeVisible();
    expect(subSubSubContent).toBeVisible();

    await window.takeScreenshot?.('open-nested');

    const enabledSubSubSubMenuElements = (
        [...subSubSubContent.querySelectorAll(':scope > ul > li')] as HTMLLIElement[]
    ).filter((e) => !Object.hasOwn(e.dataset, 'disabled'));

    await fireEvent.click(enabledSubSubSubMenuElements[0]);

    await waitFor(() => {
        expect(content).toHaveAttribute('data-state', 'closed');
        expect(subContent).toHaveAttribute('data-state', 'closed');
        expect(subSubContent).toHaveAttribute('data-state', 'closed');
        expect(subSubSubContent).toHaveAttribute('data-state', 'closed');

        expect(content).not.toBeVisible();
        expect(subContent).not.toBeVisible();
        expect(subSubContent).not.toBeVisible();
        expect(subSubSubContent).not.toBeVisible();
    });
};
