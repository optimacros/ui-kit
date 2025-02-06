import { within, expect, fireEvent, waitFor, userEvent, Mock } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const base = async ({ canvasElement, step, globals }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('checkbox-root');
    const control = canvas.getByTestId('checkbox-control');
    const input = canvas.getByTestId('hidden-input');

    expect(root).toBeInTheDocument();
    expect(control).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    expect(root).toHaveAttribute('data-state', 'unchecked');
    expect(control).toHaveAttribute('data-state', 'unchecked');
    expect(input).not.toHaveAttribute('checked');

    await window.takeScreenshot?.();

    const user = userEvent.setup();

    await step('base', async () => {
        await fireEvent.click(root);

        await waitFor(() => expect(root).toHaveAttribute('data-state', 'checked'));
        expect(control).toHaveAttribute('data-state', 'checked');
        expect(input).toHaveAttribute('checked');

        await sleep(100);

        await window.takeScreenshot?.('checked');

        await fireEvent.click(root);

        await waitFor(() => expect(root).toHaveAttribute('data-state', 'unchecked'));
        expect(control).toHaveAttribute('data-state', 'unchecked');
        expect(input).not.toHaveAttribute('checked');

        (document.activeElement as HTMLElement).blur();

        await user.keyboard('{tab}');

        expect(root).toHaveAttribute('data-focus');
        expect(control).toHaveAttribute('data-focus');

        await user.keyboard('[space]');

        await waitFor(() => expect(root).toHaveAttribute('data-state', 'checked'));
        expect(control).toHaveAttribute('data-state', 'checked');
        expect(input).toHaveAttribute('checked');

        await user.keyboard('[space]');

        await waitFor(() => expect(root).toHaveAttribute('data-state', 'unchecked'));
        expect(control).toHaveAttribute('data-state', 'unchecked');
        expect(input).not.toHaveAttribute('checked');

        window.testing.updateArgs({ disabled: true });

        await sleep(100);

        await fireEvent.click(root);

        await sleep(100);

        expect(root).toHaveAttribute('data-state', 'unchecked');
        expect(control).toHaveAttribute('data-state', 'unchecked');
        expect(input).not.toHaveAttribute('checked');
    });

    await step('controlled', async () => {
        (props.onCheckedChange as Mock).mockClear();
        window.testing.updateArgs({ ...props, checked: false });

        await sleep(100);

        await waitFor(() => expect(root).toHaveAttribute('data-state', 'unchecked'));
        expect(control).toHaveAttribute('data-state', 'unchecked');
        expect(input).not.toHaveAttribute('checked');

        await fireEvent.click(root);

        await sleep(100);

        expect(root).toHaveAttribute('data-state', 'unchecked');
        expect(control).toHaveAttribute('data-state', 'unchecked');
        expect(input).not.toHaveAttribute('checked');

        expect(props.onCheckedChange).toBeCalledTimes(1);
        expect(props.onCheckedChange).toBeCalledWith({ checked: true });

        window.testing.updateArgs({ checked: true });

        await waitFor(() => expect(root).toHaveAttribute('data-state', 'checked'));
        expect(control).toHaveAttribute('data-state', 'checked');
        expect(input).toHaveAttribute('checked');

        await fireEvent.click(root);

        await sleep(100);

        expect(root).toHaveAttribute('data-state', 'checked');
        expect(control).toHaveAttribute('data-state', 'checked');
        expect(input).toHaveAttribute('checked');

        expect(props.onCheckedChange).toBeCalledTimes(2);
        expect(props.onCheckedChange).toBeCalledWith({ checked: false });

        window.testing.updateArgs({ checked: false });

        await sleep(100);

        expect(root).toHaveAttribute('data-state', 'unchecked');
        expect(control).toHaveAttribute('data-state', 'unchecked');
        expect(input).not.toHaveAttribute('checked');
    });
};
