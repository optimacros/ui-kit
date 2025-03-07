import { within, expect, userEvent, waitFor } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const basic = async ({ globals, canvasElement, step }) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const canvas = within(document.body);

    const openTrigger = canvas.getByTestId('open-trigger');
    const content = canvas.getByTestId('content');
    const closeTrigger = canvas.getByTestId('close-trigger');

    expect(openTrigger).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-state', 'closed');
    expect(content).not.toBeVisible();
    expect(closeTrigger).toBeInTheDocument();

    const user = userEvent.setup();

    await step('open/close (trigger click)', async () => {
        await user.click(openTrigger);

        await waitFor(() => expect(content).toBeVisible());
        expect(content).toHaveAttribute('data-state', 'open');

        await window.takeScreenshot?.('open');

        await user.click(closeTrigger);

        await waitFor(() => expect(content).not.toBeVisible());
        expect(content).toHaveAttribute('data-state', 'closed');
    });

    await step('open/close (keyboard)', async () => {
        (document.activeElement as HTMLElement).blur();

        await user.keyboard('{Tab}{Enter}');

        await waitFor(() => expect(content).toBeVisible());
        expect(content).toHaveAttribute('data-state', 'open');

        await user.keyboard('{Escape}');

        await waitFor(() => expect(content).not.toBeVisible());
        expect(content).toHaveAttribute('data-state', 'closed');

        await window.testing.updateArgs({ closeOnEscape: false });

        await user.keyboard(' ');

        await waitFor(() => expect(content).toBeVisible());
        expect(content).toHaveAttribute('data-state', 'open');

        await user.keyboard('{Escape}');

        await sleep(200);

        expect(content).toBeVisible();
        expect(content).toHaveAttribute('data-state', 'open');

        await user.click(closeTrigger);

        await waitFor(() => expect(content).not.toBeVisible());
        expect(content).toHaveAttribute('data-state', 'closed');
    });

    await step('open/close (outside click)', async () => {
        await window.testing.updateArgs(props);

        await user.click(openTrigger);

        await waitFor(() => expect(content).toBeVisible());
        expect(content).toHaveAttribute('data-state', 'open');

        await user.click(canvasElement);

        await waitFor(() => expect(content).not.toBeVisible());
        expect(content).toHaveAttribute('data-state', 'closed');

        await window.testing.updateArgs({ closeOnInteractOutside: false });

        await user.click(openTrigger);

        await waitFor(() => expect(content).toBeVisible());
        expect(content).toHaveAttribute('data-state', 'open');

        await user.click(canvasElement);

        await sleep(200);

        expect(content).toBeVisible();
        expect(content).toHaveAttribute('data-state', 'open');

        await user.click(closeTrigger);

        await waitFor(() => expect(content).not.toBeVisible());
        expect(content).toHaveAttribute('data-state', 'closed');
    });

    await step('open/close (controlled)', async () => {
        await window.testing.updateArgs({ open: false });
        window.testing.args.onOpenChange.mockClear();

        await user.click(openTrigger);

        await sleep(200);

        expect(content).not.toBeVisible();
        expect(content).toHaveAttribute('data-state', 'closed');
        expect(window.testing.args.onOpenChange).toBeCalledTimes(1);
        expect(window.testing.args.onOpenChange).toBeCalledWith({ open: true });

        await window.testing.updateArgs({ open: true });

        await waitFor(() => expect(content).toBeVisible());
        expect(content).toHaveAttribute('data-state', 'open');

        await user.click(closeTrigger);

        await sleep(200);

        expect(content).toBeVisible();
        expect(content).toHaveAttribute('data-state', 'open');
        expect(window.testing.args.onOpenChange).toBeCalledTimes(2);
        expect(window.testing.args.onOpenChange).toBeCalledWith({ open: false });

        await window.testing.updateArgs({ open: false });

        await waitFor(() => expect(content).not.toBeVisible());
        expect(content).toHaveAttribute('data-state', 'closed');
    });
};
