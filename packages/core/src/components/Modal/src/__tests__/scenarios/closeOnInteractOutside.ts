import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const closeOnInteractOutside = async ({ globals }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({ ...props, closeOnInteractOutside: true });

    await window.waitForPageTrulyReady?.();

    const canvas = within(document.body);

    const openTrigger = canvas.getByTestId('open-trigger');

    expect(openTrigger).toBeInTheDocument();
    expect(canvas.queryByTestId('content')).toBeFalsy();

    const user = userEvent.setup({ pointerEventsCheck: 0 });

    await user.click(openTrigger);

    await waitFor(() => expect(canvas.queryByTestId('content')).toBeInTheDocument());
    await waitFor(() =>
        expect(canvas.getByTestId('content')).toHaveAttribute('data-state', 'open'),
    );

    await sleep(1000); // пока до конца не откроется, нельзя закрыть. как определить конец - фз

    await user.click(document.body.querySelector('div[data-scope="dialog"][data-part="backdrop"]'));

    await waitFor(
        () => {
            expect(canvas.queryByTestId('content')).not.toBeInTheDocument();
        },
        { timeout: 3000 },
    );

    window.testing.updateArgs({ closeOnInteractOutside: false });

    await sleep(200);

    await user.click(openTrigger);

    await waitFor(() => expect(canvas.queryByTestId('content')).toBeInTheDocument());

    await user.click(document.body.querySelector('div[data-scope="dialog"][data-part="backdrop"]'));

    await sleep(200);

    expect(canvas.queryByTestId('content')).toBeInTheDocument();

    await user.click(canvas.getByTestId('close-trigger'));
};
