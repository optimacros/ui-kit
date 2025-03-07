import { fn } from '@storybook/test';
import { TreeView } from '..';
import { ComponentProps } from 'react';
import { mockItems } from '../examples/mock';

export const props: Partial<ComponentProps<typeof TreeView.Root>> = {
    menuItems: mockItems,
    selectedValue: undefined,
    expandedValue: undefined,
    defaultExpandedValue: undefined,
    defaultSelectedValue: undefined,
    onExpandedChange: fn(),
    onSelectionChange: fn(),
    selectionMode: 'single',
};
