import { within, expect, userEvent } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const linearInfinite = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({
        ...props,
        infinite: true,
        speed: 200,
        step: 20,
        value: 50,
        min: 25,
        max: 75,
    });

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const root = canvasElement.querySelector('[data-scope="progress"][data-part="root"]');
    const startTrigger = canvas.getByTestId('start-trigger');
    const cancelTrigger = canvas.getByTestId('cancel-trigger');
    const track = canvas.getByTestId('track');
    const range = canvas.getByTestId('range');

    const fillWidth = track.getBoundingClientRect().width;
    const currentWidth = (fillWidth * window.testing.args.value) / 100;

    expect(root).toHaveAttribute('data-value', window.testing.args.value.toString());
    expect(range.getBoundingClientRect().width).toBeCloseTo(currentWidth, -0.1);

    const user = userEvent.setup();

    await user.click(startTrigger);

    await sleep(700);

    await user.click(cancelTrigger);

    await sleep(500);

    const expectedValue = 60;
    const expectedWiidth =
        fillWidth *
        ((expectedValue - window.testing.args.min) /
            (window.testing.args.max - window.testing.args.min));

    expect(root).toHaveAttribute('data-value', expectedValue.toString());
    expect(range.getBoundingClientRect().width).toBeCloseTo(expectedWiidth, -0.1);
};
