import { within, expect, userEvent, waitFor } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const circleBasic = async ({ globals, canvasElement, step }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    let root = canvasElement.querySelector('[data-scope="progress"][data-part="root"]');
    let startTrigger = canvas.getByTestId('start-trigger');
    let cancelTrigger = canvas.getByTestId('cancel-trigger');
    const circle = canvas.getByTestId('circle');
    const track = canvas.getByTestId('track');
    const range = canvas.getByTestId('range');

    expect(root).toHaveAttribute('data-value', window.testing.args.value.toString());
    expect(circle).toBeInTheDocument();
    expect(track).toBeInTheDocument();
    expect(range).toBeInTheDocument();

    const user = userEvent.setup();

    await step('controlled', async () => {
        window.testing.updateArgs({ controllable: true, value: 66 });

        await sleep(200);

        // перерендер
        root = canvasElement.querySelector('[data-scope="progress"][data-part="root"]');
        startTrigger = canvas.getByTestId('start-trigger');
        cancelTrigger = canvas.getByTestId('cancel-trigger');

        await waitFor(() =>
            expect(root).toHaveAttribute('data-value', window.testing.args.value.toString()),
        );
    });

    await step('start/stop', async () => {
        window.testing.updateArgs({ ...props, step: 3, speed: 77 });

        await sleep(200);

        // перерендер
        root = canvasElement.querySelector('[data-scope="progress"][data-part="root"]');
        startTrigger = canvas.getByTestId('start-trigger');
        cancelTrigger = canvas.getByTestId('cancel-trigger');

        const expectedValue =
            window.testing.args.value +
            window.testing.args.step * Math.ceil(1000 / window.testing.args.speed);

        await user.click(startTrigger);

        await sleep(1000);

        await user.click(cancelTrigger);

        await sleep(500);

        expect(root).toHaveAttribute('data-value', expectedValue.toString());
    });
};
