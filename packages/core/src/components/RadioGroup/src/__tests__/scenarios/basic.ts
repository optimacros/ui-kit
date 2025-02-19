import { expect, userEvent, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const basic = async ({ globals, canvasElement, step }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    let root = canvasElement.querySelector('[data-scope="radio-group"][data-part="root"]');
    let item1 = canvas.getByTestId('item-1');
    let control1 = canvas.getByTestId('control-1');
    let text1 = canvas.getByTestId('control-1');
    let item2 = canvas.getByTestId('item-2');
    let control2 = canvas.getByTestId('control-2');
    let text2 = canvas.getByTestId('control-2');

    expect(root).toBeInTheDocument();
    expect(item1).toBeInTheDocument();
    expect(item1).toHaveAttribute('data-state', 'unchecked');
    expect(control1).toBeInTheDocument();
    expect(control1).toHaveAttribute('data-state', 'unchecked');
    expect(text1).toBeInTheDocument();
    expect(text1).toHaveAttribute('data-state', 'unchecked');
    expect(item2).toBeInTheDocument();
    expect(item2).toHaveAttribute('data-state', 'unchecked');
    expect(control2).toBeInTheDocument();
    expect(control2).toHaveAttribute('data-state', 'unchecked');
    expect(text2).toBeInTheDocument();
    expect(text2).toHaveAttribute('data-state', 'unchecked');

    const user = userEvent.setup();

    await step('select', async () => {
        await user.click(control1);

        expect(item1).toHaveAttribute('data-state', 'checked');
        expect(control1).toHaveAttribute('data-state', 'checked');
        expect(text1).toHaveAttribute('data-state', 'checked');
        expect(item2).toHaveAttribute('data-state', 'unchecked');
        expect(control2).toHaveAttribute('data-state', 'unchecked');
        expect(text2).toHaveAttribute('data-state', 'unchecked');

        await user.click(text2);

        expect(item1).toHaveAttribute('data-state', 'unchecked');
        expect(control1).toHaveAttribute('data-state', 'unchecked');
        expect(text1).toHaveAttribute('data-state', 'unchecked');
        expect(item2).toHaveAttribute('data-state', 'checked');
        expect(control2).toHaveAttribute('data-state', 'checked');
        expect(text2).toHaveAttribute('data-state', 'checked');
    });

    await step('select controllable', async () => {
        window.testing.updateArgs({ ...props, value: null, controllable: true });
        window.testing.args.onValueChange.mockClear();

        await sleep(500);

        // перерендер
        root = canvasElement.querySelector('[data-scope="radio-group"][data-part="root"]');
        item1 = canvas.getByTestId('item-1');
        control1 = canvas.getByTestId('control-1');
        text1 = canvas.getByTestId('control-1');
        item2 = canvas.getByTestId('item-2');
        control2 = canvas.getByTestId('control-2');
        text2 = canvas.getByTestId('control-2');

        expect(item1).toHaveAttribute('data-state', 'unchecked');
        expect(control1).toHaveAttribute('data-state', 'unchecked');
        expect(text1).toHaveAttribute('data-state', 'unchecked');
        expect(item2).toHaveAttribute('data-state', 'unchecked');
        expect(control2).toHaveAttribute('data-state', 'unchecked');
        expect(text2).toHaveAttribute('data-state', 'unchecked');

        await user.click(text1);

        await sleep(500);

        expect(item1).toHaveAttribute('data-state', 'unchecked');
        expect(control1).toHaveAttribute('data-state', 'unchecked');
        expect(text1).toHaveAttribute('data-state', 'unchecked');
        expect(item2).toHaveAttribute('data-state', 'unchecked');
        expect(control2).toHaveAttribute('data-state', 'unchecked');
        expect(text2).toHaveAttribute('data-state', 'unchecked');

        expect(window.testing.args.onValueChange).toBeCalledTimes(1);
        expect(window.testing.args.onValueChange).toBeCalledWith({ value: 'gradient' });

        window.testing.updateArgs({ value: 'gradient' });

        await sleep(500);

        expect(item1).toHaveAttribute('data-state', 'checked');
        expect(control1).toHaveAttribute('data-state', 'checked');
        expect(text1).toHaveAttribute('data-state', 'checked');
        expect(item2).toHaveAttribute('data-state', 'unchecked');
        expect(control2).toHaveAttribute('data-state', 'unchecked');
        expect(text2).toHaveAttribute('data-state', 'unchecked');

        await user.click(control2);

        await sleep(500);

        expect(item1).toHaveAttribute('data-state', 'checked');
        expect(control1).toHaveAttribute('data-state', 'checked');
        expect(text1).toHaveAttribute('data-state', 'checked');
        expect(item2).toHaveAttribute('data-state', 'unchecked');
        expect(control2).toHaveAttribute('data-state', 'unchecked');
        expect(text2).toHaveAttribute('data-state', 'unchecked');

        expect(window.testing.args.onValueChange).toBeCalledTimes(2);
        expect(window.testing.args.onValueChange).toBeCalledWith({ value: 'partialGradient' });

        window.testing.updateArgs({ value: 'partialGradient' });

        await sleep(500);

        expect(item1).toHaveAttribute('data-state', 'unchecked');
        expect(control1).toHaveAttribute('data-state', 'unchecked');
        expect(text1).toHaveAttribute('data-state', 'unchecked');
        expect(item2).toHaveAttribute('data-state', 'checked');
        expect(control2).toHaveAttribute('data-state', 'checked');
        expect(text2).toHaveAttribute('data-state', 'checked');
    });
};
