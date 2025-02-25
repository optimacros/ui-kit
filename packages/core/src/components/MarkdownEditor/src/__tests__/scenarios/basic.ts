import { within, fireEvent, waitFor, expect, userEvent } from '@storybook/test';
import { convertStringToMarkdown } from '../../utils';
import { StoryContext } from '@storybook/react';
import { props } from '../props';
import { generateMarkdown } from '../../mock';

export const basic = async ({ globals, canvasElement, step }: StoryContext) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

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

    await window.takeScreenshot?.('edit');

    const user = userEvent.setup();

    await step('navigation', async () => {
        await user.click(previewTrigger);

        await waitFor(() => {
            expect(previewTrigger).toHaveAttribute('data-selected');
            expect(editTab).not.toBeVisible();
            expect(previewTab).toBeVisible();
            expect(previewTab.parentNode).toHaveAttribute('data-selected');
            expect(splitTab).not.toBeVisible();
        });

        await window.takeScreenshot?.('preview');

        await user.keyboard('{ArrowLeft>2}');

        await waitFor(() => {
            expect(splitTrigger).toHaveAttribute('data-selected');
            expect(editTab).not.toBeVisible();
            expect(previewTab).not.toBeVisible();
            expect(splitTab).toBeVisible();
            expect(splitTab.parentNode).toHaveAttribute('data-selected');
        });

        await window.takeScreenshot?.('split');
    });

    await step('input', async () => {
        window.testing.updateArgs(props);
        window.testing.args.onChange.mockClear();

        await user.click(editTrigger);

        await waitFor(() => {
            expect(editTrigger).toHaveAttribute('data-selected');
            expect(editTab).toBeVisible();
            expect(editTab.parentNode).toHaveAttribute('data-selected');
            expect(previewTab).not.toBeVisible();
            expect(splitTab).not.toBeVisible();
        });

        let textArea = editTab.querySelector(
            '[data-scope="markdown-editor"][data-part="textarea"]',
        );

        expect(textArea).toHaveValue(window.testing.args.value);

        await fireEvent.change(textArea, { target: { value: '' } });

        await waitFor(() => {
            expect(textArea).toHaveValue('');
            expect(window.testing.args.onChange).toBeCalledTimes(1);
            expect(window.testing.args.onChange).toHaveBeenLastCalledWith('');
        });

        const newValue = generateMarkdown();
        const expectedOutput = convertStringToMarkdown(newValue);

        await fireEvent.change(textArea, { target: { value: newValue } });

        await waitFor(() => {
            expect(textArea).toHaveValue(newValue);
            expect(window.testing.args.onChange).toBeCalledTimes(2);
            expect(window.testing.args.onChange).toHaveBeenLastCalledWith(newValue);
        });

        await fireEvent.click(previewTrigger);

        await waitFor(() => {
            expect(previewTrigger).toHaveAttribute('data-selected');
            expect(editTab).not.toBeVisible();
            expect(previewTab).toBeVisible();
            expect(previewTab.parentNode).toHaveAttribute('data-selected');
            expect(splitTab).not.toBeVisible();
        });

        let preview = previewTab.querySelector(
            '[data-scope="markdown-editor"][data-part="preview"]',
        );

        expect(previewTab.innerHTML).toBe(expectedOutput);

        await fireEvent.click(splitTrigger);

        await waitFor(() => {
            expect(splitTrigger).toHaveAttribute('data-selected');
            expect(editTab).not.toBeVisible();
            expect(previewTab).not.toBeVisible();
            expect(splitTab).toBeVisible();
            expect(splitTab.parentNode).toHaveAttribute('data-selected');
        });

        textArea = splitTab.querySelector('[data-scope="markdown-editor"][data-part="textarea"]');
        preview = splitTab.querySelector('[data-scope="markdown-editor"][data-part="preview"]');

        expect(textArea).toHaveValue(newValue);
        expect(preview.innerHTML).toBe(expectedOutput);
    });
};
