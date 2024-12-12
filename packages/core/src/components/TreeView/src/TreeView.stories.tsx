import { ReactNode } from 'react';
import { Meta } from '@storybook/react';
import { Icon } from '@optimacros-ui/icon';
import { TreeView } from './index';
import { createMockMenuItems } from './mock';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px' }}>{children}</div>
);

export default {
    title: 'UI Kit core/TreeView',
    component: TreeView.Root,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
} as Meta;

const menuItems = createMockMenuItems(3);

export const Basic = () => {
    return (
        <TreeView.Root menuItems={menuItems}>
            <TreeView.Tree>
                {menuItems.rootNode.children.map((node, index) => (
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
