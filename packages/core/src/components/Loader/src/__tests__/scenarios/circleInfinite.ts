import { within, expect, userEvent } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const circleInfinite = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({
        ...props,
        value: 90,
        step: 20,
        speed: 200,
        infinite: true,
    });
    window.testing.updateArgs({
        controllable: false,
    });

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const root = canvasElement.querySelector('[data-scope="progress"][data-part="root"]');
    const startTrigger = canvas.getByTestId('start-trigger');
    const cancelTrigger = canvas.getByTestId('cancel-trigger');
    const circle = canvas.getByTestId('circle');
    const track = canvas.getByTestId('track');
    const range = canvas.getByTestId('range');

    expect(root).toHaveAttribute('data-value', window.testing.args.value.toString());
    expect(circle).toBeInTheDocument();
    expect(track).toBeInTheDocument();
    expect(range).toBeInTheDocument();

    const expectedValue = 10;

    await user.click(startTrigger);

    await sleep(300);

    await user.click(cancelTrigger);

    await sleep(200);

    expect(root).toHaveAttribute('data-value', expectedValue.toString());
};
