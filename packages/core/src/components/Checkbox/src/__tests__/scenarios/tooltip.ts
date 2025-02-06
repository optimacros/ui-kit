import { within, expect, waitFor, userEvent, waitForElementToBeRemoved } from '@storybook/test';
import { props } from '../props';

export const tooltip = async ({ canvasElement, globals }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('checkbox-root');
    const control = canvas.getByTestId('checkbox-control');
    const input = canvas.getByTestId('hidden-input');
    const tooltipTrigger = canvasElement.querySelector(
        '[data-scope="tooltip"][data-part="trigger"]',
    );

    expect(root).toBeInTheDocument();
    expect(control).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(tooltipTrigger).toBeInTheDocument();

    expect(root).toHaveAttribute('data-state', 'unchecked');
    expect(control).toHaveAttribute('data-state', 'unchecked');
    expect(input).not.toHaveAttribute('checked');

    const user = userEvent.setup();

    await user.hover(root);

    await waitFor(() =>
        expect(
            canvasElement.querySelector(
                '[data-scope="tooltip"][data-part="content"][data-state="open"]',
            ),
        ).toBeInTheDocument(),
    );

    await window.takeScreenshot?.();

    await user.unhover(root);

    await waitForElementToBeRemoved(
        canvasElement.querySelector(
            '[data-scope="tooltip"][data-part="content"][data-state="open"]',
        ),
    );
};
