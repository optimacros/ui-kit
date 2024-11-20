import { ComponentProps } from 'react';
import { Tooltip } from '.';
import { Button } from '../ButtonV2';
import { Meta } from '@storybook/react';

export default {
    title: 'UI Kit core/Tooltip_V2',
    component: Tooltip.Root,
    tags: ['autodocs'],
} as Meta;

const Base = (props: ComponentProps<typeof Tooltip.Root>) => {
    return (
        <div
            style={{
                height: '20rem',
                width: '40rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Tooltip.Root {...props}>
                <Tooltip.Trigger asChild>
                    <Button variant="bordered">hover over me</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>here we are</Tooltip.Content>
            </Tooltip.Root>
        </div>
    );
};

export const Left = Base.bind({});
Left.args = {
    open: true,
    positioning: {
        placement: 'left',
    },
};

export const Right = Base.bind({});
Right.args = {
    open: true,
    positioning: {
        placement: 'right',
    },
};

export const Top = Base.bind({});
Top.args = {
    open: true,
    positioning: {
        placement: 'top',
    },
};

export const Bottom = Base.bind({});
Bottom.args = {
    open: true,
    positioning: {
        placement: 'bottom',
    },
};
