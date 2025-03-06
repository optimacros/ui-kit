import { expect, fireEvent, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';
import { StoryContext } from '@storybook/react';

export const basic = async ({ globals, canvasElement, step }: StoryContext) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const canvas = within(canvasElement);

    let root = canvasElement.querySelector('[data-scope="slider"][data-part="root"]');
    let container = canvas.getByTestId('container');
    let output = canvas.getByTestId('output');
    let control = canvas.getByTestId('control');
    let track = canvas.getByTestId('track');
    let range = canvas.getByTestId('range');
    let thumb = canvas.getByTestId('thumb');
    let hiddenInput = thumb.querySelector('input');

    expect(root).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(control).toBeInTheDocument();
    expect(output).toBeInTheDocument();
    expect(track).toBeInTheDocument();
    expect(range).toBeInTheDocument();
    expect(thumb).toBeInTheDocument();
    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).not.toBeVisible();

    const getActualValue = () => {
        const outputValue = +output.textContent;

        const hiddenInputValue = +hiddenInput.value;

        const totalWidth = track.getBoundingClientRect().width;
        const rangeWidth = range.getBoundingClientRect().width;

        const { min, max } = window.testing.args;

        const rangeInUnits = max - min;

        const sliderValue = Math.round((rangeWidth / totalWidth) * rangeInUnits);

        if ([...new Set([hiddenInputValue, outputValue, sliderValue])].length > 1) {
            throw new Error(
                `There is a difference between values ${outputValue} / ${sliderValue} / ${hiddenInputValue}`,
            );
        }

        return outputValue;
    };

    expect(getActualValue()).toEqual(window.testing.args.defaultValue[0]);

    await window.takeScreenshot?.();

    const user = userEvent.setup();
    const { left, top, bottom, width } = track.getBoundingClientRect();

    await step('Value change (drag)', async () => {
        await fireEvent.pointerDown(thumb);
        await fireEvent.pointerMove(thumb, {
            clientX: left + width * 0.43,
            clientY: (top + bottom) / 2,
        });
        await sleep(1); // внутри запускается смена значения обернутая в queueMicrotask = ивент отжатия случается раньше смены
        await fireEvent.pointerUp(thumb);

        await waitFor(() => {
            expect(getActualValue()).toEqual(43);
            expect(window.testing.args.onValueChange).toBeCalledTimes(1);
            expect(window.testing.args.onValueChangeEnd).toBeCalledTimes(1);
            expect(window.testing.args.onValueChange).toHaveBeenLastCalledWith({ value: [43] });
            expect(window.testing.args.onValueChangeEnd).toHaveBeenLastCalledWith({ value: [43] });
        });

        await fireEvent.pointerDown(thumb);
        await fireEvent.pointerMove(thumb, {
            clientX: -50,
            clientY: (top + bottom) / 2,
        });
        await sleep(1);
        await fireEvent.pointerUp(thumb);

        await waitFor(() => {
            expect(getActualValue()).toEqual(window.testing.args.min);
            expect(window.testing.args.onValueChange).toBeCalledTimes(2);
            expect(window.testing.args.onValueChangeEnd).toBeCalledTimes(2);
            expect(window.testing.args.onValueChange).toHaveBeenLastCalledWith({ value: [0] });
            expect(window.testing.args.onValueChangeEnd).toHaveBeenLastCalledWith({ value: [0] });
        });
    });

    await step('Value change (click)', async () => {
        await window.testing.updateArgs(props);
        window.testing.args.onValueChange.mockClear();
        window.testing.args.onValueChangeEnd.mockClear();

        await window.testing.resetStory();

        root = canvasElement.querySelector('[data-scope="slider"][data-part="root"]');
        container = canvas.getByTestId('container');
        output = canvas.getByTestId('output');
        control = canvas.getByTestId('control');
        track = canvas.getByTestId('track');
        range = canvas.getByTestId('range');
        thumb = canvas.getByTestId('thumb');
        hiddenInput = thumb.querySelector('input');

        expect(getActualValue()).toEqual(window.testing.args.defaultValue[0]);

        await fireEvent.pointerDown(control, {
            clientX: left + width * 0.6,
            clientY: (top + bottom) / 2,
        });
        await sleep(1);
        await fireEvent.pointerUp(control);

        expect(getActualValue()).toEqual(60);
        expect(window.testing.args.onValueChange).toBeCalledTimes(1);
        expect(window.testing.args.onValueChangeEnd).toBeCalledTimes(1);
        expect(window.testing.args.onValueChange).toHaveBeenLastCalledWith({ value: [60] });
        expect(window.testing.args.onValueChangeEnd).toHaveBeenLastCalledWith({ value: [60] });
    });

    await step('Value change (keyboard)', async () => {
        await window.testing.updateArgs(props);
        window.testing.args.onValueChange.mockClear();
        window.testing.args.onValueChangeEnd.mockClear();

        await window.testing.resetStory();

        root = canvasElement.querySelector('[data-scope="slider"][data-part="root"]');
        container = canvas.getByTestId('container');
        output = canvas.getByTestId('output');
        control = canvas.getByTestId('control');
        track = canvas.getByTestId('track');
        range = canvas.getByTestId('range');
        thumb = canvas.getByTestId('thumb');
        hiddenInput = thumb.querySelector('input');

        expect(getActualValue()).toEqual(window.testing.args.defaultValue[0]);

        await user.keyboard('{Tab}');

        await waitFor(() => expect(thumb).toHaveAttribute('data-focus'));

        await window.takeScreenshot?.(`focused`);

        await user.keyboard('{ArrowLeft}');
        await sleep(100);
        await user.keyboard('{ArrowLeft}');
        await sleep(100);
        await user.keyboard('{ArrowLeft}');

        await waitFor(() => {
            expect(getActualValue()).toEqual(30);
            expect(window.testing.args.onValueChange).toBeCalledTimes(3);
            expect(window.testing.args.onValueChangeEnd).toBeCalledTimes(3);
            expect(window.testing.args.onValueChange).toHaveBeenLastCalledWith({ value: [30] });
            // expect(window.testing.args.onValueChangeEnd).toHaveBeenLastCalledWith({ value: [30] });
        });

        await user.keyboard('{ArrowRight>80/}');

        await waitFor(() => {
            expect(getActualValue()).toEqual(window.testing.args.max);
            expect(window.testing.args.onValueChange).toBeCalledTimes(73);
            expect(window.testing.args.onValueChangeEnd).toBeCalledTimes(83);
            expect(window.testing.args.onValueChange).toHaveBeenLastCalledWith({
                value: [window.testing.args.max],
            });
            expect(window.testing.args.onValueChangeEnd).toHaveBeenLastCalledWith({
                value: [window.testing.args.max],
            });
        });
    });

    await step('Value change (prop)', async () => {
        await window.testing.updateArgs(props);

        await window.testing.resetStory();

        root = canvasElement.querySelector('[data-scope="slider"][data-part="root"]');
        container = canvas.getByTestId('container');
        output = canvas.getByTestId('output');
        control = canvas.getByTestId('control');
        track = canvas.getByTestId('track');
        range = canvas.getByTestId('range');
        thumb = canvas.getByTestId('thumb');
        hiddenInput = thumb.querySelector('input');

        expect(getActualValue()).toEqual(window.testing.args.defaultValue[0]);

        await window.testing.updateArgs({ value: [77] });

        await waitFor(() => expect(getActualValue()).toEqual(77));
    });
};
