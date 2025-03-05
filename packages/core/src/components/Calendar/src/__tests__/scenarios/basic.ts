import { within, expect, userEvent, waitFor } from '@storybook/test';
import { props } from '../props';

export const basic = async ({ globals, canvasElement, step }) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const canvas = within(canvasElement);

    const currentDateValue = props.defaultValue[0].toString();
    const prevDateValue = props.defaultValue[0].subtract({ days: 1 }).toString();
    const prevPrevDateValue = props.defaultValue[0].subtract({ days: 2 }).toString();

    const trigger = canvas.getByTestId('trigger');
    const content = canvas.getByTestId('content');
    const calendar = canvas.getByTestId('calendar');
    const currentDateCell = calendar.querySelector(`span[data-value="${currentDateValue}"]`);
    const prevDateCell = calendar.querySelector(`span[data-value="${prevDateValue}"]`);
    const prevPrevDateCell = calendar.querySelector(`span[data-value="${prevPrevDateValue}"]`);

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

    expect(currentDateCell).toHaveAttribute('data-selected');
    expect(currentDateCell).toHaveAttribute('data-focus');

    await window.takeScreenshot?.();

    await step('select date by click', async () => {
        await user.click(prevDateCell);

        await waitFor(() => expect(window.testing.args.onValueChange).toBeCalledTimes(1));
        expect(window.testing.args.onValueChange.mock.lastCall[0].value[0].toString()).toEqual(
            prevDateValue,
        );

        await waitFor(() => expect(prevDateCell).toHaveAttribute('data-selected'));
        expect(prevDateCell).toHaveAttribute('data-focus');
    });

    await step('navigate dates by keyboard', async () => {
        await user.keyboard('{arrowLeft}');

        await waitFor(() => expect(prevPrevDateCell).toHaveAttribute('data-focus'));
        expect(prevDateCell).toHaveAttribute('data-selected');

        await window.takeScreenshot?.('open-focus');

        await user.keyboard('{enter}');

        await waitFor(() => expect(window.testing.args.onValueChange).toBeCalledTimes(2));
        expect(window.testing.args.onValueChange.mock.lastCall[0].value[0].toString()).toEqual(
            prevPrevDateValue,
        );

        await waitFor(() => expect(prevPrevDateCell).toHaveAttribute('data-focus'));
        expect(prevPrevDateCell).toHaveAttribute('data-selected');
    });
};
