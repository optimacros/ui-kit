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

    window.testing.updateArgs({ ...props, controllable: true, validate });

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

    const user = userEvent.setup();

    await user.upload(input, largeImgFile);

    await waitFor(() => expect(window.testing.args.validate).toBeCalledTimes(1));
    await waitFor(() =>
        expect(window.testing.args.onFileChange).toHaveBeenLastCalledWith({
            acceptedFiles: [],
            rejectedFiles: [
                {
                    file: largeImgFile,
                    errors: ['too large'],
                },
            ],
        }),
    );

    await user.upload(input, textFile);

    await waitFor(() => expect(window.testing.args.validate).toBeCalledTimes(2));
    await waitFor(() =>
        expect(window.testing.args.onFileChange).toHaveBeenLastCalledWith({
            acceptedFiles: [],
            rejectedFiles: [
                {
                    file: textFile,
                    errors: ['text files are not allowed'],
                },
            ],
        }),
    );

    await user.upload(input, smallImgFile);

    await waitFor(() => expect(window.testing.args.validate).toBeCalledTimes(3));
    expect(window.testing.args.onFileChange).toHaveBeenLastCalledWith({
        acceptedFiles: [smallImgFile],
        rejectedFiles: [],
    });

    await user.click(clearTrigger);

    await waitFor(() => expect(clearTrigger).not.toBeVisible());

    await user.upload(input, [smallImgFile, textFile, largeImgFile]);

    await waitFor(() => expect(window.testing.args.validate).toBeCalledTimes(6));
    expect(window.testing.args.onFileChange).toHaveBeenLastCalledWith({
        acceptedFiles: [smallImgFile],
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
