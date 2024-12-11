import { ReactNode } from 'react';
import { Meta } from '@storybook/react';
import { Icon } from '@optimacros-ui/icon';
import { TreeMenu } from './index';
import { menuItems } from './mock';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px' }}>{children}</div>
);

export default {
    title: 'UI Kit core/TreeMenu',
    component: TreeMenu.Root,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
} as Meta;

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
