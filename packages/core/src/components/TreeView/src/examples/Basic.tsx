import { Icon } from '@optimacros-ui/icon';
import { Text } from '@optimacros-ui/text';
import { TreeView } from '..';

export const Basic = (props: TreeView.RootProps) => {
    return (
        <TreeView.Root {...props} data-testid="root">
            <TreeView.Tree data-testid="tree">
                {props.menuItems.rootNode.children.map((node, index) => (
                    <TreeView.TreeNode key={node.id} node={node} indexPath={[index]}>
                        {/* inidicator */}
                        <Icon value="chevron_right" />

                        {/* control */}
                        <Icon value="folder" />

                        <Text.Span>content</Text.Span>
                    </TreeView.TreeNode>
                ))}
            </TreeView.Tree>
        </TreeView.Root>
    );
};
