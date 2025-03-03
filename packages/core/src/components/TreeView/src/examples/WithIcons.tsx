import { Icon } from '@optimacros-ui/icon';
import { TreeView } from '..';

export const WithIcons = (props: TreeView.RootProps) => {
    return (
        <TreeView.Root {...props}>
            <TreeView.Tree>
                {props.menuItems.rootNode.children.map((node, index) => (
                    <TreeView.TreeNode key={node.id} node={node} indexPath={[index]}>
                        <Icon value="chevron_right" />
                        <Icon value="folder_open" />
                        <Icon value="description" />
                    </TreeView.TreeNode>
                ))}
            </TreeView.Tree>
        </TreeView.Root>
    );
};
