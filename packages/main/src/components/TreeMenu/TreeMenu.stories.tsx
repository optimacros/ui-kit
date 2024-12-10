import { TreeMenu } from './index';
import { collection } from './mock';

export default {
    title: 'UI Kit main/TreeMenuV2',
    component: TreeMenu.Root,
    tags: ['autodocs'],
};

export const Basic = () => {
    return (
        <TreeMenu.Root>
            <TreeMenu.Tree>
                {collection.rootNode.children.map((node, index) => (
                    <TreeMenu.TreeNode key={node.id} node={node} indexPath={[index]} />
                ))}
            </TreeMenu.Tree>
        </TreeMenu.Root>
    );
};
