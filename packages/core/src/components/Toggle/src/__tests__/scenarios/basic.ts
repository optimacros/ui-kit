import { expect, fireEvent, userEvent, waitFor } from '@storybook/test';
import { props } from '../props';
import { StoryContext } from '@storybook/react';
import { ComponentProps } from 'react';
import { Toggle } from '../../';

export const basic = async ({
    globals,
    canvasElement,
    step,
}: StoryContext<ComponentProps<typeof Toggle>>) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const root = canvasElement.querySelector(
        '[data-scope="toggle"][data-part="root"]',
    ) as HTMLLabelElement;
    const control = root.querySelector('[data-scope="toggle"][data-part="control"]') as HTMLElement;
    const hiddenInput = root.querySelector('input') as HTMLInputElement;
    const controlContent = control.querySelector('& > *');

    expect(root).toBeInTheDocument();
    expect(control).toBeInTheDocument();
    expect(hiddenInput).toBeInTheDocument();
    expect(controlContent).toBeInTheDocument();

    const isChecked = () => {
        const root = canvasElement.querySelector(
            '[data-scope="toggle"][data-part="root"]',
        ) as HTMLLabelElement;
        const control = root.querySelector(
            '[data-scope="toggle"][data-part="control"]',
        ) as HTMLElement;
        const hiddenInput = root.querySelector('input') as HTMLInputElement;

        expect(root).toHaveAttribute('data-state', 'checked');
        expect(control).toHaveAttribute('data-state', 'checked');
        expect(hiddenInput).toHaveAttribute('checked');
        expect(hiddenInput).toHaveAttribute('value', 'checked');
    };

    const isUnChecked = () => {
        const root = canvasElement.querySelector(
            '[data-scope="toggle"][data-part="root"]',
        ) as HTMLLabelElement;
        const control = root.querySelector(
            '[data-scope="toggle"][data-part="control"]',
        ) as HTMLElement;
        const hiddenInput = root.querySelector('input') as HTMLInputElement;

        expect(root).toHaveAttribute('data-state', 'unchecked');
        expect(control).toHaveAttribute('data-state', 'unchecked');
        expect(hiddenInput).not.toHaveAttribute('checked');
        expect(hiddenInput).toHaveAttribute('value', 'checked');
    };

    isChecked();

    await window.takeScreenshot?.('checked');

    const user = userEvent.setup();

    await step('check/uncheck (click)', async () => {
        await user.click(control);

        await waitFor(isUnChecked);

        expect(window.testing.args.onCheckedChange).toBeCalledTimes(1);
        expect(window.testing.args.onCheckedChange).toHaveBeenLastCalledWith({ checked: false });

        await window.takeScreenshot?.('unchecked');

        // ...
        await fireEvent.click(control);

        await waitFor(isChecked);

        expect(window.testing.args.onCheckedChange).toBeCalledTimes(2);
        expect(window.testing.args.onCheckedChange).toHaveBeenLastCalledWith({ checked: true });
    });

    await step('check/uncheck (keyboard)', async () => {
        (document.activeElement as HTMLElement).blur();

        await user.keyboard('{Tab}');

        await user.keyboard('[Space]');

        await waitFor(isUnChecked);

        expect(window.testing.args.onCheckedChange).toBeCalledTimes(3);
        expect(window.testing.args.onCheckedChange).toHaveBeenLastCalledWith({ checked: false });

        await user.keyboard('[Space]');

        await waitFor(isChecked);

        expect(window.testing.args.onCheckedChange).toBeCalledTimes(4);
        expect(window.testing.args.onCheckedChange).toHaveBeenLastCalledWith({ checked: true });
    });

    await step('check/uncheck (prop)', async () => {
        isChecked();

        await window.testing.updateArgs({ checked: false });

        await waitFor(isUnChecked);

        await window.testing.updateArgs({ checked: true });

        await waitFor(isChecked);
    });
};
