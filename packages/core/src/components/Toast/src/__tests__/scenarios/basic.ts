import { within, expect, userEvent, waitFor } from '@storybook/test';
import { props } from '../props';
import { sleep, times } from '@optimacros-ui/utils';

export const basic = async ({ globals, canvasElement, step }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({ controllable: true });
    await sleep(1);
    window.testing.updateArgs(props);
    await sleep(1);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const group = canvasElement.querySelector('[data-scope="toast"][data-part="group"]');
    const createTrigger = canvas.getByTestId('create-trigger');
    const removeTrigger = canvas.getByTestId('remove-trigger');

    expect(group).not.toBeInTheDocument();
    expect(createTrigger).toBeInTheDocument();
    expect(removeTrigger).toBeInTheDocument();

    const user = userEvent.setup();

    await step('Max', async () => {
        await Promise.all(times(5, () => user.click(createTrigger)));

        await waitFor(() => {
            const group = canvasElement.querySelector('[data-scope="toast"][data-part="group"]');

            const toasts = group.querySelectorAll('[data-scope="toast"][data-part="root"]');

            expect(toasts).toHaveLength(5);
        });

        await user.click(removeTrigger);

        await waitFor(() => {
            const group = canvasElement.querySelector('[data-scope="toast"][data-part="group"]');

            expect(group).not.toBeInTheDocument();
        });

        window.testing.updateArgs({ controllable: true });
        await sleep(1);
        window.testing.updateArgs({ controllable: false, max: 3 });
        await sleep(1);

        await Promise.all(times(5, () => user.click(canvas.getByTestId('create-trigger'))));

        await waitFor(() => {
            const group = canvasElement.querySelector('[data-scope="toast"][data-part="group"]');

            const toasts = group.querySelectorAll('[data-scope="toast"][data-part="root"]');

            expect(toasts).toHaveLength(3);
        });

        await user.click(canvas.getByTestId('remove-trigger'));

        await waitFor(() => {
            const group = canvasElement.querySelector('[data-scope="toast"][data-part="group"]');

            expect(group).not.toBeInTheDocument();
        });
    });

    /*

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
    expect(range.getBoundingClientRect().width).toBeCloseTo(expectedWiidth, -0.1);*/
};
