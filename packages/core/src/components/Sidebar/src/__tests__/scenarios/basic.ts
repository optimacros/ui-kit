import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const basic = async ({ globals, canvasElement, step }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({ controllable: true });
    await sleep(1);
    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const externalTrigger = canvas.getByTestId('external-trigger');

    const panel = canvas.getByTestId('panel');
    const header = canvas.getByTestId('header');
    const closeTrigger = canvas.getByTestId('close-trigger');
    const content = canvas.getByTestId('content');

    expect(externalTrigger).toBeInTheDocument();
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute('data-position', window.testing.args.position);
    expect(header).toBeInTheDocument();
    expect(closeTrigger).toBeInTheDocument();
    expect(content).toBeInTheDocument();

    const isClosed = () => {
        const panel = canvas.getByTestId('panel');
        const miniPanel = canvas.getByTestId('mini-panel');
        const openTrigger = canvas.getByTestId('open-trigger');

        expect(panel).toHaveAttribute('data-state', 'closed');
        expect(panel).toHaveAttribute('style', `width: 0px;`);
        expect(miniPanel).toBeInTheDocument();
        expect(openTrigger).toBeInTheDocument();
    };

    const isOpen = () => {
        const panel = canvas.getByTestId('panel');
        const miniPanel = canvas.queryByTestId('mini-panel');
        const openTrigger = canvas.queryByTestId('open-trigger');

        expect(panel).toHaveAttribute('data-state', 'open');
        expect(panel).toHaveAttribute('style', `width: ${window.testing.args.width}px;`);
        expect(miniPanel).toBe(null);
        expect(openTrigger).toBe(null);
    };

    isClosed();

    await window.takeScreenshot?.();

    const user = userEvent.setup();

    await step('open/close (triggers)', async () => {
        await user.click(canvas.getByTestId('open-trigger'));

        await waitFor(isOpen);

        expect(window.testing.args.onOpenChange).toHaveBeenCalledTimes(1);
        expect(window.testing.args.onOpenChange).toHaveBeenLastCalledWith({ open: true });

        // animation
        await sleep(500);

        await window.takeScreenshot?.('open');

        await user.click(closeTrigger);

        await waitFor(isClosed);

        expect(window.testing.args.onOpenChange).toHaveBeenCalledTimes(2);
        expect(window.testing.args.onOpenChange).toHaveBeenLastCalledWith({ open: false });

        await user.click(canvas.getByTestId('mini-panel'));

        await waitFor(isOpen);

        expect(window.testing.args.onOpenChange).toHaveBeenCalledTimes(3);
        expect(window.testing.args.onOpenChange).toHaveBeenLastCalledWith({ open: true });

        await user.click(closeTrigger);

        await waitFor(isClosed);

        //await user.click(externalTrigger);

        // await waitFor(isOpen);

        // await user.click(externalTrigger);

        // await waitFor(isClosed);
    });

    await step('open/close (controlled)', async () => {
        window.testing.updateArgs({ ...props, controllable: true, 'open.controllable': true });
        await sleep(1);
        window.testing.updateArgs({ open: true });

        await waitFor(isOpen);

        window.testing.updateArgs({ open: false });

        await waitFor(isClosed);
    });
};
