import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';
import { StoryContext } from '@storybook/react';
import { Tooltip } from '../../';

export const basic = async ({ globals, canvasElement, step }: StoryContext<Tooltip.RootProps>) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const canvas = within(canvasElement);

    const trigger = canvas.getByTestId('trigger');

    expect(trigger).toBeInTheDocument();

    const isClosed = () => {
        const trigger = canvas.getByTestId('trigger');

        expect(trigger).toHaveAttribute('data-state', 'closed');
        expect(
            canvasElement.querySelector('[data-scope="tooltip"][data-part="content"]'),
        ).toBeFalsy();
        expect(
            canvasElement.querySelector('[data-scope="tooltip"][data-part="arrow"]'),
        ).toBeFalsy();
    };

    const isOpen = () => {
        const trigger = canvas.getByTestId('trigger');

        expect(trigger).toHaveAttribute('data-state', 'open');
        expect(
            canvasElement.querySelector('[data-scope="tooltip"][data-part="content"]'),
        ).toBeInTheDocument();
        expect(
            canvasElement.querySelector('[data-scope="tooltip"][data-part="content"]'),
        ).toHaveTextContent('here we are');
        expect(
            canvasElement.querySelector('[data-scope="tooltip"][data-part="arrow"]'),
        ).toBeInTheDocument();
    };

    isClosed();

    const user = userEvent.setup();

    await step('open/close (hover)', async () => {
        await user.hover(trigger);

        await sleep(350);
        isClosed();
        await sleep(100);
        isOpen();

        expect(window.testing.args.onOpenChange).toBeCalledTimes(1);
        expect(window.testing.args.onOpenChange).toHaveBeenLastCalledWith({ open: true });

        await user.unhover(trigger);

        await sleep(150);
        isOpen();
        await sleep(100);
        isClosed();

        expect(window.testing.args.onOpenChange).toBeCalledTimes(2);
        expect(window.testing.args.onOpenChange).toHaveBeenLastCalledWith({ open: false });
    });

    await step('open/close (controlled)', async () => {
        isClosed();

        await window.testing.updateArgs({ open: true });

        await waitFor(() => isOpen());

        await window.testing.updateArgs({ open: false });

        await waitFor(() => isClosed());
    });
};
