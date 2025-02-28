import { within, waitFor, expect, userEvent } from '@storybook/test';
import { StoryContext } from '@storybook/react';
import { props } from '../props';

export const disabled = async ({ globals, canvasElement }: StoryContext) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({ ...props, disabled: true });

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('root');
    const editTrigger = canvas.getByTestId('edit-trigger');
    const previewTrigger = canvas.getByTestId('preview-trigger');
    const splitTrigger = canvas.getByTestId('split-trigger');
    const editTab = canvas.getByTestId('edit-tab');
    const previewTab = canvas.getByTestId('preview-tab');
    const splitTab = canvas.getByTestId('split-tab');

    expect(root).toBeInTheDocument();
    expect(editTrigger).toBeInTheDocument();
    expect(editTrigger).toHaveAttribute('data-selected');
    expect(previewTrigger).toBeInTheDocument();
    expect(splitTrigger).toBeInTheDocument();
    expect(editTab).toBeInTheDocument();
    expect(editTab.parentNode).toHaveAttribute('data-selected');
    expect(editTab).toBeVisible();
    expect(previewTab).toBeInTheDocument();
    expect(previewTab).not.toBeVisible();
    expect(splitTab).toBeInTheDocument();
    expect(splitTab).not.toBeVisible();

    await window.takeScreenshot?.('edit-disabled');

    const user = userEvent.setup();

    await user.click(previewTrigger);

    await waitFor(() => {
        expect(previewTrigger).toHaveAttribute('data-selected');
        expect(editTab).not.toBeVisible();
        expect(previewTab).toBeVisible();
        expect(previewTab.parentNode).toHaveAttribute('data-selected');
        expect(splitTab).not.toBeVisible();
    });

    await window.takeScreenshot?.('preview-disabled');

    await user.click(splitTrigger);

    await waitFor(() => {
        expect(splitTrigger).toHaveAttribute('data-selected');
        expect(editTab).not.toBeVisible();
        expect(previewTab).not.toBeVisible();
        expect(splitTab).toBeVisible();
        expect(splitTab.parentNode).toHaveAttribute('data-selected');
    });

    await window.takeScreenshot?.('split-disabled');
};
