import { useEffect, useMemo } from 'react';
import { Toast } from '..';
import { Flex } from '@optimacros-ui/flex';
import { IconButton } from '@optimacros-ui/icon-button';
import { createStore } from '../state';
import { Button } from '@optimacros-ui/button';

const types = ['info', 'error', 'success', 'loading', 'custom'];

export const Types = (props) => {
    const store = useMemo(() => createStore(props), []);

    const create = () => {
        types.forEach((t) =>
            store.create({
                duration: 999999,
                title: t,
                description:
                    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi id explicabo deleniti soluta est',
                type: t,
            }),
        );
    };

    useEffect(() => {
        if (window.location.href.includes('--docs')) {
            return;
        }

        setTimeout(() => {
            create();
        }, 1);
    }, []);

    return (
        <>
            <Button onClick={create}>Show</Button>
            <Flex direction="column" gap={5}>
                <Toast.GroupProvider store={store}>
                    <Toast.Group>
                        {({ toast, index, parent }) => (
                            <Toast.Root {...toast} index={index} parent={parent}>
                                <Toast.Content>
                                    <Toast.Title />
                                    <Toast.Description />
                                </Toast.Content>
                                <Toast.CloseTrigger asChild>
                                    <IconButton icon="close" variant="accent" />
                                </Toast.CloseTrigger>
                            </Toast.Root>
                        )}
                    </Toast.Group>
                </Toast.GroupProvider>
            </Flex>
        </>
    );
};
