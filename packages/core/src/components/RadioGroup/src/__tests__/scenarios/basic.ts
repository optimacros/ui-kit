import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const basic = async ({ globals, canvasElement, step }) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const canvas = within(canvasElement);

    const root = canvasElement.querySelector('[data-scope="radio-group"][data-part="root"]');
    const item1 = canvas.getByTestId('item-1');
    const control1 = canvas.getByTestId('control-1');
    const text1 = canvas.getByTestId('control-1');
    const item2 = canvas.getByTestId('item-2');
    const control2 = canvas.getByTestId('control-2');
    const text2 = canvas.getByTestId('control-2');

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
        await window.testing.updateArgs({ ...props, value: null });
        window.testing.args.onValueChange.mockClear();

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

        await window.testing.updateArgs({ value: 'gradient' });

        await waitFor(() => {
            expect(item1).toHaveAttribute('data-state', 'checked');
            expect(control1).toHaveAttribute('data-state', 'checked');
            expect(text1).toHaveAttribute('data-state', 'checked');
            expect(item2).toHaveAttribute('data-state', 'unchecked');
            expect(control2).toHaveAttribute('data-state', 'unchecked');
            expect(text2).toHaveAttribute('data-state', 'unchecked');
        });

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

        await window.testing.updateArgs({ value: 'partialGradient' });

        await waitFor(() => {
            expect(item1).toHaveAttribute('data-state', 'unchecked');
            expect(control1).toHaveAttribute('data-state', 'unchecked');
            expect(text1).toHaveAttribute('data-state', 'unchecked');
            expect(item2).toHaveAttribute('data-state', 'checked');
            expect(control2).toHaveAttribute('data-state', 'checked');
            expect(text2).toHaveAttribute('data-state', 'checked');
        });
    });
};
