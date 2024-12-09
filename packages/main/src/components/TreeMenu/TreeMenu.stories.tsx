import { Icon } from '@optimacros/ui-kit-core';
import { Meta } from '@storybook/react';
import { TreeMenu } from './index';
import { menuItems } from './mock';

const Wrapper = ({ children }: { children }) => (
    <div style={{ marginLeft: '20px' }}>{children}</div>
);

const meta: Meta<typeof TreeMenu> = {
    title: 'UI Kit main/TreeMenuV2',
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};
export default meta;

export const Basic = () => {
    return (
        <TreeMenu.Root>
            <TreeMenu.Tree>
                {menuItems.map((node, index) => {
                    return (
                        <TreeMenu.TreeNode key={node.id} node={node} indexPath={[index]}>
                            <TreeMenu.BranchControl node={node} indexPath={[index]}>
                                <TreeMenu.BranchIcon>
                                    <Icon value="inbox" />
                                </TreeMenu.BranchIcon>
                                <TreeMenu.BranchText node={node} indexPath={[index]}>
                                    {node.name}
                                </TreeMenu.BranchText>
                                <TreeMenu.BranchIndicator node={node} indexPath={[index]}>
                                    <Icon value="keyboard-double-arrow-right" />
                                </TreeMenu.BranchIndicator>
                            </TreeMenu.BranchControl>
                            <TreeMenu.BranchContent node={node} indexPath={[index]} />
                        </TreeMenu.TreeNode>
                    );
                })}
            </TreeMenu.Tree>
        </TreeMenu.Root>
    );
};
