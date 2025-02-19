import { expect, fireEvent, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';

export const drag = async ({ globals }) => {
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

    const content = canvas.getByTestId('content');
    const dragHandle1 = canvas.getByTestId('drag-handle1');
    const dragHandle2 = canvas.getByTestId('drag-handle2');

    const originalCoords = content.getBoundingClientRect();

    const expectedCoordsFirst = {
        top: expect.closeTo(originalCoords.top - 100, 3),
        left: expect.closeTo(originalCoords.left - 50, 3),
    };
    const expectedCoordsSecond = {
        top: expect.closeTo(originalCoords.top + 100, 3),
        left: expect.closeTo(originalCoords.left + 50, 3),
    };

    await fireEvent.pointerDown(dragHandle1, { isPrimary: true, button: 0 });
    await fireEvent.pointerMove(dragHandle1, { clientX: -50, clientY: -100 });
    await fireEvent.pointerUp(dragHandle1);

    const coordsFirst = content.getBoundingClientRect();

    expect(coordsFirst).toMatchObject(expectedCoordsFirst);

    await fireEvent.pointerDown(dragHandle2, { isPrimary: true, button: 0 });
    await fireEvent.pointerMove(dragHandle2, { clientX: 100, clientY: 200 });
    await fireEvent.pointerUp(dragHandle2);

    const coordsSecond = content.getBoundingClientRect();

    expect(coordsSecond).toMatchObject(expectedCoordsSecond);
};
