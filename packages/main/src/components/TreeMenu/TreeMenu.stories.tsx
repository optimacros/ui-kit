import { ReactNode } from 'react';
import { Icon } from '@optimacros-ui/core';
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

export const WithTrigger = () => {
    return (
        <TreeMenu.Root menuItems={menuItems}>
            <TreeMenu.PortalRoot>
                <TreeMenu.Trigger asChild>
                    <div>Click me</div>
                </TreeMenu.Trigger>
                <TreeMenu.Positioner>
                    <TreeMenu.Content>
                        <TreeMenu.Tree>
                            {menuItems.map((node, index) => (
                                <TreeMenu.TreeNode key={node.id} node={node} indexPath={[index]}>
                                    <Icon value="chevron_right" />
                                    <Icon value="folder_open" />
                                    <Icon value="description" />
                                </TreeMenu.TreeNode>
                            ))}
                        </TreeMenu.Tree>
                    </TreeMenu.Content>
                </TreeMenu.Positioner>
            </TreeMenu.PortalRoot>
        </TreeMenu.Root>
    );
};
