import { within, expect, userEvent, waitFor } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const linearBasic = async ({ globals, canvasElement, step }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    let root = canvasElement.querySelector('[data-scope="progress"][data-part="root"]');
    let startTrigger = canvas.getByTestId('start-trigger');
    let cancelTrigger = canvas.getByTestId('cancel-trigger');
    let track = canvas.getByTestId('track');
    let range = canvas.getByTestId('range');

    const fillWidth = track.getBoundingClientRect().width;
    const currentWidth = (fillWidth * window.testing.args.value) / 100;

    expect(root).toHaveAttribute('data-value', window.testing.args.value.toString());
    expect(range).toHaveStyle({ width: `${currentWidth}px` });

    const user = userEvent.setup();

    await step('controlled', async () => {
        window.testing.updateArgs({ controllable: true, value: 66 });

        await sleep(200);

        // перерендер
        root = canvasElement.querySelector('[data-scope="progress"][data-part="root"]');
        startTrigger = canvas.getByTestId('start-trigger');
        cancelTrigger = canvas.getByTestId('cancel-trigger');
        track = canvas.getByTestId('track');
        range = canvas.getByTestId('range');

        const expectedWidth = (fillWidth * window.testing.args.value) / 100;

        await waitFor(() =>
            expect(root).toHaveAttribute('data-value', window.testing.args.value.toString()),
        );
        expect(range.getBoundingClientRect().width).toBeCloseTo(expectedWidth, -0.1);
    });

    await step('start/stop', async () => {
        window.testing.updateArgs({ ...props, step: 3, speed: 77 });

        await sleep(200);

        // перерендер
        root = canvasElement.querySelector('[data-scope="progress"][data-part="root"]');
        startTrigger = canvas.getByTestId('start-trigger');
        cancelTrigger = canvas.getByTestId('cancel-trigger');
        track = canvas.getByTestId('track');
        range = canvas.getByTestId('range');

        const expectedValue =
            window.testing.args.value +
            window.testing.args.step * Math.ceil(1000 / window.testing.args.speed);
        const expectedWiidth = (fillWidth * expectedValue) / 100;

        await user.click(startTrigger);

        await sleep(1000);

        await user.click(cancelTrigger);

        await sleep(500);

        expect(root).toHaveAttribute('data-value', expectedValue.toString());
        expect(range.getBoundingClientRect().width).toBeCloseTo(expectedWiidth, -0.1);
    });
};
