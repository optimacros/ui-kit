import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const basic = async ({ globals, step, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('root');
    const control = canvas.getByTestId('control');
    const trigger = canvas.getByTestId('trigger');
    const content = within(document.body).getByTestId('content');
    const list = within(content).getByTestId('list');
    const items = within(list).getAllByTestId('item');

    expect(root).toBeInTheDocument();
    expect(control).toBeInTheDocument();
    expect(control).toHaveAttribute('data-state', 'closed');
    expect(content).toBeInTheDocument();
    expect(content).not.toBeVisible();
    expect(content).toHaveAttribute('data-state', 'closed');
    expect(trigger).toBeInTheDocument();
    expect(items).toHaveLength(window.testing.args.items.length);

    const user = userEvent.setup();

    await step('open/close', async () => {
        await user.click(trigger);

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'open');
            expect(content).toBeVisible();
            expect(content).toHaveAttribute('data-state', 'open');
        });

        await user.click(document.body);

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'closed');
            expect(content).not.toBeVisible();
            expect(content).toHaveAttribute('data-state', 'closed');
        });

        await user.click(trigger);

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'open');
            expect(content).toBeVisible();
            expect(content).toHaveAttribute('data-state', 'open');
        });

        await user.keyboard('{Escape}');

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'closed');
            expect(content).not.toBeVisible();
            expect(content).toHaveAttribute('data-state', 'closed');
        });

        await user.click(trigger);

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'open');
            expect(content).toBeVisible();
            expect(content).toHaveAttribute('data-state', 'open');
        });

        await user.click(items[0]);

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'closed');
            expect(content).not.toBeVisible();
            expect(content).toHaveAttribute('data-state', 'closed');
        });
    });

    await step('open/close (controlled)', async () => {
        window.testing.updateArgs({ ...props, 'open.controlled': true, controllable: true });
        window.testing.args.onOpenChange.mockClear();

        await user.click(trigger);

        await sleep(500);

        expect(control).toHaveAttribute('data-state', 'closed');
        expect(content).not.toBeVisible();
        expect(content).toHaveAttribute('data-state', 'closed');

        expect(window.testing.args.onOpenChange).toBeCalledTimes(1);
        expect(window.testing.args.onOpenChange).toBeCalledWith({ open: true });

        window.testing.updateArgs({ open: true });

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'open');
            expect(content).toBeVisible();
            expect(content).toHaveAttribute('data-state', 'open');
        });

        await sleep(100);

        await user.click(document.body);

        expect(window.testing.args.onOpenChange).toBeCalledTimes(2);
        expect(window.testing.args.onOpenChange).toBeCalledWith({ open: false });

        await user.keyboard('{Escape}');

        expect(window.testing.args.onOpenChange).toBeCalledTimes(3);
        expect(window.testing.args.onOpenChange).toBeCalledWith({ open: false });

        await user.click(items[0]);

        expect(window.testing.args.onOpenChange).toBeCalledTimes(4);
        expect(window.testing.args.onOpenChange).toBeCalledWith({ open: false });
        expect(items[0]).toHaveAttribute('data-state', 'checked');

        await sleep(500);

        expect(control).toHaveAttribute('data-state', 'open');
        expect(content).toBeVisible();
        expect(content).toHaveAttribute('data-state', 'open');

        await window.takeScreenshot?.('field-open-selected');

        window.testing.updateArgs({ open: false });

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'closed');
            expect(content).not.toBeVisible();
            expect(content).toHaveAttribute('data-state', 'closed');
        });
    });
};
