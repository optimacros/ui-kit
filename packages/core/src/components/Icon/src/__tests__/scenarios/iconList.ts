import { expect, within } from '@storybook/test';

export const iconList = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const info = canvas.getByText('The icon name is copied when you click on it');
    const container = canvasElement.querySelector('[data-scope="grid"][data-part="root"]');
    const rootElements = canvasElement.querySelectorAll('[data-scope="icon"][data-part="root"]');

    expect(info).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(rootElements).toHaveLength(115);

    info.remove();
    container.removeAttribute('style');
    container.removeAttribute('data-cols');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';

    await window.takeScreenshot?.();
};
