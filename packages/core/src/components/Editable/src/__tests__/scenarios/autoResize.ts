import { expect, userEvent, within } from '@storybook/test';
import { props } from '../props';

export const autoResize = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs({
        ...props,
        edit: true,
        autoResize: true,
    });

    await window.testing.resetStory();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('root');
    const input = canvas.getByTestId('input');
    const preview = canvas.getByTestId('preview');

    expect(root).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toBeVisible();
    expect(input).toHaveValue('');
    expect(input.getBoundingClientRect().width).toBeGreaterThan(70);
    expect(input.getBoundingClientRect().width).toBeLessThan(75);
    expect(preview).toBeInTheDocument();
    expect(preview).not.toBeVisible();

    await window.takeScreenshot?.();

    const user = userEvent.setup();

    await user.keyboard('012345678901234567890123456789');

    expect(input).toHaveValue('012345678901234567890123456789');

    expect(input.getBoundingClientRect().width).toBeGreaterThan(235);
    expect(input.getBoundingClientRect().width).toBeLessThan(245);
};
