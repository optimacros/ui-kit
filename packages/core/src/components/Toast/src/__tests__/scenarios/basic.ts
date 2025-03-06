import { within, expect, userEvent, waitFor } from '@storybook/test';
import { props } from '../props';
import { times } from '@optimacros-ui/utils';

export const basic = async ({ globals, step }) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const canvas = within(document.body);

    let group = document.body.querySelector('[data-scope="toast"][data-part="group"]');
    let createTrigger = canvas.getByTestId('create-trigger');
    let removeTrigger = canvas.getByTestId('remove-trigger');

    expect(group).toBeInTheDocument();
    expect(createTrigger).toBeInTheDocument();
    expect(removeTrigger).toBeInTheDocument();

    const user = userEvent.setup();

    await step('Max', async () => {
        await Promise.all(times(5, () => user.click(createTrigger)));

        await waitFor(() => {
            const toasts = group.querySelectorAll('[data-scope="toast"][data-part="root"]');

            expect(toasts).toHaveLength(5);
        });

        await user.click(removeTrigger);

        await waitFor(() => {
            const toasts = group.querySelectorAll('[data-scope="toast"][data-part="root"]');

            expect(toasts).toHaveLength(0);
        });

        await window.testing.updateArgs({ max: 3 });

        await window.testing.resetStory();

        group = document.body.querySelector('[data-scope="toast"][data-part="group"]');
        createTrigger = canvas.getByTestId('create-trigger');
        removeTrigger = canvas.getByTestId('remove-trigger');

        await Promise.all(times(5, () => user.click(canvas.getByTestId('create-trigger'))));

        await waitFor(() => {
            const toasts = group.querySelectorAll('[data-scope="toast"][data-part="root"]');

            expect(toasts).toHaveLength(3);
        });

        await user.click(canvas.getByTestId('remove-trigger'));

        await waitFor(() => {
            const toasts = group.querySelectorAll('[data-scope="toast"][data-part="root"]');

            expect(toasts).toHaveLength(0);
        });
    });
};
