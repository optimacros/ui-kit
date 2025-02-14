import { within, expect, userEvent } from '@storybook/test';
import { props } from '../props';

export const step = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({ ...props, step: 15, maxValue: 1111 });

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('root');
    const value = canvas.getByTestId('value');
    const increaseTrigger = canvas.getByTestId('increase-trigger');
    const decreaseTrigger = canvas.getByTestId('decrease-trigger');

    const { defaultValue: initialValue, step } = window.testing.args;

    expect(root).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent(`${initialValue}`);
    expect(increaseTrigger).toBeInTheDocument();
    expect(decreaseTrigger).toBeInTheDocument();

    await window.takeScreenshot?.();

    const user = userEvent.setup();

    await user.click(increaseTrigger);
    await user.click(increaseTrigger);
    await user.click(increaseTrigger);

    expect(value).toHaveTextContent(`${initialValue + 3 * step}`);

    await user.click(decreaseTrigger);
    await user.click(decreaseTrigger);
    await user.click(decreaseTrigger);
    await user.click(decreaseTrigger);
    await user.click(decreaseTrigger);

    expect(value).toHaveTextContent(`${initialValue + 3 * step - 5 * step}`);
};
