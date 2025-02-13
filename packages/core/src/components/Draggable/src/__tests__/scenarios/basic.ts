import { expect, fireEvent, fn, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';

export const basic = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const item = canvas.getByTestId('item');
    const container = canvas.getByTestId('container');

    expect(item).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).not.toContainElement(item);

    await window.takeScreenshot?.();

    await fireEvent.pointerDown(item, { isPrimary: true, button: 0 });
    await fireEvent.pointerMove(item, { clientX: 150, clientY: 150 });

    expect(window.testing.args.onDragStart).toBeCalledTimes(1);
    expect(window.testing.args.onDragOver).toBeCalledTimes(1);
    expect(window.testing.args.onDragMove).toBeCalledTimes(1);

    await window.takeScreenshot?.('drag');

    await fireEvent.pointerUp(item);

    await waitFor(() => expect(container).toContainElement(canvas.getByTestId('item')));
    expect(window.testing.args.onDragEnd).toBeCalledTimes(1);
    expect(window.testing.args.cancelDrop).toBeCalledTimes(1);

    window.testing.updateArgs({ cancelDrop: fn(() => true) });

    const newItem = canvas.getByTestId('item');

    await fireEvent.pointerDown(newItem, { isPrimary: true, button: 0 });
    await fireEvent.pointerMove(newItem, { clientX: 400, clientY: 100 });
    await fireEvent.pointerUp(newItem);

    await sleep(100);

    expect(container).toContainElement(canvas.getByTestId('item'));
};
