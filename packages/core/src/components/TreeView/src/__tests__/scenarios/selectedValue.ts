import { expect, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';
import { StoryContext } from '@storybook/react';
import { ComponentProps } from 'react';
import { TreeView } from '../../';
import { isBranchNotSelected, isBranchExpanded } from './utils';

export const selectedValue = async ({
    globals,
    canvasElement,
}: StoryContext<ComponentProps<typeof TreeView.Root>>) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({ controllable: true });
    await sleep(1);
    window.testing.updateArgs({
        ...props,
        selectedValue: ['1/1', '2', '3/1/1'],
        expandedValue: ['1', '3', '3/1'],
    });

    await window.waitForPageTrulyReady?.();

    const tree = within(canvasElement).getByTestId('tree');

    const items = tree.querySelectorAll(
        '[data-scope="tree-view"][data-part="item"]',
    ) as NodeListOf<HTMLElement>;
    const branches = tree.querySelectorAll(
        '[data-scope="tree-view"][data-part="tree-node-branch"]',
    ) as NodeListOf<HTMLElement>;

    branches.forEach((branch) => {
        isBranchNotSelected(branch);
        isBranchExpanded(branch);
    });

    items.forEach((item) => {
        expect(item).toHaveAttribute('data-selected');
    });
};
