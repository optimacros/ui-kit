import { expect, fireEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const basic = async ({ globals, canvasElement, step }) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('root');
    const control = canvas.getByTestId('control');
    const input = control.querySelector('input[type="checkbox"]') as HTMLInputElement;
    const checkedIcon = canvas.getByTestId('checked-icon');
    const uncheckedIcon = canvas.getByTestId('unchecked-icon');

    expect(root).toBeInTheDocument();
    expect(control).toBeInTheDocument();
    expect(control).toHaveAttribute('data-state', 'unchecked');
    expect(input).toBeInTheDocument();
    expect(input.checked).toBeFalsy();
    expect(checkedIcon).toBeInTheDocument();
    expect(checkedIcon).not.toBeVisible();
    expect(uncheckedIcon).toBeInTheDocument();
    expect(uncheckedIcon).toBeVisible();

    await window.takeScreenshot?.();

    await step('check/unckeck', async () => {
        await fireEvent.click(root);

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'checked');
            expect(input.checked).toBeTruthy();
            expect(checkedIcon).toBeVisible();
            expect(uncheckedIcon).not.toBeVisible();
        });

        await window.takeScreenshot?.(`checked`);

        await fireEvent.click(root);

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'unchecked');
            expect(input.checked).toBeFalsy();
            expect(checkedIcon).not.toBeVisible();
            expect(uncheckedIcon).toBeVisible();
        });
    });

    await step('check/unckeck (controlled)', async () => {
        await window.testing.updateArgs({ checked: false });
        window.testing.args.onCheckedChange.mockClear();

        await window.testing.resetStory();

        const root = canvas.getByTestId('root');
        const control = canvas.getByTestId('control');
        const input = control.querySelector('input[type="checkbox"]') as HTMLInputElement;
        const checkedIcon = canvas.getByTestId('checked-icon');
        const uncheckedIcon = canvas.getByTestId('unchecked-icon');

        expect(control).toHaveAttribute('data-state', 'unchecked');
        expect(input.checked).toBeFalsy();
        expect(checkedIcon).not.toBeVisible();
        expect(uncheckedIcon).toBeVisible();

        await fireEvent.click(root);

        await sleep(100);

        expect(window.testing.args.onCheckedChange).toBeCalledTimes(1);
        expect(window.testing.args.onCheckedChange).toHaveBeenLastCalledWith({ checked: true });

        expect(control).toHaveAttribute('data-state', 'unchecked');
        //expect(input.checked).toBeFalsy();
        expect(checkedIcon).not.toBeVisible();
        expect(uncheckedIcon).toBeVisible();

        await window.testing.updateArgs({ checked: true });

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'checked');
            expect(input.checked).toBeTruthy();
            expect(checkedIcon).toBeVisible();
            expect(uncheckedIcon).not.toBeVisible();
        });

        await fireEvent.click(root);

        await sleep(100);

        expect(window.testing.args.onCheckedChange).toBeCalledTimes(2);
        expect(window.testing.args.onCheckedChange).toBeCalledWith({ checked: false });

        expect(control).toHaveAttribute('data-state', 'checked');
        //expect(input.checked).toBeTruthy();
        expect(checkedIcon).toBeVisible();
        expect(uncheckedIcon).not.toBeVisible();

        await window.testing.updateArgs({ checked: false });

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'unchecked');
            expect(input.checked).toBeFalsy();
            expect(checkedIcon).not.toBeVisible();
            expect(uncheckedIcon).toBeVisible();
        });
    });
};
