import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';
import { StoryContext } from '@storybook/react';
import { Tooltip } from '../../';

export const interactive = async ({
    globals,
    canvasElement,
    step,
}: StoryContext<Tooltip.RootProps>) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs({ ...props, interactive: true });

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

        await waitFor(() => isOpen());

        const contentButton = canvasElement.querySelector(
            '[data-scope="tooltip"][data-part="content"]',
        );

        await user.hover(contentButton);
        await user.click(contentButton);

        await sleep(600);

        isOpen();

        await user.unhover(contentButton);

        await waitFor(() => isClosed());
    });
};
