import { ComponentProps } from 'react';
import { forward } from '@optimacros-ui/store';
import { Popover } from '@optimacros-ui/popover';
import { TreeView } from '@optimacros-ui/tree-view';

export { Trigger, Positioner, Content } from '@optimacros-ui/popover';
export { Tree, TreeNode } from '@optimacros-ui/tree-view';

export const Root = forward<{}, 'div'>((props, ref) => {
    return <TreeView.Root {...props} data-tag="tree-menu" ref={ref} />;
});

export const PortalRoot = forward<ComponentProps<typeof Popover.Root>, 'div'>((props, ref) => {
    return <Popover.Root {...props} data-tag="tree-menu" ref={ref} />;
});
