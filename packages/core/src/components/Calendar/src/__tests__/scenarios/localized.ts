import { within, expect, userEvent, waitFor } from '@storybook/test';
import { props } from '../props';

export const localized = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({ ...props, locale: 'ru-RU' });

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const trigger = canvas.getByTestId('trigger');
    const content = canvas.getByTestId('content');
    const calendar = canvas.getByTestId('calendar');

    expect(trigger).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-state', 'closed');
    expect(content).not.toBeVisible();
    expect(calendar).toBeInTheDocument();
    expect(content).not.toBeVisible();

    const user = userEvent.setup();

    await user.click(trigger);

    await waitFor(() => expect(content).toHaveAttribute('data-state', 'open'));
    expect(content).toBeVisible();
    expect(within(content).getByText('май 2025')).toBeInTheDocument();

    await window.takeScreenshot?.();
};
