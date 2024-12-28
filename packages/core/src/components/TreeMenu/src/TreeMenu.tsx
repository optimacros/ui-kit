import { ComponentProps } from 'react';
import { forward } from '@optimacros-ui/store';
import { Popover } from '@optimacros-ui/popover';
import { TreeView } from '@optimacros-ui/tree-view';

export const { Trigger, Positioner, Content } = Popover;
export const { Tree, TreeNode } = TreeView;

export const Root = forward<{}, 'div'>((props, ref) => {
    return <TreeView.Root {...props} data-tag="tree-menu" ref={ref} />;
});

export const PortalRoot = forward<ComponentProps<typeof Popover.Root>, 'div'>((props, ref) => {
    return <Popover.Root {...props} data-tag="tree-menu" ref={ref} />;
});
