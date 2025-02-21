import { expect, fireEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';

export const basic = async ({ globals, canvasElement, step }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    const canvas = within(canvasElement);

    const root = canvasElement.querySelector('[data-scope="image"][data-part="root"]');
    const image = canvas.getByTestId('image');
    const fallback = canvas.getByTestId('fallback');

    expect(root).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).not.toBeVisible();
    expect(image).toHaveAttribute('data-state', 'hidden');
    expect(fallback).toBeInTheDocument();
    expect(fallback).toBeVisible();
    expect(fallback).toHaveTextContent('Loading...');

    await step('image loading', async () => {
        await waitFor(() => {
            expect(image).toBeVisible();
            expect(image).toHaveAttribute('data-state', 'visible');
            expect(window.testing.args.onStatusChange).toHaveBeenCalledTimes(1);
            expect(window.testing.args.onStatusChange).toHaveBeenLastCalledWith({
                status: 'loaded',
            });
        });
    });

    await step('image error', async () => {
        await fireEvent.error(image);

        await waitFor(() => {
            expect(image).not.toBeVisible();
            expect(image).toHaveAttribute('data-state', 'hidden');
            expect(window.testing.args.onStatusChange).toHaveBeenCalledTimes(2);
            expect(window.testing.args.onStatusChange).toHaveBeenLastCalledWith({
                status: 'error',
            });
            expect(fallback).toHaveTextContent('Error');
        });
    });
};
