import { within, expect, userEvent, waitFor } from '@storybook/test';
import { props } from '../props';

export const localized = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs({ ...props, locale: 'ru-RU' });

    await window.testing.resetStory();

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

    const prevDateValue = props.defaultValue[0].subtract({ days: 1 }).toString();
    const prevDateCell = calendar.querySelector(`span[data-value="${prevDateValue}"]`);

    await user.click(prevDateCell);

    await waitFor(() => {
        expect(window.testing.args.onValueChange).toBeCalledTimes(1);

        expect(window.testing.args.onValueChange.mock.lastCall[0].valueAsString[0]).toEqual(
            '09.05.2025',
        );
    });
};
