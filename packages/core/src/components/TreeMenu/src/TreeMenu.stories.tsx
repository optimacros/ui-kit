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
    argTypes: {
        menuItems: {
            control: { type: 'object' },
            description: 'Tree menu items data structure',
        },
        selectionMode: {
            control: { type: 'radio' },
            options: ['single', 'multiple'],
            defaultValue: 'single',
            description: 'Selection mode for tree items',
        },
        selectedValue: {
            control: { type: 'array' },
            description: 'Array of selected item IDs',
        },
        expandedValue: {
            control: { type: 'array' },
            description: 'Array of expanded item IDs',
        },
        onExpandedChange: {
            action: 'expandedChanged',
            description: 'Callback fired when expansion state changes',
        },
        onSelectedChange: {
            action: 'selectedChanged',
            description: 'Callback fired when selection changes',
        },
        positioning: {
            control: { type: 'select' },
            options: ['popper', 'portal', 'inline'],
            defaultValue: 'popper',
            description: 'Positioning strategy for the menu',
        },
        open: {
            control: { type: 'boolean' },
            description: 'Controls the open state of the menu',
        },
        onOpenChange: {
            action: 'openChanged',
            description: 'Callback fired when open state changes',
        },
    },
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
                    <Button variant="bordered">Menu</Button>
                </TreeMenu.Trigger>
                <TreeMenu.Positioner>
                    <TreeMenu.Content>
                        <TreeMenu.Tree>
                            {menuItems.rootNode.children.map((node, index) => (
                                <TreeMenu.TreeNode key={node.id} node={node} indexPath={[index]}>
                                    <Icon value="chevron_right" />
                                </TreeMenu.TreeNode>
                            ))}
                        </TreeMenu.Tree>
                    </TreeMenu.Content>
                </TreeMenu.Positioner>
            </TreeMenu.PortalRoot>
        </TreeMenu.Root>
    );
};

export const WithIcons = () => {
    return (
        <TreeMenu.Root menuItems={menuItems}>
            <TreeMenu.PortalRoot>
                <TreeMenu.Trigger asChild>
                    <Button variant="bordered">Menu</Button>
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

export const Multiple = () => {
    return (
        <TreeMenu.Root menuItems={menuItems} selectionMode="multiple">
            <TreeMenu.PortalRoot>
                <TreeMenu.Trigger asChild>
                    <Button variant="bordered">Menu</Button>
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

export const selectedValue = () => {
    return (
        <TreeMenu.Root
            menuItems={menuItems}
            selectedValue={['selected']}
            expandedValue={['parent-selected']}
        >
            <TreeMenu.PortalRoot>
                <TreeMenu.Trigger asChild>
                    <Button variant="bordered">Menu</Button>
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
