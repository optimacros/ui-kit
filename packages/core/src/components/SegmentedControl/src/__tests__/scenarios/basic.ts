import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';
import { items } from '../../examples/mock';
import { StoryContext } from '@storybook/react';

export const basic = async ({ globals, canvasElement, step }: StoryContext) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({ controllable: true });
    await sleep(1);
    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const root = canvasElement.querySelector(
        '[data-scope="segmented-control"][data-part="root"]',
    ) as HTMLElement;
    const segments = within(root).getAllByTestId('item');
    const [item1, item2] = segments;

    expect(root).toBeInTheDocument();
    expect(segments).toHaveLength(items.length);

    expect(item1).toHaveAttribute('data-state', 'checked');
    expect(
        item1.querySelector('[data-scope="radio-group"][data-part="item-text"]'),
    ).toHaveAttribute('data-state', 'checked');
    expect(
        item1.querySelector('[data-scope="segmented-control"][data-part="hidden-input"]'),
    ).toHaveAttribute('checked');

    await window.takeScreenshot?.();

    const user = userEvent.setup({ skipClick: true });

    await step('select (click)', async () => {
        await user.click(item2);

        await waitFor(() => {
            expect(item2).toHaveAttribute('data-state', 'checked');
            expect(
                item2.querySelector('[data-scope="radio-group"][data-part="item-text"]'),
            ).toHaveAttribute('data-state', 'checked');
            expect(
                item2.querySelector('[data-scope="segmented-control"][data-part="hidden-input"]'),
            ).toHaveAttribute('checked');
        });

        expect(window.testing.args.onValueChange).toHaveBeenCalledTimes(1);
        expect(window.testing.args.onValueChange).toHaveBeenLastCalledWith({ value: items[1] });
    });

    await step('select (keyboard)', async () => {
        (document.activeElement as HTMLElement).blur();

        await user.keyboard('{Tab}');

        await waitFor(() => {
            expect(item2).toHaveAttribute('data-focus');
        });

        await user.keyboard('{ArrowRight}');

        await waitFor(() => {
            expect(item1).toHaveAttribute('data-state', 'checked');
            expect(
                item1.querySelector('[data-scope="radio-group"][data-part="item-text"]'),
            ).toHaveAttribute('data-state', 'checked');
            expect(
                item1.querySelector('[data-scope="segmented-control"][data-part="hidden-input"]'),
            ).toHaveAttribute('checked');
        });

        expect(window.testing.args.onValueChange).toHaveBeenCalledTimes(3);
        expect(window.testing.args.onValueChange).toHaveBeenLastCalledWith({ value: items[0] });
    });

    await step('select (controlled)', async () => {
        window.testing.updateArgs({ controllable: true, value: items[2] });

        // пригорает с этих ререндеров
        await sleep(1);

        const root = canvasElement.querySelector(
            '[data-scope="segmented-control"][data-part="root"]',
        ) as HTMLElement;
        const item3 = within(root).getAllByTestId('item')[2];

        await waitFor(() => {
            expect(item3).toHaveAttribute('data-state', 'checked');
            expect(
                item3.querySelector('[data-scope="radio-group"][data-part="item-text"]'),
            ).toHaveAttribute('data-state', 'checked');
            expect(
                item3.querySelector('[data-scope="segmented-control"][data-part="hidden-input"]'),
            ).toHaveAttribute('checked');
        });
    });
};
