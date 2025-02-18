import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { PlayFunction } from 'storybook/internal/types';

export const closeIcon: PlayFunction = async ({ globals }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(document.body);

    const openTrigger = canvas.getByTestId('open-trigger');

    expect(openTrigger).toBeInTheDocument();
    expect(canvas.queryByTestId('content')).toBeFalsy();

    const user = userEvent.setup();

    await user.click(openTrigger);

    await waitFor(() => expect(canvas.queryByTestId('content')).toBeInTheDocument());

    canvas.queryByTestId('content').focus();

    await window.takeScreenshot?.();
};
