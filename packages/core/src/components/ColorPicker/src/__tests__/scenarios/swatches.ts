import { expect, userEvent, waitFor } from '@storybook/test';
import { props } from '../props';

export const swatches = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const trigger = canvasElement.querySelector('[data-scope="color-picker"][data-part="trigger"]');
    const content = document.querySelector('[data-scope="color-picker"][data-part="content"]');
    const label = document.querySelector('[data-scope="color-picker"][data-part="label"]');
    const input = document.querySelector(
        '[data-scope="color-picker"][data-part="control"] [data-scope="field"][data-part="input"]',
    );
    const swatches = document.querySelectorAll(
        '[data-scope="color-picker"][data-part="swatch-trigger"]',
    );

    expect(trigger).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-state', 'closed');
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('value', '#005599');
    expect(swatches.length).toBe(4);

    const user = userEvent.setup();

    await user.click(trigger);

    await waitFor(() => expect(content).toHaveAttribute('data-state', 'open'));
    expect(content).toBeVisible();

    await user.click(swatches[2]);

    const newValue = (swatches[2] as HTMLElement).dataset.value;

    await waitFor(() => expect(input).toHaveAttribute('value', newValue));

    await window.takeScreenshot?.('swatches-open-selected');
};
