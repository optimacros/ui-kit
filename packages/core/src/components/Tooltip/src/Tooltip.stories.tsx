import { Tooltip } from '@optimacros-ui/tooltip';
import { Button } from '@optimacros-ui/button';
import { Flex } from '@optimacros-ui/flex';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const argTypes: Partial<ArgTypes> = {
    positioning: {
        control: 'object',
        description: 'The user provided options used to position the popover content',
        table: { type: { summary: 'PositioningOptions' } },
    },
    openDelay: {
        control: 'number',
        description: `The open delay of the tooltip.`,
        table: { defaultValue: { summary: '1000' } },
    },
    closeDelay: {
        control: 'number',
        description: `The close delay of the tooltip.`,
        table: { defaultValue: { summary: '500' } },
    },
    interactive: {
        control: 'boolean',
        description: `Whether the tooltip's content is interactive. In this mode, the tooltip will remain open when user hovers over the content.`,
    },
    disabled: {
        control: 'boolean',
        description: `Whether the tooltip is disabled`,
    },
    open: {
        control: 'boolean',
        description: `Whether the tooltip is open`,
    },
    'open.controlled': {
        control: 'boolean',
        description: `Whether the tooltip is controlled by the user`,
    },
    onOpenChange: {
        control: 'number',
        description: `Function called when the tooltip is opened..`,
        table: { type: { summary: '(details: OpenChangeDetails) => void' } },
    },
};

const meta: Meta<typeof Tooltip.Root> = {
    argTypes,
    title: 'UI Kit core/Tooltip',
    component: Tooltip.Root,
};

export default meta;

export const Base: StoryObj<typeof Tooltip.Root> = {
    render: (props: Tooltip.Props) => {
        return (
            <Flex
                justify="center"
                align="center"
                style={{
                    height: '20rem',
                    width: '40rem',
                }}
            >
                <Tooltip.Root {...props}>
                    <Tooltip.Trigger asChild>
                        <Button variant="bordered">hover over me</Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>here we are</Tooltip.Content>
                </Tooltip.Root>
            </Flex>
        );
    },
};

export const Positioning: StoryObj<typeof Tooltip.Root> = {
    ...Base,
    args: {
        open: true,
        positioning: {
            placement: 'left',
        },
    },
};

export const NoDelay: StoryObj<typeof Tooltip.Root> = {
    ...Base,
    args: {
        openDelay: 0,
        closeDelay: 0,
    },
};

export const Disabled: StoryObj<typeof Tooltip.Root> = {
    ...Base,
    args: {
        disabled: true,
    },
};

export const Interactive: StoryObj<typeof Tooltip.Root> = {
    args: { interactive: true },
    render: (props: Tooltip.Props) => {
        return (
            <Flex
                justify="center"
                align="center"
                style={{
                    height: '20rem',
                    width: '40rem',
                }}
            >
                <Tooltip.Root {...props}>
                    <Tooltip.Trigger asChild>
                        <Button variant="bordered">hover over me</Button>
                    </Tooltip.Trigger>

                    <Tooltip.Content>
                        <Flex
                            justify="center"
                            align="center"
                            style={{
                                height: 100,
                                width: 200,
                                background: 'lightGray',
                            }}
                        >
                            <Button variant="accent">here we are</Button>
                        </Flex>
                    </Tooltip.Content>
                </Tooltip.Root>
            </Flex>
        );
    },
};

export const Controlled: StoryObj<typeof Tooltip.Root> = {
    args: { interactive: true, 'open.controlled': true },
    render: (props: Tooltip.Props) => {
        return (
            <Flex
                justify="center"
                align="center"
                style={{
                    height: '20rem',
                    width: '40rem',
                }}
            >
                <Tooltip.Root {...props}>
                    <Tooltip.Api>
                        {(api) => (
                            <>
                                <Button variant="bordered" onClick={() => api.setOpen(true)}>
                                    click to open
                                </Button>

                                <Tooltip.Trigger asChild>
                                    <Button variant="bordered">
                                        do not click or hover over
                                        <br />
                                        this will break everything
                                    </Button>
                                </Tooltip.Trigger>

                                <Tooltip.Content>
                                    <Flex
                                        justify="center"
                                        align="center"
                                        style={{
                                            height: 100,
                                            width: 200,
                                            background: 'lightGray',
                                        }}
                                    >
                                        <Button variant="accent" onClick={() => api.setOpen(false)}>
                                            click to close
                                        </Button>
                                    </Flex>
                                </Tooltip.Content>
                            </>
                        )}
                    </Tooltip.Api>
                </Tooltip.Root>
            </Flex>
        );
    },
};
