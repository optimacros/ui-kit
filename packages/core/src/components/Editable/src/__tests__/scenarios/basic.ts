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
        await window.testing.updateArgs({ edit: false });
        window.testing.args.onEditChange.mockClear();

        expect(input).not.toBeVisible();
        expect(preview).toBeVisible();

        await user.click(canvas.getByTestId('edit-trigger'));

        await sleep(100);

        expect(input).not.toBeVisible();
        expect(preview).toBeVisible();

        expect(window.testing.args.onEditChange).toBeCalledTimes(1);
        expect(window.testing.args.onEditChange).toBeCalledWith({ edit: true });

        await window.testing.updateArgs({ edit: true });

        await waitFor(() => expect(preview).not.toBeVisible());
        expect(input).toBeVisible();

        await user.click(canvas.getByTestId('cancel-trigger'));
        await user.click(canvasElement);

        await sleep(100);

        expect(input).toBeVisible();
        expect(preview).not.toBeVisible();

        // 1,2 - trigger, 3 - outside
        expect(window.testing.args.onEditChange).toBeCalledTimes(3);
        expect(window.testing.args.onEditChange).toBeCalledWith({ edit: false });

        await window.testing.updateArgs({ edit: false });

        await waitFor(() => expect(preview).toBeVisible());
        expect(input).not.toBeVisible();
    });

    await step('edit/submit/revert', async () => {
        await window.testing.updateArgs(props);

        await window.testing.resetStory();

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
        await window.testing.updateArgs({ value: '' });

        window.testing.args.onValueChange.mockClear();
        window.testing.args.onValueCommit.mockClear();
        window.testing.args.onValueRevert.mockClear();

        await window.testing.resetStory();

        await user.click(canvas.getByTestId('edit-trigger'));

        await waitFor(() => {
            expect(canvas.getByTestId('input')).toBeVisible();
            expect(canvas.getByTestId('preview')).not.toBeVisible();
            expect(canvas.getByTestId('submit-trigger')).toBeInTheDocument();
            expect(canvas.getByTestId('cancel-trigger')).toBeInTheDocument();
        });

        expect(canvas.getByTestId('preview')).toHaveTextContent('placeholder');
        expect(canvas.getByTestId('input')).toHaveValue('');

        await user.keyboard('input value');

        expect(canvas.getByTestId('preview')).toHaveTextContent('placeholder');
        expect(canvas.getByTestId('input')).toHaveValue('input value');

        expect(window.testing.args.onValueChange).toBeCalledTimes(11);
        expect(window.testing.args.onValueChange).toHaveBeenLastCalledWith({
            value: 'input value',
        });

        await user.click(canvas.getByTestId('submit-trigger'));

        await waitFor(() => {
            expect(canvas.getByTestId('input')).not.toBeVisible();
            expect(canvas.getByTestId('preview')).toBeVisible();
        });

        expect(window.testing.args.onValueCommit).toBeCalledTimes(1);
        expect(window.testing.args.onValueCommit).toHaveBeenLastCalledWith({
            value: '',
        });

        expect(canvas.getByTestId('preview')).toHaveTextContent('placeholder');
        expect(canvas.getByTestId('input')).toHaveValue('input value');

        await window.testing.updateArgs({ value: 'input value' });

        expect(canvas.getByTestId('preview')).toHaveTextContent('input value');
        expect(canvas.getByTestId('input')).toHaveValue('input value');

        await user.click(canvas.getByTestId('edit-trigger'));

        await waitFor(() => {
            expect(canvas.getByTestId('input')).toBeVisible();
            expect(canvas.getByTestId('preview')).not.toBeVisible();
        });

        expect(canvas.getByTestId('preview')).toHaveTextContent('input value');
        expect(canvas.getByTestId('input')).toHaveValue('input value');

        await user.keyboard(' updated');

        expect(canvas.getByTestId('preview')).toHaveTextContent('input value');
        expect(canvas.getByTestId('input')).toHaveValue('input value updated');

        await user.click(canvas.getByTestId('cancel-trigger'));

        await waitFor(() => {
            expect(canvas.getByTestId('input')).not.toBeVisible();
            expect(canvas.getByTestId('preview')).toBeVisible();
        });

        expect(window.testing.args.onValueRevert).toBeCalledTimes(1);
        expect(window.testing.args.onValueRevert).toHaveBeenLastCalledWith({
            value: 'input value',
        });

        expect(canvas.getByTestId('preview')).toHaveTextContent('input value');
        expect(canvas.getByTestId('input')).toHaveValue('input value updated');
    });
};
