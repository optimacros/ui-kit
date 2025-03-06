import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { uniqWith, isEqual, round } from '@optimacros-ui/utils';
import { StoryContext } from '@storybook/react';

export const minStepBetweenThumbs = async ({ globals, canvasElement }: StoryContext) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs({
        ...props,
        defaultValue: [4, 6],
        step: 0.2,
        min: 2,
        max: 10,
        minStepsBetweenThumbs: 1,
    });

    await window.testing.resetStory();

    const canvas = within(canvasElement);

    const root = canvasElement.querySelector('[data-scope="slider"][data-part="root"]');
    const container = canvas.getByTestId('container');
    const output = canvas.getByTestId('output');
    const control = canvas.getByTestId('control');
    const track = canvas.getByTestId('track');
    const range = canvas.getByTestId('range');
    const [thumb1, thumb2] = canvas.getAllByTestId('thumb');
    const hiddenInput1 = thumb1.querySelector('input');
    const hiddenInput2 = thumb2.querySelector('input');

    expect(root).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(control).toBeInTheDocument();
    expect(output).toBeInTheDocument();
    expect(track).toBeInTheDocument();
    expect(range).toBeInTheDocument();
    expect(thumb1).toBeInTheDocument();
    expect(thumb2).toBeInTheDocument();
    expect(hiddenInput1).toBeInTheDocument();
    expect(hiddenInput1).not.toBeVisible();
    expect(hiddenInput2).toBeInTheDocument();
    expect(hiddenInput2).not.toBeVisible();

    const getActualValue = () => {
        const outputValue = output.textContent.split(' - ').map((i) => +i);

        const hiddenInputValue = [+hiddenInput1.value, +hiddenInput2.value];

        const trackRect = track.getBoundingClientRect();
        const rangeRect = range.getBoundingClientRect();

        const thumb1OffsetLeft = rangeRect.left - trackRect.left;
        const thumb2OffsetLeft = rangeRect.right - trackRect.left;

        const { min, max } = window.testing.args;

        const rangeInUnits = max - min;

        const sliderValue = [
            round((thumb1OffsetLeft / trackRect.width) * rangeInUnits, 1) + min,
            round((thumb2OffsetLeft / trackRect.width) * rangeInUnits, 1) + min,
        ];

        const uniqueValues = uniqWith([outputValue, hiddenInputValue, sliderValue], isEqual);

        if (uniqueValues.length > 1) {
            throw new Error(
                `There is a difference between values: outputValue ${outputValue} / sliderValue ${sliderValue} / $hiddenInputValue {hiddenInputValue}`,
            );
        }

        return uniqueValues[0];
    };

    expect(getActualValue()).toEqual(window.testing.args.defaultValue);

    await window.takeScreenshot?.();

    const user = userEvent.setup();

    await user.keyboard('{Tab}');

    await waitFor(() => expect(thumb1).toHaveAttribute('data-focus'));

    await user.keyboard('{ArrowRight>4/}');

    expect(getActualValue()).toEqual([4.8, 6]);
    expect(window.testing.args.onValueChange).toBeCalledTimes(4);
    expect(window.testing.args.onValueChangeEnd).toBeCalledTimes(4);
    expect(window.testing.args.onValueChange).toHaveBeenLastCalledWith({ value: [4.8, 6] });
    // expect(window.testing.args.onValueChangeEnd).toHaveBeenLastCalledWith({ value: [4.8, 6] });

    await user.keyboard('{Tab}');

    await waitFor(() => expect(thumb2).toHaveAttribute('data-focus'));

    await user.keyboard('{ArrowLeft>3/}');

    expect(getActualValue()).toEqual([4.8, 5.8]);
    expect(window.testing.args.onValueChange).toBeCalledTimes(5);
    expect(window.testing.args.onValueChangeEnd).toBeCalledTimes(7);
    expect(window.testing.args.onValueChange).toHaveBeenLastCalledWith({
        value: [4.8, 5.8],
    });
    // expect(window.testing.args.onValueChangeEnd).toHaveBeenLastCalledWith({
    //     value: [4.8, 5.8],
    // });
};
