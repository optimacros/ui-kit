import { expect } from '@storybook/test';
import { props } from '../props';

export const basic = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const root = canvasElement.querySelector('[data-scope="flex"][data-part="root"]');
    const styles = window.getComputedStyle(document.body);
    const remInPx = parseFloat(styles.getPropertyValue('font-size'));
    const gapInRem = +styles
        .getPropertyValue(`--spacing-${window.testing.args.gap}`)
        .replace('rem', '');
    const gapInPxAsString = `${remInPx * gapInRem}px`;

    expect(root).toBeInTheDocument();
    expect(root).toHaveStyle({
        'flex-direction': 'column',
        'align-items': 'flex-end',
        'justify-content': 'flex-end',
        'flex-wrap': 'wrap',
        'row-gap': gapInPxAsString,
        'column-gap': gapInPxAsString,
        width: '300px',
        height: '100px',
    });
    expect(root).toHaveAttribute('data-fluid', 'false');
    expect(root).toHaveAttribute('class', 'className');

    await window.takeScreenshot?.();
};
