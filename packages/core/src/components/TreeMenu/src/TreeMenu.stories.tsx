import { Button } from '@optimacros-ui/button';
import { ReactNode } from 'react';
import { Meta } from '@storybook/react';
import { Icon } from '@optimacros-ui/icon';
import { TreeMenu } from './index';
import { createMockMenuItems } from './mock';

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

const menuItems = createMockMenuItems(4);

export const Basic = () => {
    return (
        <TreeMenu.Root menuItems={menuItems}>
            <TreeMenu.PortalRoot>
                <TreeMenu.Trigger asChild>
                    <Button variant="bordered">Click me</Button>
                </TreeMenu.Trigger>
                <TreeMenu.Positioner>
                    <TreeMenu.Content>
                        <TreeMenu.Tree>
                            {menuItems.rootNode.children.map((node, index) => (
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
