import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const closeOnEscape = async ({ globals }) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const canvas = within(document.body);

    const openTrigger = canvas.getByTestId('open-trigger');

    expect(openTrigger).toBeInTheDocument();
    expect(canvas.queryByTestId('content')).toBeFalsy();

    const user = userEvent.setup();

    await user.click(openTrigger);

    await waitFor(() => expect(canvas.queryByTestId('content')).toBeInTheDocument());

    await sleep(500);

    await user.keyboard('{Escape}');

    await waitFor(
        () => {
            expect(canvas.queryByTestId('content')).not.toBeInTheDocument();
        },
        { timeout: 3000 },
    );

    await window.testing.updateArgs({ closeOnEscape: false });

    await sleep(200);

    await user.click(openTrigger);

    await waitFor(() => expect(canvas.queryByTestId('content')).toBeInTheDocument());

    await user.keyboard('{Escape}');

    await sleep(200);

    expect(canvas.queryByTestId('content')).toBeInTheDocument();

    await user.click(canvas.getByTestId('close-trigger'));
};
