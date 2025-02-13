import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { getTextFile, getImgFile } from '../files';

export const basic = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({ controllable: true });
    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('root');
    const input = canvas.getByTestId('input');
    const trigger = canvas.getByTestId('trigger');
    const clearTrigger = canvas.getByTestId('clear-trigger');

    expect(root).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(trigger).toBeInTheDocument();
    expect(clearTrigger).toBeInTheDocument();
    expect(clearTrigger).not.toBeVisible();

    await window.takeScreenshot?.();

    const user = userEvent.setup();

    await user.upload(input, [getTextFile(), getImgFile()]);

    expect(clearTrigger).toBeVisible();

    const textFileLabel = canvas.getByText('text.txt');
    const imgFileLabel = canvas.getByText('img.jpg');
    const deleteItemTriggers = canvas.getAllByTestId('delete-item-trigger');

    expect(textFileLabel).toBeInTheDocument();
    expect(imgFileLabel).toBeInTheDocument();
    expect(deleteItemTriggers).toHaveLength(2);

    await window.takeScreenshot?.('uploaded');

    await user.click(deleteItemTriggers[0]);

    await waitFor(() => expect(textFileLabel).not.toBeInTheDocument());

    await user.click(clearTrigger);

    await waitFor(() => expect(imgFileLabel).not.toBeInTheDocument());
    expect(clearTrigger).not.toBeVisible();
};
