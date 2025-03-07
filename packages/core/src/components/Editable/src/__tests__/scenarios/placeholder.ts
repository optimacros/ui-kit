import { expect, waitFor, within } from '@storybook/test';
import { props } from '../props';

export const placeholder = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('root');
    const input = canvas.getByTestId('input');
    const preview = canvas.getByTestId('preview');
    const editTrigger = canvas.getByTestId('edit-trigger');

    expect(root).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).not.toBeVisible();
    expect(input).toHaveAttribute('placeholder', window.testing.args.placeholder);
    expect(preview).toBeInTheDocument();
    expect(preview).toBeVisible();
    expect(preview).toHaveTextContent(window.testing.args.placeholder);
    expect(editTrigger).toBeInTheDocument();

    await window.takeScreenshot?.();

    await window.testing.updateArgs({
        edit: true,
    });

    await waitFor(() => expect(input).toBeVisible());
    expect(preview).not.toBeVisible();

    await window.takeScreenshot?.('preview-edit');
};
