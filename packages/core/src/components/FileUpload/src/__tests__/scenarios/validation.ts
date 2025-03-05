import { expect, fn, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { getTextFile, getImgFile } from '../files';

export const validation = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    const validate = fn((file) => {
        if (file.size > 100) {
            return ['too large'];
        }

        if (file.type === 'text/plain') {
            return ['text files are not allowed'];
        }

        return null;
    });

    const smallImgFile = getImgFile(44); // okay
    const largeImgFile = getImgFile(454); // not okay
    const textFile = getTextFile(); // not okay

    await window.testing.updateArgs({ ...props, validate });

    await window.testing.resetStory();

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

    const user = userEvent.setup();

    await user.upload(input, largeImgFile);

    await waitFor(() => expect(window.testing.args.validate).toBeCalledTimes(1));
    expect(window.testing.args.onFileChange).toBeCalledTimes(1);
    expect(window.testing.args.onFileChange.mock.calls[0][0]).toEqual({
        acceptedFiles: [],
        rejectedFiles: [
            {
                file: largeImgFile,
                errors: ['too large'],
            },
        ],
    });

    await user.upload(input, textFile);

    await waitFor(() => expect(window.testing.args.validate).toBeCalledTimes(2));
    expect(window.testing.args.onFileChange).toBeCalledTimes(2);
    expect(window.testing.args.onFileChange.mock.calls[1][0]).toEqual({
        acceptedFiles: [],
        rejectedFiles: [
            {
                file: textFile,
                errors: ['text files are not allowed'],
            },
        ],
    });

    await user.upload(input, smallImgFile);

    await waitFor(() => expect(window.testing.args.validate).toBeCalledTimes(3));
    // TODO Вот тут непонятно, зачем нам 4й вызов
    expect(window.testing.args.onFileChange).toBeCalledTimes(4);
    expect(window.testing.args.onFileChange.mock.calls[2][0]).toEqual({
        acceptedFiles: [smallImgFile],
        rejectedFiles: [
            {
                file: textFile,
                errors: ['text files are not allowed'],
            },
        ],
    });
    expect(window.testing.args.onFileChange.mock.calls[3][0]).toEqual({
        acceptedFiles: [],
        rejectedFiles: [],
    });

    await user.click(clearTrigger);

    await waitFor(() => expect(clearTrigger).not.toBeVisible());

    expect(window.testing.args.onFileChange).toBeCalledTimes(5);
    expect(window.testing.args.onFileChange.mock.calls[4][0]).toEqual({
        acceptedFiles: [],
        rejectedFiles: [],
    });

    await user.upload(input, [smallImgFile, textFile, largeImgFile]);

    await waitFor(() => expect(window.testing.args.validate).toBeCalledTimes(6));

    // TODO А тут зачем-то разделилось на 2 вызова
    expect(window.testing.args.onFileChange).toBeCalledTimes(7);
    expect(window.testing.args.onFileChange.mock.calls[5][0]).toEqual({
        acceptedFiles: [smallImgFile],
        rejectedFiles: [],
    });
    expect(window.testing.args.onFileChange.mock.calls[6][0]).toEqual({
        acceptedFiles: [],
        rejectedFiles: [
            {
                file: textFile,
                errors: ['text files are not allowed'],
            },
            {
                file: largeImgFile,
                errors: ['too large'],
            },
        ],
    });
};
