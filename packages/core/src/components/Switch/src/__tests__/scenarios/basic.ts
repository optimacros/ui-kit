import { expect, fireEvent, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';
import { StoryContext } from '@storybook/react';
import { ComponentProps } from 'react';
import { Switch } from '../../';

export const basic = async ({
    globals,
    canvasElement,
    step,
}: StoryContext<ComponentProps<typeof Switch.Root>>) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({ controllable: true });
    await sleep(1);
    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const root = canvasElement.querySelector(
        '[data-scope="switch"][data-part="root"]',
    ) as HTMLLabelElement;
    const control = within(root).getByTestId('control');
    const thumb = within(root).getByTestId('thumb');
    const hiddenInput = root.querySelector('input') as HTMLInputElement;
    const label = root.querySelector('[data-scope="switch"][data-part="label"]') as HTMLSpanElement;

    expect(root).toBeInTheDocument();
    expect(control).toBeInTheDocument();
    expect(thumb).toBeInTheDocument();
    expect(hiddenInput).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(root).toHaveAttribute('data-size', window.testing.args.size);
    expect(root).toHaveAttribute('data-color', window.testing.args.color);

    const isChecked = () => {
        const root = canvasElement.querySelector(
            '[data-scope="switch"][data-part="root"]',
        ) as HTMLLabelElement;
        const control = within(root).getByTestId('control');
        const hiddenInput = root.querySelector('input') as HTMLInputElement;
        const label = root.querySelector(
            '[data-scope="switch"][data-part="label"]',
        ) as HTMLSpanElement;

        expect(root).toHaveAttribute('data-state', 'checked');
        expect(control).toHaveAttribute('data-state', 'checked');
        expect(label).toHaveAttribute('data-state', 'checked');
        expect(hiddenInput).toHaveAttribute('checked');
        expect(hiddenInput).toHaveAttribute('value', 'checked');
    };

    const isUnChecked = () => {
        const root = canvasElement.querySelector(
            '[data-scope="switch"][data-part="root"]',
        ) as HTMLLabelElement;
        const control = within(root).getByTestId('control');
        const hiddenInput = root.querySelector('input') as HTMLInputElement;
        const label = root.querySelector(
            '[data-scope="switch"][data-part="label"]',
        ) as HTMLSpanElement;

        expect(root).toHaveAttribute('data-state', 'unchecked');
        expect(control).toHaveAttribute('data-state', 'unchecked');
        expect(label).toHaveAttribute('data-state', 'unchecked');
        expect(hiddenInput).not.toHaveAttribute('checked');
        expect(hiddenInput).toHaveAttribute('value', 'checked');
    };

    isChecked();

    await window.takeScreenshot?.('checked');

    const user = userEvent.setup();

    await step('check/uncheck (click)', async () => {
        await user.click(root);

        await waitFor(isUnChecked);

        expect(window.testing.args.onCheckedChange).toBeCalledTimes(1);
        expect(window.testing.args.onCheckedChange).toHaveBeenLastCalledWith({ checked: false });

        // ...
        await fireEvent.click(root);

        await waitFor(isChecked);

        expect(window.testing.args.onCheckedChange).toBeCalledTimes(2);
        expect(window.testing.args.onCheckedChange).toHaveBeenLastCalledWith({ checked: true });
    });

    await step('check/uncheck (keyboard)', async () => {
        (document.activeElement as HTMLElement).blur();

        // первый таб фокусирует на thumb
        await user.keyboard('{Tab>2}');

        await waitFor(() => {
            expect(root).toHaveAttribute('data-focus');
            expect(control).toHaveAttribute('data-focus');
            expect(label).toHaveAttribute('data-focus');
        });

        await user.keyboard('[Space]');

        await waitFor(isUnChecked);

        expect(window.testing.args.onCheckedChange).toBeCalledTimes(3);
        expect(window.testing.args.onCheckedChange).toHaveBeenLastCalledWith({ checked: false });

        await user.keyboard('[Space]');

        await waitFor(isChecked);

        expect(window.testing.args.onCheckedChange).toBeCalledTimes(4);
        expect(window.testing.args.onCheckedChange).toHaveBeenLastCalledWith({ checked: true });
    });

    /*await step('check/uncheck (drag)', async () => {
        const { top, left, right } = control.getBoundingClientRect();

        console.info(top, left);

        await fireEvent.pointerDown(thumb, { isPrimary: true, button: 0 });
        await fireEvent.pointerMove(thumb, { clientX: top + 5, clientY: left + 5 });
        await fireEvent.pointerUp(thumb);

        await waitFor(isUnChecked);

        expect(window.testing.args.onCheckedChange).toBeCalledTimes(3);
        expect(window.testing.args.onCheckedChange).toHaveBeenLastCalledWith({ checked: false });

        await fireEvent.pointerDown(thumb, { isPrimary: true, button: 0 });
        await fireEvent.pointerMove(thumb, { clientX: top + 5, clientY: right - 5 });
        await fireEvent.pointerUp(thumb);

        await waitFor(isChecked);

        expect(window.testing.args.onCheckedChange).toBeCalledTimes(4);
        expect(window.testing.args.onCheckedChange).toHaveBeenLastCalledWith({ checked: true });
    });*/

    await step('check/uncheck (prop)', async () => {
        window.testing.updateArgs({ controllable: true, checked: false });

        await waitFor(isUnChecked);

        window.testing.updateArgs({ checked: true });

        await waitFor(isChecked);
    });
};
