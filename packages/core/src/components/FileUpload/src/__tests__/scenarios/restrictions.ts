import { expect, userEvent, within } from '@storybook/test';
import { props } from '../props';
import { getTextFile, getImgFile } from '../files';

export const restrictions = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({
        ...props,
        maxFiles: 3,
        maxFileSize: 1000,
        minFileSize: 100,
        accept: ['image/*'],
    });

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('root');
    const input = canvas.getByTestId('input');
    const trigger = canvas.getByTestId('trigger');
    const clearTrigger = canvas.getByTestId('clear-trigger');

    expect(root).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(trigger).toBeInTheDocument();
    expect(clearTrigger).toBeInTheDocument();
    expect(clearTrigger).not.toBeVisible();

    const smallImgFile = getImgFile(44); // not okay
    const imgFile = getImgFile(454); // okay
    const largeImgFile = getImgFile(4544); // not okay
    const textFile = getTextFile(); // not okay

    const user = userEvent.setup();

    await user.upload(input, [smallImgFile, imgFile, largeImgFile, textFile]);

    expect(canvas.getByText('img.jpg')).toBeInTheDocument();
    expect(canvas.queryByText('text.txt')).toBeFalsy();

    // TODO проверить maxFiles, сейчас оно работает глючно:
    // 1. учитываются rejected файлы (текстовый файл туда не попадает почему-то, только 2 картинки). Вот сейчас загружен 1, но больше загрузить я не могу. А в инпуте сейчас их 3 и непонятно, какие accepted/rejected
    // 2. при массовой загрузке, если файлов больше, то они все игнорятся
    // 3. Б-же, дай мне сил
    // 4. вызов clearRejectedFiles из апи при каждом коннекте не помогает
};
