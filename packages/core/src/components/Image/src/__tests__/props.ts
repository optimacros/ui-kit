import { ComponentProps } from 'react';
import { Image } from '../';
import { fn } from '@storybook/test';

export const props: Partial<ComponentProps<typeof Image.Root>> = {
    ratio: 'square',
    onStatusChange: fn(),
};
