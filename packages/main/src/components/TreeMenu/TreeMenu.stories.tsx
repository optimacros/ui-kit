import { Icon } from '@optimacros/ui-kit-core';
import { TreeMenu } from './index';
import { menuItems } from './mock';

export default {
    title: 'UI Kit main/TreeMenuV2',
    component: TreeMenu.Root,
    tags: ['autodocs'],
};

export const Basic = () => {
    return (
        <TreeMenu.Root menuItems={menuItems}>
            <TreeMenu.Tree>
                {menuItems.map((node, index) => (
                    <TreeMenu.TreeNode key={node.id} node={node} indexPath={[index]}>
                        <Icon value="folder_open" />
                        <Icon value="chevron_right" />
                    </TreeMenu.TreeNode>
                ))}
            </TreeMenu.Tree>
        </TreeMenu.Root>
    );
};
