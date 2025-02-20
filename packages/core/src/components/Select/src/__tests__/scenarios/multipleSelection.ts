import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';

export const multipleSelection = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({
        ...props,
        multiple: true,
        closeOnSelect: false,
        deselectable: true,
    });

    const { args } = window.testing;

    args.onValueChange.mockClear();

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
    expect(items).toHaveLength(args.items.length);
    expect(items[0]).toHaveAttribute('data-state', 'unchecked');
    expect(items[1]).toHaveAttribute('data-state', 'unchecked');

    const user = userEvent.setup();

    await user.click(trigger);

    await waitFor(() => {
        expect(control).toHaveAttribute('data-state', 'open');
        expect(content).toBeVisible();
        expect(content).toHaveAttribute('data-state', 'open');
    });

    await user.click(items[0]);

    await waitFor(() => {
        expect(input).toHaveTextContent(args.items[0].label);
        expect(items[0]).toHaveAttribute('data-state', 'checked');
        expect(items[1]).toHaveAttribute('data-state', 'unchecked');
    });

    expect(args.onValueChange).toBeCalledTimes(1);
    expect(args.onValueChange).toBeCalledWith({
        items: [args.items[0]],
        value: [args.items[0].value],
    });

    await user.click(items[1]);

    await waitFor(() => {
        expect(input).toHaveTextContent(`${args.items[0].label}, ${args.items[1].label}`);
        expect(items[0]).toHaveAttribute('data-state', 'checked');
        expect(items[1]).toHaveAttribute('data-state', 'checked');
    });

    expect(args.onValueChange).toBeCalledTimes(2);
    expect(args.onValueChange).toBeCalledWith({
        items: [args.items[0], args.items[1]],
        value: [args.items[0].value, args.items[1].value],
    });

    await user.click(items[0]);

    await waitFor(() => {
        expect(input).toHaveTextContent(args.items[1].label);
        expect(items[0]).toHaveAttribute('data-state', 'unchecked');
        expect(items[1]).toHaveAttribute('data-state', 'checked');
    });

    expect(args.onValueChange).toBeCalledTimes(3);
    expect(args.onValueChange).toBeCalledWith({
        items: [args.items[1]],
        value: [args.items[1].value],
    });

    await user.click(items[1]);

    await waitFor(() => {
        expect(input).toHaveTextContent('choose value');
        expect(items[0]).toHaveAttribute('data-state', 'unchecked');
        expect(items[1]).toHaveAttribute('data-state', 'unchecked');
    });

    expect(args.onValueChange).toBeCalledTimes(4);
    expect(args.onValueChange).toBeCalledWith({
        items: [],
        value: [],
    });

    await user.click(trigger);

    await waitFor(() => {
        expect(control).toHaveAttribute('data-state', 'closed');
        expect(content).not.toBeVisible();
        expect(content).toHaveAttribute('data-state', 'closed');
    });
};
