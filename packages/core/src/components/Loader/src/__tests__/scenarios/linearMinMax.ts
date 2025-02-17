import { within, expect, userEvent } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const linearMinMax = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({
        ...props,
        controllable: true,
        value: 50,
        step: 15,
        speed: 200,
        min: 0,
        max: 100,
        infinite: true,
    });
    window.testing.updateArgs({
        controllable: false,
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
    expect(range).toHaveStyle({ width: `${currentWidth}px` });

    const user = userEvent.setup();

    let expectedValue = 50;
    let expectedWiidth = (fillWidth * expectedValue) / 100;

    expect(root).toHaveAttribute('data-value', expectedValue.toString());
    expect(range.getBoundingClientRect().width).toBeCloseTo(expectedWiidth, -0.1);

    await user.click(startTrigger);

    await sleep(13000);

    await user.click(cancelTrigger);

    await sleep(500);

    expectedValue = 43;
    expectedWiidth = (fillWidth * expectedValue) / 100;

    expect(root).toHaveAttribute('data-value', expectedValue.toString());
    expect(range.getBoundingClientRect().width).toBeCloseTo(expectedWiidth, -0.1);
};
