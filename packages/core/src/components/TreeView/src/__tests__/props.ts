import { fn } from '@storybook/test';
import { TreeView } from '..';
import { ComponentProps } from 'react';
import { mockItems } from '../examples/mock';

export const props: Partial<ComponentProps<typeof TreeView.Root>> = {
    controllable: false,
    menuItems: mockItems,
    selectedValue: [],
    expandedValue: [],
    onExpandedChange: fn(),
    onSelectionChange: fn(),
    selectionMode: 'single',
};
