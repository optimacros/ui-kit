import { ReactNode } from 'react';
import { Meta } from '@storybook/react';
import { Icon } from '@optimacros-ui/icon';
import { TreeView } from './index';
import { createMockMenuItems } from './mock';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px' }}>{children}</div>
);

const meta: Meta = {
    title: 'UI Kit core/TreeView',
    component: TreeView.Root,
    argTypes: {
        menuItems: {
            control: { type: 'object' },
            description: 'Tree view menu items data structure',
        },
        selectionMode: {
            control: { type: 'radio' },
            options: ['single', 'multiple'],
            defaultValue: 'single',
            description: 'Selection mode for tree items',
        },
        selectedValue: {
            control: { type: 'object' },
            description: 'Array of selected item IDs',
        },
        expandedValue: {
            control: { type: 'object' },
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
    },
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
    tags: ['skip-test-runner'],
};

export default meta;

const menuItems = createMockMenuItems(3);

export const Basic = () => {
    return (
        <TreeView.Root menuItems={menuItems}>
            <TreeView.Tree>
                {menuItems.rootNode.children.map((node, index) => (
                    <TreeView.TreeNode key={node.id} node={node} indexPath={[index]}>
                        <Icon value="chevron_right" />
                    </TreeView.TreeNode>
                ))}
            </TreeView.Tree>
        </TreeView.Root>
    );
};

export const WithIcons = () => {
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

export const Multiple = () => {
    return (
        <TreeView.Root menuItems={menuItems} selectionMode="multiple">
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

export const selectedValue = () => {
    return (
        <TreeView.Root
            menuItems={menuItems}
            selectedValue={['selected']}
            expandedValue={['parent-selected']}
        >
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
