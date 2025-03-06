import { useEffect, useMemo } from 'react';
import { Toast } from '..';
import { Placement } from '@zag-js/toast';
import { Flex } from '@optimacros-ui/flex';
import { IconButton } from '@optimacros-ui/icon-button';
import { createStore } from '../state';
import { Button } from '@optimacros-ui/button';

const placements = [
    'top-start',
    'top',
    'top-end',
    'bottom-start',
    'bottom',
    'bottom-end',
] as Placement[];

export const Placements = (props) => {
    const stores = useMemo(
        () => placements.map((placement) => createStore({ ...props, placement })),
        [],
    );
    const create = () => {
        stores.forEach((store) => {
            store.create({
                duration: 999999,
                title: 'lorem',
                description:
                    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi id explicabo deleniti soluta est',
                type: 'info',
            });
        });
    };

    useEffect(() => {
        setTimeout(() => {
            create();
        }, 1);
    }, []);

    return (
        <>
            <Button onClick={create}>Show</Button>
            <Flex direction="column" gap={5}>
                {stores.map((store) => (
                    <Toast.GroupProvider store={store}>
                        <Toast.Group>
                            {({ toast, index, parent }) => (
                                <Toast.Root
                                    {...toast}
                                    index={index}
                                    parent={parent}
                                    style={{ maxWidth: '220px' }}
                                >
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
                ))}
            </Flex>
        </>
    );
};
