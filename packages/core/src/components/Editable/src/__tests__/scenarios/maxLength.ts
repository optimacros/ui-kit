import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const maxLength = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({
        ...props,
        'edit.controlled': true,
        edit: true,
        maxLength: 10,
        controllable: false,
    });

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('root');
    const input = canvas.getByTestId('input');
    const preview = canvas.getByTestId('preview');

    expect(root).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toBeVisible();
    expect(input).toHaveValue('');
    expect(preview).toBeInTheDocument();
    expect(preview).not.toBeVisible();

    const user = userEvent.setup();

    await user.keyboard('0123456789');

    await waitFor(() => expect(input).toHaveValue('0123456789'));

    await user.keyboard('0123456789');

    await sleep(100);

    expect(input).toHaveValue('0123456789');
};
