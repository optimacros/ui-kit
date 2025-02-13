import { createEvent, expect, fireEvent, within } from '@storybook/test';
import { props } from '../props';
import { getTextFile, getImgFile } from '../files';

export const dropZone = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('root');
    const input = canvas.getByTestId('input') as HTMLInputElement;
    const trigger = canvas.getByTestId('trigger');
    const clearTrigger = canvas.getByTestId('clear-trigger');
    const dropZone = canvas.getByTestId('dropzone');

    expect(root).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(trigger).toBeInTheDocument();
    expect(clearTrigger).toBeInTheDocument();
    expect(clearTrigger).not.toBeVisible();
    expect(dropZone).toBeInTheDocument();

    await window.takeScreenshot?.();

    const dragOverEvent = createEvent.dragOver(dropZone);
    const dropEvent = createEvent.drop(dropZone);
    const fileList = [getImgFile(123), getTextFile(), getImgFile(1243)];

    Object.defineProperty(dragOverEvent, 'dataTransfer', {
        value: {
            files: fileList,
            items: fileList,
            types: ['Files'],
        },
    });
    Object.defineProperty(dropEvent, 'dataTransfer', {
        value: {
            files: fileList,
            items: fileList,
            types: ['Files'],
        },
    });

    await fireEvent(dropZone, dragOverEvent);
    await fireEvent(dropZone, dropEvent);

    expect(clearTrigger).toBeVisible();
    expect([...input.files]).toMatchObject(fileList);
};
