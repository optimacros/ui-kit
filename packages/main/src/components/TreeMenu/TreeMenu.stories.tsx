import { Icon } from '@optimacros/ui-kit-core';
import { ReactNode } from 'react';
import { TreeMenu } from './index';
import { menuItems } from './mock';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px' }}>{children}</div>
);

export default {
    title: 'UI Kit main/TreeMenu',
    component: TreeMenu.Root,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const Basic = () => {
    return (
        <TreeMenu.Root menuItems={menuItems}>
            <TreeMenu.Tree>
                {menuItems.map((node, index) => (
                    <TreeMenu.TreeNode key={node.id} node={node} indexPath={[index]}>
                        <Icon value="chevron_right" />
                        <Icon value="folder_open" />
                        <Icon value="description" />
                    </TreeMenu.TreeNode>
                ))}
            </TreeMenu.Tree>
        </TreeMenu.Root>
    );
};
