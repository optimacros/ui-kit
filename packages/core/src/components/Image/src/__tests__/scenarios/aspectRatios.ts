import { expect, waitFor, within } from '@storybook/test';
import type { ImageRatio } from '../../Image';
import { round } from '@optimacros-ui/utils';

const allRatios: Record<ImageRatio, number> = {
    square: 1,
    portrait: 1.5,
    landscape: 0.75,
    wide: 0.5625,
    ultrawide: 0.4285,
    golden: 0.618,
    custom: 0.7,
};

export const aspectRatios = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const images = canvas.getAllByTestId('image') as HTMLImageElement[];

    expect(images).toHaveLength(Object.keys(allRatios).length);

    await waitFor(() => expect(images.every((i) => i.dataset.state === 'visible')).toBeTruthy());

    images.forEach((image) => {
        const root = image.parentElement;
        const imageRatioKey = root.getAttribute('data-aspect-ratio');
        const ratioValue = allRatios[imageRatioKey];

        const { width, height } = image.getBoundingClientRect();

        const actualRatio = round(height / width, 4);

        expect(actualRatio).toEqual(ratioValue);
    });
};
