import { createEvent, expect, fireEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { getTextFile, getImgFile } from '../files';

export const dropZone = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);

    await window.testing.resetStory();

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
    const fileEntries = fileList.map((f) => ({
        isFile: true,
        name: f.name,
        fullPath: `folder_one/folder_two/${f.name}`,
        file: (resolve) => resolve(f),
    }));
    const items = fileEntries.map((fe) => ({
        kind: 'file',
        webkitGetAsEntry: () => fe,
    }));

    Object.defineProperty(dragOverEvent, 'dataTransfer', {
        value: {
            files: fileList,
            items: items,
            types: ['Files'],
        },
    });
    Object.defineProperty(dropEvent, 'dataTransfer', {
        value: {
            files: fileList,
            items: items,
            types: ['Files'],
        },
    });

    await fireEvent(dropZone, dragOverEvent);
    await fireEvent(dropZone, dropEvent);

    await waitFor(() => {
        expect(clearTrigger).toBeVisible();
        expect([...input.files]).toMatchObject(fileList);
    });
};
