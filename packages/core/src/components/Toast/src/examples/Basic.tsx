import { ComponentProps, useState } from 'react';
import { Toast, ToastGroup } from '..';
import { Placement } from '@zag-js/toast';
import { Flex } from '@optimacros-ui/flex';
import { Button } from '@optimacros-ui/button';
import { IconButton } from '@optimacros-ui/icon-button';

const types = ['info', 'error', 'success', 'loading', 'custom'];
const placements = [
    'top-start',
    'top',
    'top-end',
    'bottom-start',
    'bottom',
    'bottom-end',
] as Placement[];

const Example = () => {
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
                        setPlacement(e.target.value as Placement);
                    }}
                >
                    {placements.map((t) => (
                        <option key={t}>{t}</option>
                    ))}
                </select>
            </Flex>

            <Button
                variant="accent"
                data-testid="create-trigger"
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
                data-testid="remove-trigger"
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

export const Basic = (props: ComponentProps<typeof ToastGroup.RootProvider>) => (
    <ToastGroup.RootProvider {...props}>
        <Example />
    </ToastGroup.RootProvider>
);
