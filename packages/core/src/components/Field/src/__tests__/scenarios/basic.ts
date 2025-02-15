import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';

export const basic = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('root');
    const input = canvas.getByTestId('input');
    const label = canvas.getByTestId('label');
    const hint = canvas.getByTestId('hint');

    expect(root).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveAttribute('value');
    expect(label).toBeInTheDocument();
    expect(hint).toBeInTheDocument();
    expect(hint).not.toBeVisible();

    await window.takeScreenshot?.();

    const user = userEvent.setup();

    await user.click(input);

    await user.keyboard('value');

    await waitFor(() => expect(input).toHaveValue('value'));
    expect(hint).toBeVisible();

    await window.takeScreenshot?.('value');
};
