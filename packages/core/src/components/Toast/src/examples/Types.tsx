import { ComponentProps, useEffect } from 'react';
import { Toast, ToastGroup } from '..';
import { Flex } from '@optimacros-ui/flex';
import { IconButton } from '@optimacros-ui/icon-button';

const types = ['info', 'error', 'success', 'loading', 'custom'];

const Example = () => {
    const api = ToastGroup.useApi();

    useEffect(() => {
        types.forEach((t) =>
            api.create({
                duration: 999999,
                title: t,
                description:
                    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi id explicabo deleniti soluta est',
                type: t,
                placement: 'top-start',
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

export const Types = (props: ComponentProps<typeof ToastGroup.RootProvider>) => (
    <ToastGroup.RootProvider {...props}>
        <Example />
    </ToastGroup.RootProvider>
);
