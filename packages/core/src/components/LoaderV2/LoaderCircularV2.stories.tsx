import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Loader } from './index';
import LinearStory from './LoaderLinearV2.stories';

const argTypes: Partial<ArgTypes> = {
    ...LinearStory.argTypes,
    multicolor: {
        control: 'boolean',
        description:
            ' If `true`, the circular progress bar will be changing its color. ' +
            'When type is `circular` and node is `indeterminate`.',
    },
};

const meta: Meta<typeof Loader.Linear> = {
    title: 'UI Kit core/LoaderV2 Circular',
    component: Loader.Circular,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Loader.Circular>;

export const Basic: Story = {
    args: {},
};

// export const Circular: Story = {
//     args: {
//         type: 'circular',
//         mode: 'indeterminate',
//     },
// };

// export const CircularMulticolor: Story = {
//     args: {
//         type: 'circular',
//         mode: 'indeterminate',
//         multicolor: true,
//     },
// };

// export const CircularDeterminate: Story = {
//     args: {
//         type: 'circular',
//         mode: 'determinate',
//         value: 25,
//     },
// };

// export const Linear: Story = {
//     args: {
//         type: 'linear',
//         mode: 'indeterminate',
//     },
// };

// export const LinearBuffer: Story = {
//     args: {
//         type: 'linear',
//         mode: 'determinate',
//         value: 23,
//         buffer: 40,
//         max: 100,
//     },
// };

// export const Disabled: Story = {
//     args: {
//         type: 'linear',
//         mode: 'determinate',
//         value: 23,
//         disabled: true,
//     },
// };
