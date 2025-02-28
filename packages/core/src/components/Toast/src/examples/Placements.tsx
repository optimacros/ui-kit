import { ComponentProps, useEffect } from 'react';
import { Toast, ToastGroup } from '..';
import { Placement } from '@zag-js/toast';
import { Flex } from '@optimacros-ui/flex';
import { IconButton } from '@optimacros-ui/icon-button';

const placements = [
    'top-start',
    'top',
    'top-end',
    'bottom-start',
    'bottom',
    'bottom-end',
] as Placement[];

const Example = () => {
    const api = ToastGroup.useApi();

    useEffect(() => {
        placements.forEach((p) =>
            api.create({
                duration: 999999,
                title: p,
                description:
                    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi id explicabo deleniti soluta est',
                type: 'info',
                placement: p,
            }),
        );
    }, []);

    return (
        <Flex direction="column" gap={5}>
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

export const Placements = (props: ComponentProps<typeof ToastGroup.RootProvider>) => (
    <ToastGroup.RootProvider {...props}>
        <Example />
    </ToastGroup.RootProvider>
);
