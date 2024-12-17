import { Toast, ToastGroup } from '.';
import { IconButton } from '@optimacros-ui/icon-button';
import { Placement } from '@zag-js/toast';
import { useState } from 'react';
import { Flex } from '@optimacros-ui/flex';
import { Button } from '@optimacros-ui/button';
import { ArgTypes, Meta } from '@storybook/react';
import {
    Title,
    Subtitle,
    Description,
    Primary,
    ArgTypes as ArgTypesComponent,
} from '@storybook/blocks';

const argTypes: Partial<ArgTypes> = {
    create: {
        control: false,
        description: 'Function to create a toast. Returns toast id.',
        table: { type: { summary: '(options: Options<O>) => string' } },
    },
    update: {
        control: false,
        description: `Function to update a toast's options by id.`,
        table: { type: { summary: '(id: string, options: Options<O>) => void' } },
    },
    remove: {
        control: false,
        description: `Function to remove a toast by id. If no id is provided, all toasts will be removed.`,
        table: { type: { summary: '(id?: string) => void' } },
    },
};

const meta: Meta<typeof ToastGroup.RootProvider> = {
    title: 'UI Kit core/Toast',
    component: ToastGroup.RootProvider,
    argTypes,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Primary />
                    <Subtitle>Api reference</Subtitle>
                    <ArgTypesComponent of={meta} />
                </>
            ),
        },
    },

    decorators: [
        (Story) => (
            <ToastGroup.RootProvider>
                <Story />
            </ToastGroup.RootProvider>
        ),
    ],
};

export default meta;

const types = ['info', 'error', 'success', 'loading', 'custom'];
const placements = [
    'top-start',
    'top',
    'top-end',
    'bottom-start',
    'bottom',
    'bottom-end',
] as Placement[];

export const Base = () => {
    const [placement, setPlacement] = useState<Placement>('top-end');
    const [type, setType] = useState('info');

    const api = ToastGroup.useApi();

    return (
        <Flex direction="column" gap={5}>
            <Flex direction="row" gap={2}>
                <span>type: </span>
                <select
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                >
                    {types.map((t) => (
                        <option key={t}>{t}</option>
                    ))}
                </select>
            </Flex>

            <Flex direction="row" gap={2}>
                <span>placement: </span>
                <select
                    value={placement}
                    onChange={(e) => {
                        setPlacement(e.target.value);
                    }}
                >
                    {placements.map((t) => (
                        <option key={t}>{t}</option>
                    ))}
                </select>
            </Flex>

            <Button
                variant="accent"
                onClick={() => {
                    api.create({
                        duration: 5000,
                        title: 'Title',
                        description:
                            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi id explicabo deleniti soluta est',
                        type,
                        placement,
                    });
                }}
            >
                create toast
            </Button>

            <Button
                variant="accent"
                onClick={() => {
                    api.remove();
                }}
            >
                remove all
            </Button>

            <ToastGroup.Portal>
                {(toast) => (
                    <Toast.Root actor={toast}>
                        <Toast.Content>
                            {toast.id}
                            <Toast.Title />
                            <Toast.Description />
                        </Toast.Content>
                        <Toast.CloseTrigger asChild>
                            <IconButton icon="close" variant="accent" />
                        </Toast.CloseTrigger>
                    </Toast.Root>
                )}
            </ToastGroup.Portal>
        </Flex>
    );
};
