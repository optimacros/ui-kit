import { expect, waitFor, within } from '@storybook/test';
import { props } from '../props';

export const states = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

    const canvas = within(canvasElement);

    const roots = canvas.getAllByTestId('root');

    expect(roots).toHaveLength(4);
    expect(
        roots.every((r) =>
            expect(
                r.querySelector('input[data-scope="editable"][data-part="input"]'),
            ).not.toBeVisible(),
        ),
    ).toBeTruthy();

    await window.takeScreenshot?.();

    await window.testing.updateArgs({
        edit: true,
    });

    await waitFor(() =>
        expect(
            roots.every((r) =>
                expect(
                    r.querySelector('input[data-scope="editable"][data-part="input"]'),
                ).toBeVisible(),
            ),
        ).toBeTruthy(),
    );

    await window.takeScreenshot?.('states-open');
};
