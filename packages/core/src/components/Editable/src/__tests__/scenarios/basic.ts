import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const basic = async ({ globals, canvasElement, step }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('root');
    const input = canvas.getByTestId('input');
    const preview = canvas.getByTestId('preview');
    const editTrigger = canvas.getByTestId('edit-trigger');

    expect(root).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).not.toBeVisible();
    expect(preview).toBeInTheDocument();
    expect(preview).toBeVisible();
    expect(editTrigger).toBeInTheDocument();

    await window.takeScreenshot?.();

    const user = userEvent.setup();

    await step('open/close', async () => {
        window.testing.updateArgs(props);

        await sleep(100);

        await user.click(editTrigger);

        await waitFor(() => expect(input).toBeVisible());
        expect(preview).not.toBeVisible();
        expect(canvas.getByTestId('submit-trigger')).toBeInTheDocument();
        expect(canvas.getByTestId('cancel-trigger')).toBeInTheDocument();

        await window.takeScreenshot?.('edit');

        await user.click(canvas.getByTestId('cancel-trigger'));

        await waitFor(() => expect(canvas.getByTestId('edit-trigger')).toBeInTheDocument());
        expect(preview).toBeVisible();
        expect(input).not.toBeVisible();
    });

    await step('open/close controlled', async () => {
        window.testing.updateArgs({ ...props, 'edit.controlled': true });
        window.testing.args.onEditChange.mockClear();

        await sleep(100);

        await user.click(canvas.getByTestId('edit-trigger'));

        await sleep(100);

        expect(input).not.toBeVisible();
        expect(preview).toBeVisible();

        expect(window.testing.args.onEditChange).toBeCalledTimes(1);
        expect(window.testing.args.onEditChange).toBeCalledWith({ edit: true });

        window.testing.updateArgs({ edit: true });

        await waitFor(() => expect(preview).not.toBeVisible());
        expect(input).toBeVisible();

        await user.click(canvas.getByTestId('cancel-trigger'));
        await user.click(canvasElement);

        await sleep(100);

        expect(input).toBeVisible();
        expect(preview).not.toBeVisible();

        // 1,2 - trigger, 3 - outside
        // expect(window.testing.args.onEditChange).toBeCalledTimes(3);
        expect(window.testing.args.onEditChange).toBeCalledWith({ edit: false });

        window.testing.updateArgs({ edit: false });

        await waitFor(() => expect(preview).toBeVisible());
        expect(input).not.toBeVisible();
    });

    await step('edit/submit/revert', async () => {
        window.testing.updateArgs({ ...props, controllable: false });

        await sleep(100);

        await user.click(canvas.getByTestId('edit-trigger'));

        await waitFor(() => expect(canvas.getByTestId('input')).toBeVisible());
        expect(canvas.getByTestId('preview')).not.toBeVisible();
        expect(canvas.getByTestId('submit-trigger')).toBeInTheDocument();
        expect(canvas.getByTestId('cancel-trigger')).toBeInTheDocument();

        await user.keyboard('input value');

        expect(canvas.getByTestId('input')).toHaveValue('input value');

        await user.click(canvas.getByTestId('submit-trigger'));

        await waitFor(() => expect(canvas.getByTestId('input')).not.toBeVisible());
        expect(canvas.getByTestId('preview')).toBeVisible();

        expect(canvas.getByTestId('preview')).toHaveTextContent('input value');

        await user.click(canvas.getByTestId('edit-trigger'));

        await waitFor(() => expect(canvas.getByTestId('input')).toBeVisible());
        expect(canvas.getByTestId('preview')).not.toBeVisible();

        await user.keyboard(' updated');

        expect(canvas.getByTestId('input')).toHaveValue('input value updated');

        await user.click(canvas.getByTestId('cancel-trigger'));

        await waitFor(() => expect(canvas.getByTestId('input')).not.toBeVisible());
        expect(canvas.getByTestId('preview')).toBeVisible();

        expect(canvas.getByTestId('preview')).toHaveTextContent('input value');
    });

    await step('edit/submit/revert controllable', async () => {
        window.testing.updateArgs(props);
        window.testing.args.onValueChange.mockClear();
        window.testing.args.onValueCommit.mockClear();
        window.testing.args.onValueRevert.mockClear();

        await sleep(100);

        await user.click(canvas.getByTestId('edit-trigger'));

        await waitFor(() => expect(canvas.getByTestId('input')).toBeVisible());
        expect(canvas.getByTestId('preview')).not.toBeVisible();
        expect(canvas.getByTestId('submit-trigger')).toBeInTheDocument();
        expect(canvas.getByTestId('cancel-trigger')).toBeInTheDocument();

        await user.keyboard('input value');

        expect(canvas.getByTestId('input')).toHaveValue('');
        expect(window.testing.args.onValueChange).toBeCalledTimes(11);
        expect(window.testing.args.onValueChange).toHaveBeenLastCalledWith({ value: 'e' });

        window.testing.updateArgs({ value: 'input value' });

        await waitFor(() => expect(canvas.getByTestId('input')).toHaveValue('input value'));

        await user.click(canvas.getByTestId('submit-trigger'));

        await waitFor(() => expect(canvas.getByTestId('input')).not.toBeVisible());
        expect(canvas.getByTestId('preview')).toBeVisible();

        expect(canvas.getByTestId('preview')).toHaveTextContent('input value');

        expect(window.testing.args.onValueCommit).toBeCalledTimes(1);
        expect(window.testing.args.onValueCommit).toHaveBeenLastCalledWith({
            value: 'input value',
        });

        await user.click(canvas.getByTestId('edit-trigger'));

        await waitFor(() => expect(canvas.getByTestId('input')).toBeVisible());
        expect(canvas.getByTestId('preview')).not.toBeVisible();

        window.testing.updateArgs({ value: 'input value updated' });

        await waitFor(() => expect(canvas.getByTestId('input')).toHaveValue('input value updated'));

        await user.click(canvas.getByTestId('cancel-trigger'));

        expect(window.testing.args.onValueRevert).toBeCalledTimes(1);
        expect(window.testing.args.onValueRevert).toHaveBeenLastCalledWith({
            value: 'input value',
        });
    });
};
