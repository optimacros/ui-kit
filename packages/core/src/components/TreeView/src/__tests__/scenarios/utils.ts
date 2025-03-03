import { expect } from '@storybook/test';

export const getBranchElements = (b: HTMLElement) => {
    const control = b.querySelector('& > [data-part="branch-control"]');
    const text = control.querySelector('& > [data-part="branch-text"]');
    const indicator = control.querySelector('& > [data-part="branch-indicator"]');
    const content = b.querySelector('& > [data-part="branch-content"]');

    return { control, text, indicator, content };
};

export const isBranchSelected = (b: HTMLElement) => {
    const { control, indicator } = getBranchElements(b);

    expect(b).toHaveAttribute('data-selected');
    expect(control).toHaveAttribute('data-selected');
    expect(indicator).toHaveAttribute('data-selected');
};

export const isBranchNotSelected = (b: HTMLElement) => {
    const { control, indicator } = getBranchElements(b);

    expect(b).not.toHaveAttribute('data-selected');
    expect(control).not.toHaveAttribute('data-selected');
    expect(indicator).not.toHaveAttribute('data-selected');
};

export const isBranchExpanded = (b: HTMLElement) => {
    const { control, text, indicator, content } = getBranchElements(b);

    expect(b).toHaveAttribute('data-state', 'open');
    expect(control).toHaveAttribute('data-state', 'open');
    expect(text).toHaveAttribute('data-state', 'open');
    expect(indicator).toHaveAttribute('data-state', 'open');
    expect(content).toHaveAttribute('data-state', 'open');
    expect(content).toBeVisible();
};

export const isBranchNotExpanded = (b: HTMLElement) => {
    const { control, text, indicator, content } = getBranchElements(b);

    expect(b).toHaveAttribute('data-state', 'closed');
    expect(control).toHaveAttribute('data-state', 'closed');
    expect(text).toHaveAttribute('data-state', 'closed');
    expect(indicator).toHaveAttribute('data-state', 'closed');
    expect(content).toHaveAttribute('data-state', 'closed');
    expect(content).not.toBeVisible();
};
