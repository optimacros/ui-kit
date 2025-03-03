import { expect, userEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { sleep } from '@optimacros-ui/utils';
import { StoryContext } from '@storybook/react';
import { ComponentProps } from 'react';
import { TreeView } from '../../';
import {
    isBranchNotSelected,
    isBranchNotExpanded,
    getBranchElements,
    isBranchSelected,
} from './utils';

export const multiple = async ({
    globals,
    canvasElement,
    step,
}: StoryContext<ComponentProps<typeof TreeView.Root>>) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs({ controllable: true });
    await sleep(1);
    window.testing.updateArgs({ ...props, selectionMode: 'multiple' });

    await window.waitForPageTrulyReady?.();

    const tree = within(canvasElement).getByTestId('tree');

    expect(tree.childNodes).toHaveLength(3); // 1 итем, 2 бранча

    const branches = tree.querySelectorAll(
        '[data-scope="tree-view"][data-part="tree-node-branch"]',
    ) as NodeListOf<HTMLElement>;

    const { control: control1 } = getBranchElements(branches[0]);
    const { control: control2 } = getBranchElements(branches[1]);

    const user = userEvent.setup();

    await step('select/expand (click)', async () => {
        await user.keyboard('{Control>}');
        await user.click(control1);
        await user.keyboard('{/Control}');

        await waitFor(() => {
            isBranchSelected(branches[0]);
            isBranchNotSelected(branches[1]);
            isBranchNotSelected(branches[2]);
            isBranchNotExpanded(branches[0]);
            isBranchNotExpanded(branches[1]);
            isBranchNotExpanded(branches[2]);
        });

        expect(window.testing.args.onSelectionChange).toBeCalledTimes(1);
        expect(window.testing.args.onSelectionChange).toHaveBeenLastCalledWith(
            expect.objectContaining({
                selectedValue: [branches[0].dataset.value],
            }),
        );

        await user.keyboard('{Control>}');
        await user.click(control2);
        await user.keyboard('{/Control}');

        await waitFor(() => {
            isBranchSelected(branches[0]);
            isBranchSelected(branches[1]);
            isBranchNotSelected(branches[2]);
            isBranchNotExpanded(branches[0]);
            isBranchNotExpanded(branches[1]);
            isBranchNotExpanded(branches[2]);
        });

        expect(window.testing.args.onSelectionChange).toBeCalledTimes(2);
        expect(window.testing.args.onSelectionChange).toHaveBeenLastCalledWith(
            expect.objectContaining({
                selectedValue: [branches[0].dataset.value, branches[1].dataset.value],
            }),
        );

        await user.keyboard('{Control>}');
        await user.click(control1);
        await user.keyboard('{/Control}');

        await waitFor(() => {
            isBranchNotSelected(branches[0]);
            isBranchSelected(branches[1]);
            isBranchNotSelected(branches[2]);
            isBranchNotExpanded(branches[0]);
            isBranchNotExpanded(branches[1]);
            isBranchNotExpanded(branches[2]);
        });

        expect(window.testing.args.onSelectionChange).toBeCalledTimes(3);
        expect(window.testing.args.onSelectionChange).toHaveBeenLastCalledWith(
            expect.objectContaining({
                selectedValue: [branches[1].dataset.value],
            }),
        );

        expect(window.testing.args.onExpandedChange).toBeCalledTimes(0);
    });
};
