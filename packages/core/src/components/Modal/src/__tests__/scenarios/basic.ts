import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { PlayFunction } from 'storybook/internal/types';
import { sleep } from '@optimacros-ui/utils';

export const basic: PlayFunction = async ({ globals, step }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(document.body);

    const openTrigger = canvas.getByTestId('open-trigger');

    expect(openTrigger).toBeInTheDocument();
    expect(canvas.queryByTestId('content')).toBeFalsy();

    const user = userEvent.setup();

    await step('open/close', async () => {
        await user.click(openTrigger);

        await waitFor(() => expect(canvas.queryByTestId('content')).toBeInTheDocument());

        const closeTrigger = canvas.getByTestId('close-trigger');

        await window.takeScreenshot?.();

        await user.click(closeTrigger);

        await waitFor(() => {
            expect(canvas.queryByTestId('content')).not.toBeInTheDocument();
        });
    });

    await step('open/close (controlled)', async () => {
        window.testing.updateArgs({ ...props, 'open.controlled': true });
        window.testing.args.onOpenChange.mockClear();

        await sleep(500);

        await user.click(openTrigger);

        await sleep(500);

        expect(canvas.queryByTestId('content')).not.toBeInTheDocument();
        expect(window.testing.args.onOpenChange).toBeCalledTimes(1);
        expect(window.testing.args.onOpenChange).toBeCalledWith({ open: true });

        window.testing.updateArgs({ open: true });

        await waitFor(() => expect(canvas.queryByTestId('content')).toBeInTheDocument());

        await user.click(canvas.queryByTestId('close-trigger'));

        await sleep(500);

        expect(canvas.queryByTestId('content')).toBeInTheDocument();
        expect(window.testing.args.onOpenChange).toBeCalledTimes(2);
        expect(window.testing.args.onOpenChange).toBeCalledWith({ open: false });

        window.testing.updateArgs({ open: false });

        await waitFor(() => {
            expect(canvas.queryByTestId('content')).not.toBeInTheDocument();
        });
    });
};
