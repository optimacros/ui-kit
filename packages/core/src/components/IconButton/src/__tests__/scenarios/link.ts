import { expect } from '@storybook/test';
import { props } from '../props';

export const link = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    const target = '_blank';
    const href = 'https://optimacros.com';

    window.testing.updateArgs({ ...props, target, href });

    await window.waitForPageTrulyReady?.();

    const root = canvasElement.querySelector(
        '[data-scope="button"][data-part="root"][data-tag="icon-button"]',
    );

    expect(root).toBeInTheDocument();
    expect(root).toHaveAttribute('target', target);
    expect(root).toHaveAttribute('href', href);
};
