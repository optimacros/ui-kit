import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { StoryContext } from '@storybook/react';
import { ComponentProps } from 'react';
import { TreeView } from '../../';
import {
    getBranchElements,
    isBranchExpanded,
    isBranchNotExpanded,
    isBranchNotSelected,
    isBranchSelected,
} from './utils';

export const basic = async ({
    globals,
    canvasElement,
    step,
}: StoryContext<ComponentProps<typeof TreeView.Root>>) => {
    if (!globals.test) {
        return;
    }

    await window.testing.updateArgs(props);
    await window.testing.resetStory();

    const tree = within(canvasElement).getByTestId('tree');

    expect(tree.childNodes).toHaveLength(3); // 1 итем, 2 бранча в корне

    const items = tree.querySelectorAll(
        '[data-scope="tree-view"][data-part="item"]',
    ) as NodeListOf<HTMLElement>;
    const branches = tree.querySelectorAll(
        '[data-scope="tree-view"][data-part="tree-node-branch"]',
    ) as NodeListOf<HTMLElement>;

    expect(items).toHaveLength(3);
    expect(branches).toHaveLength(3);

    items.forEach((item) => {
        expect(item).not.toHaveAttribute('data-selected');
    });

    branches.forEach((branch) => {
        isBranchNotSelected(branch);
        isBranchNotExpanded(branch);
    });

    const { control: control1 } = getBranchElements(branches[0]);
    const { control: control2 } = getBranchElements(branches[1]);
    const { control: control3 } = getBranchElements(branches[2]);

    const user = userEvent.setup();

    await step('select/expand (click)', async () => {
        await user.click(control1);

        await waitFor(() => {
            isBranchSelected(branches[0]);
            isBranchNotSelected(branches[1]);
            isBranchNotSelected(branches[2]);

            isBranchExpanded(branches[0]);
            isBranchNotExpanded(branches[1]);
            isBranchNotExpanded(branches[2]);
        });

        expect(window.testing.args.onExpandedChange).toBeCalledTimes(1);
        expect(window.testing.args.onExpandedChange).toHaveBeenLastCalledWith(
            expect.objectContaining({
                expandedValue: [branches[0].dataset.value],
            }),
        );
        expect(window.testing.args.onSelectionChange).toBeCalledTimes(1);
        expect(window.testing.args.onSelectionChange).toHaveBeenLastCalledWith(
            expect.objectContaining({
                selectedValue: [branches[0].dataset.value],
            }),
        );

        await user.click(control2);

        await waitFor(() => {
            isBranchNotSelected(branches[0]);
            isBranchSelected(branches[1]);
            isBranchNotSelected(branches[2]);

            isBranchExpanded(branches[0]);
            isBranchExpanded(branches[1]);
            isBranchNotExpanded(branches[2]);
        });

        expect(window.testing.args.onExpandedChange).toBeCalledTimes(2);
        expect(window.testing.args.onExpandedChange).toHaveBeenLastCalledWith(
            expect.objectContaining({
                expandedValue: [branches[0].dataset.value, branches[1].dataset.value],
            }),
        );
        expect(window.testing.args.onSelectionChange).toBeCalledTimes(2);
        expect(window.testing.args.onSelectionChange).toHaveBeenLastCalledWith(
            expect.objectContaining({
                selectedValue: [branches[1].dataset.value],
            }),
        );

        await user.click(control3);

        await waitFor(() => {
            isBranchExpanded(branches[0]);
            isBranchExpanded(branches[1]);
            isBranchExpanded(branches[2]);

            isBranchNotSelected(branches[0]);
            isBranchNotSelected(branches[1]);
            isBranchSelected(branches[2]);
        });

        expect(window.testing.args.onExpandedChange).toBeCalledTimes(3);
        expect(window.testing.args.onExpandedChange).toHaveBeenLastCalledWith(
            expect.objectContaining({
                expandedValue: [
                    branches[0].dataset.value,
                    branches[1].dataset.value,
                    branches[2].dataset.value,
                ],
            }),
        );
        expect(window.testing.args.onSelectionChange).toBeCalledTimes(3);
        expect(window.testing.args.onSelectionChange).toHaveBeenLastCalledWith(
            expect.objectContaining({
                selectedValue: [branches[2].dataset.value],
            }),
        );

        items.forEach((item) => {
            expect(item).not.toHaveAttribute('data-selected');
        });

        await window.takeScreenshot?.('branch-selected-and-expanded');
    });

    await step('keyboard navigation', async () => {
        await window.testing.resetStory();

        const tree = within(canvasElement).getByTestId('tree');

        const items = tree.querySelectorAll(
            '[data-scope="tree-view"][data-part="item"]',
        ) as NodeListOf<HTMLElement>;
        const branches = tree.querySelectorAll(
            '[data-scope="tree-view"][data-part="tree-node-branch"]',
        ) as NodeListOf<HTMLElement>;

        const { control: control1 } = getBranchElements(branches[0]);

        await user.keyboard('{Tab}');

        await waitFor(() => {
            isBranchNotExpanded(branches[0]);
            isBranchNotExpanded(branches[1]);
            isBranchNotExpanded(branches[2]);

            isBranchNotSelected(branches[0]);
            isBranchNotSelected(branches[1]);
            isBranchNotSelected(branches[2]);

            expect(control1).toHaveAttribute('data-focus');
        });

        await user.keyboard('{Space}');

        await waitFor(() => {
            isBranchExpanded(branches[0]);
            isBranchNotExpanded(branches[1]);
            isBranchNotExpanded(branches[2]);

            isBranchSelected(branches[0]);
            isBranchNotSelected(branches[1]);
            isBranchNotSelected(branches[2]);
        });

        await user.keyboard('{ArrowDown}{ArrowDown}');

        await waitFor(() => expect(items[1]).toHaveAttribute('data-focus'));

        await user.keyboard('{Space}');

        await waitFor(() => {
            isBranchExpanded(branches[0]);
            isBranchNotExpanded(branches[1]);
            isBranchNotExpanded(branches[2]);

            isBranchNotSelected(branches[0]);
            expect(items[1]).toHaveAttribute('data-selected');
            isBranchNotSelected(branches[1]);
            isBranchNotSelected(branches[2]);
        });

        await window.takeScreenshot?.('item-selected');
    });
};
