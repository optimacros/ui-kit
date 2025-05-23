import { within, expect, userEvent, waitFor, fireEvent } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const basic = async ({ globals, canvasElement, step }) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const canvas = within(canvasElement);

    const trigger = canvas.getByTestId('trigger');
    const content = canvas.getByTestId('content');

    expect(trigger).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-state', 'closed');

    await window.takeScreenshot?.();

    const user = userEvent.setup();

    await step('expand', async () => {
        await fireEvent.click(trigger);

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'open'));
        expect(content).toBeVisible();

        await window.takeScreenshot?.('open');

        await fireEvent.click(trigger);

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
        expect(content).not.toBeVisible();

        (document.activeElement as HTMLElement).blur();

        await user.keyboard('[tab]');

        await waitFor(() => expect(trigger).toHaveFocus());

        await user.keyboard('[space]');

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'open'));
        expect(content).toBeVisible();

        await user.keyboard('[space]');

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
        expect(content).not.toBeVisible();
    });

    await step('controllable', async () => {
        await window.testing.updateArgs({ open: false });
        window.testing.args.onOpenChange.mockClear();

        await fireEvent.click(trigger);

        await sleep(100);

        expect(content).toHaveAttribute('data-state', 'closed');
        expect(content).not.toBeVisible();

        expect(window.testing.args.onOpenChange).toBeCalledTimes(1);
        expect(window.testing.args.onOpenChange).toBeCalledWith({ open: true });

        await window.testing.updateArgs({ open: true });

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'open'));
        expect(content).toBeVisible();

        await fireEvent.click(trigger);

        await sleep(100);

        expect(content).toHaveAttribute('data-state', 'open');
        expect(content).toBeVisible();

        expect(window.testing.args.onOpenChange).toBeCalledTimes(2);
        expect(window.testing.args.onOpenChange).toBeCalledWith({ open: false });

        await window.testing.updateArgs({ open: false });

        await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'));
        expect(content).not.toBeVisible();
    });
};
