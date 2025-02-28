import { expect, fireEvent, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { cloneDeep } from '@optimacros-ui/utils';
import { StoryContext } from '@storybook/react';

export const basic = async ({ globals, canvasElement, step }: StoryContext) => {
    if (!globals.test) {
        return;
    }

    // это говно мутирует value - нужно не дать ему добраться до пропсов
    window.testing.updateArgs(cloneDeep(props));

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const root = canvasElement.querySelector('[data-scope="slider"][data-part="root"]');
    const container = canvas.getByTestId('container');
    const output = canvas.getByTestId('output');
    const control = canvas.getByTestId('control');
    const track = canvas.getByTestId('track');
    const range = canvas.getByTestId('range');
    const thumb = canvas.getByTestId('thumb');
    const hiddenInput = thumb.querySelector('input');

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

    expect(getActualValue()).toEqual(window.testing.args.value[0]);

    await window.takeScreenshot?.();

    const user = userEvent.setup();
    const { left, top, bottom, width } = track.getBoundingClientRect();

    // нужно "активировать" компонент
    // иначе он не реагирует ни на что
    // я не понимаю, как это работает
    // вернее, концептуально понимаю, там в машине описано из какого состояния какие функции могут вызываться...
    // фокус или таб не помогает
    await fireEvent.pointerDown(control);
    await fireEvent.pointerUp(control);

    // этот клик как бы не считается
    expect(window.testing.args.onValueChange).toBeCalledTimes(0);
    expect(window.testing.args.onValueChangeEnd).toBeCalledTimes(0);

    await step('Value change (drag)', async () => {
        await fireEvent.pointerDown(thumb);
        await fireEvent.pointerMove(thumb, {
            clientX: left + width * 0.43,
            clientY: (top + bottom) / 2,
        });
        await fireEvent.pointerUp(thumb);

        expect(getActualValue()).toEqual(43);
        expect(window.testing.args.onValueChange).toBeCalledTimes(1);
        expect(window.testing.args.onValueChangeEnd).toBeCalledTimes(1);
        expect(window.testing.args.onValueChange).toHaveBeenLastCalledWith({ value: [43] });
        expect(window.testing.args.onValueChangeEnd).toHaveBeenLastCalledWith({ value: [43] });

        await fireEvent.pointerDown(thumb);
        await fireEvent.pointerMove(thumb, {
            clientX: -50,
            clientY: (top + bottom) / 2,
        });
        await fireEvent.pointerUp(thumb);

        expect(getActualValue()).toEqual(window.testing.args.min);
        expect(window.testing.args.onValueChange).toBeCalledTimes(2);
        expect(window.testing.args.onValueChangeEnd).toBeCalledTimes(2);
        expect(window.testing.args.onValueChange).toHaveBeenLastCalledWith({ value: [0] });
        expect(window.testing.args.onValueChangeEnd).toHaveBeenLastCalledWith({ value: [0] });
    });

    await step('Value change (click)', async () => {
        window.testing.updateArgs(cloneDeep(props));
        window.testing.args.onValueChange.mockClear();
        window.testing.args.onValueChangeEnd.mockClear();

        await waitFor(() => expect(getActualValue()).toEqual(window.testing.args.value[0]));

        await fireEvent.pointerDown(control);
        await fireEvent.pointerMove(control, {
            clientX: left + width * 0.6,
            clientY: (top + bottom) / 2,
        });
        await fireEvent.pointerUp(control);

        expect(getActualValue()).toEqual(60);
        // хз, почему 2
        expect(window.testing.args.onValueChange).toBeCalledTimes(2);
        expect(window.testing.args.onValueChangeEnd).toBeCalledTimes(1);
        expect(window.testing.args.onValueChange).toHaveBeenLastCalledWith({ value: [60] });
        expect(window.testing.args.onValueChangeEnd).toHaveBeenLastCalledWith({ value: [60] });
    });

    await step('Value change (keyboard)', async () => {
        window.testing.updateArgs(cloneDeep(props));
        window.testing.args.onValueChange.mockClear();
        window.testing.args.onValueChangeEnd.mockClear();
        (document.activeElement as HTMLElement).blur();

        await waitFor(() => expect(getActualValue()).toEqual(window.testing.args.value[0]));

        await user.keyboard('{Tab}');

        await waitFor(() => expect(thumb).toHaveAttribute('data-focus'));

        await window.takeScreenshot?.(`focused`);

        await user.keyboard('{ArrowLeft}{ArrowLeft}{ArrowLeft}');

        expect(getActualValue()).toEqual(30);
        expect(window.testing.args.onValueChange).toBeCalledTimes(3);
        expect(window.testing.args.onValueChangeEnd).toBeCalledTimes(3);
        expect(window.testing.args.onValueChange).toHaveBeenLastCalledWith({ value: [30] });
        expect(window.testing.args.onValueChangeEnd).toHaveBeenLastCalledWith({ value: [30] });

        await user.keyboard('{ArrowRight>80/}');

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

    await step('Value change (prop)', async () => {
        window.testing.updateArgs(cloneDeep(props));

        await waitFor(() => expect(getActualValue()).toEqual(window.testing.args.value[0]));

        window.testing.updateArgs({ value: [77] });

        await waitFor(() => expect(getActualValue()).toEqual(77));
    });
};
