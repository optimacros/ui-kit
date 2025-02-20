import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const select = async ({ globals, step, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('root');
    const control = within(root).getByTestId('control');
    const input = within(root).getByTestId('input');
    const trigger = within(root).getByTestId('trigger');
    const content = within(document.body).getByTestId('content');
    const list = within(content).getByTestId('list');
    const items = within(list).getAllByTestId('item');

    expect(control).toBeInTheDocument();
    expect(control).toHaveAttribute('data-state', 'closed');
    expect(input).toBeInTheDocument();
    expect(input).toHaveTextContent('choose value');
    expect(content).toBeInTheDocument();
    expect(content).not.toBeVisible();
    expect(content).toHaveAttribute('data-state', 'closed');
    expect(trigger).toBeInTheDocument();
    expect(items).toHaveLength(window.testing.args.items.length);
    expect(items[0]).toHaveAttribute('data-state', 'unchecked');

    const user = userEvent.setup();

    await step('select', async () => {
        expect(input).toHaveTextContent('choose value');
        expect(items[0]).toHaveAttribute('data-state', 'unchecked');

        await user.click(trigger);

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'open');
            expect(content).toBeVisible();
            expect(content).toHaveAttribute('data-state', 'open');
        });

        await user.click(items[0]);

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'closed');
            expect(content).not.toBeVisible();
            expect(content).toHaveAttribute('data-state', 'closed');
            expect(input).toHaveTextContent(window.testing.args.items[0].label);
            expect(items[0]).toHaveAttribute('data-state', 'checked');
        });

        window.testing.updateArgs({
            value: [],
        });

        await waitFor(() => {
            expect(input).toHaveTextContent('choose value');
            expect(items[0]).toHaveAttribute('data-state', 'unchecked');
        });
    });

    await step('deselect', async () => {
        window.testing.updateArgs({
            ...props,
            deselectable: true,
            closeOnSelect: false,
        });

        expect(input).toHaveTextContent('choose value');
        expect(items[0]).toHaveAttribute('data-state', 'unchecked');

        await user.click(trigger);

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'open');
            expect(content).toBeVisible();
            expect(content).toHaveAttribute('data-state', 'open');
        });

        await user.click(items[0]);

        await waitFor(() => {
            expect(input).toHaveTextContent(window.testing.args.items[0].label);
            expect(items[0]).toHaveAttribute('data-state', 'checked');
        });

        await user.click(items[0]);

        await waitFor(() => {
            expect(input).toHaveTextContent('choose value');
            expect(items[0]).toHaveAttribute('data-state', 'unchecked');
        });

        await user.click(trigger);

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'closed');
            expect(content).not.toBeVisible();
            expect(content).toHaveAttribute('data-state', 'closed');
        });
    });

    await step('select (controlled)', async () => {
        window.testing.updateArgs({
            ...props,
            value: [],
            closeOnSelect: false,
            deselectable: true,
        });
        window.testing.args.onValueChange.mockClear();

        expect(input).toHaveTextContent('choose value');
        expect(items[0]).toHaveAttribute('data-state', 'unchecked');

        await user.click(trigger);

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'open');
            expect(content).toBeVisible();
            expect(content).toHaveAttribute('data-state', 'open');
        });

        await user.click(items[0]);

        await sleep(500);

        expect(input).toHaveTextContent('choose value');
        expect(items[0]).toHaveAttribute('data-state', 'unchecked');

        expect(window.testing.args.onValueChange).toBeCalledTimes(1);
        expect(window.testing.args.onValueChange).toBeCalledWith({
            items: [window.testing.args.items[0]],
            value: [window.testing.args.items[0].value],
        });

        window.testing.updateArgs({
            value: [window.testing.args.items[0].value],
        });

        await waitFor(() => {
            expect(input).toHaveTextContent(window.testing.args.items[0].label);
            expect(items[0]).toHaveAttribute('data-state', 'checked');
        });

        await user.click(items[0]);

        await sleep(500);

        expect(input).toHaveTextContent(window.testing.args.items[0].label);
        expect(items[0]).toHaveAttribute('data-state', 'checked');

        expect(window.testing.args.onValueChange).toBeCalledTimes(2);
        expect(window.testing.args.onValueChange).toBeCalledWith({
            items: [],
            value: [],
        });

        window.testing.updateArgs({
            value: [],
        });

        await waitFor(() => {
            expect(input).toHaveTextContent('choose value');
            expect(items[0]).toHaveAttribute('data-state', 'unchecked');
        });

        await user.click(trigger);

        await waitFor(() => {
            expect(control).toHaveAttribute('data-state', 'closed');
            expect(content).not.toBeVisible();
            expect(content).toHaveAttribute('data-state', 'closed');
        });
    });
};
