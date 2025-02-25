import { expect } from '@storybook/test';
import { props } from '../props';

export const basic = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const icon = canvasElement.querySelector('[data-scope="font-icon"][data-part="root"]');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass(window.testing.args.className);
    expect(icon).toHaveAttribute('aria-label', window.testing.args.alt);
    expect(icon).toHaveAttribute('title', window.testing.args.title);
    // это все не работает
    // expect(icon).toHaveStyle('color: red;');
    // expect(icon).toHaveStyle({ color: 'red' });
    // const style = getComputedStyle(icon);
    // expect(style.color).toBe('red');
    expect(icon).toHaveAttribute('style', 'color: green;');
};
