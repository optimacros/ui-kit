import { expect, fireEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const basic = async ({ globals, canvasElement, step }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    let root = canvas.getByTestId('root');
    let control = canvas.getByTestId('control');
    let input = control.querySelector('input[type="checkbox"]') as HTMLInputElement;
    let checkedIcon = canvas.getByTestId('checked-icon');
    let uncheckedIcon = canvas.getByTestId('unchecked-icon');

    expect(root).toBeInTheDocument();
    expect(control).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input.checked).toBeFalsy();
    expect(checkedIcon).toBeInTheDocument();
    expect(checkedIcon).not.toBeVisible();
    expect(uncheckedIcon).toBeInTheDocument();
    expect(uncheckedIcon).toBeVisible();

    await window.takeScreenshot?.();

    await step('check/unckeck', async () => {
        await fireEvent.click(root);

        await waitFor(() => expect(input.checked).toBeTruthy());
        expect(checkedIcon).toBeVisible();
        expect(uncheckedIcon).not.toBeVisible();

        await window.takeScreenshot?.(`checked`);

        await fireEvent.click(root);

        await waitFor(() => expect(input.checked).toBeFalsy());
        expect(checkedIcon).not.toBeVisible();
        expect(uncheckedIcon).toBeVisible();
    });

    await step('check/unckeck (controlled)', async () => {
        window.testing.updateArgs({ controllable: true });
        window.testing.args.onCheckedChange.mockClear();

        await sleep(100);

        // все как-то жестко перерендерилось
        root = canvas.getByTestId('root');
        control = canvas.getByTestId('control');
        input = control.querySelector('input[type="checkbox"]') as HTMLInputElement;
        checkedIcon = canvas.getByTestId('checked-icon');
        uncheckedIcon = canvas.getByTestId('unchecked-icon');

        await fireEvent.click(root);

        await sleep(100);

        expect(window.testing.args.onCheckedChange).toBeCalledTimes(1);
        expect(window.testing.args.onCheckedChange).toBeCalledWith({ checked: true });

        expect(input.checked).toBeFalsy();
        expect(checkedIcon).not.toBeVisible();
        expect(uncheckedIcon).toBeVisible();

        window.testing.updateArgs({ checked: true });

        await sleep(100);

        expect(input.checked).toBeTruthy();
        expect(checkedIcon).toBeVisible();
        expect(uncheckedIcon).not.toBeVisible();

        await fireEvent.click(root);

        await sleep(100);

        expect(window.testing.args.onCheckedChange).toBeCalledTimes(2);
        expect(window.testing.args.onCheckedChange).toBeCalledWith({ checked: false });

        expect(input.checked).toBeTruthy();
        expect(checkedIcon).toBeVisible();
        expect(uncheckedIcon).not.toBeVisible();

        window.testing.updateArgs({ checked: false });

        await sleep(100);

        expect(input.checked).toBeFalsy();
        expect(checkedIcon).not.toBeVisible();
        expect(uncheckedIcon).toBeVisible();
    });
};
