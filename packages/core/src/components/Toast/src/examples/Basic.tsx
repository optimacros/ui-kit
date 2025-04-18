import { useMemo, useState } from 'react';
import { Toast } from '..';
import { Flex } from '@optimacros-ui/flex';
import { Button } from '@optimacros-ui/button';
import { IconButton } from '@optimacros-ui/icon-button';
import { createStore } from '../state';

const types = ['info', 'error', 'success', 'loading', 'custom'];

export const Basic = (props) => {
    const [type, setType] = useState('info');

    const store = useMemo(() => createStore(props), []);

    const create = () => {
        store.create({
            duration: 999999,
            title: 'lorem',
            description:
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi id explicabo deleniti soluta est',
        });
    };
    return (
        <>
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

                <Button variant="accent" data-testid="create-trigger" onClick={create}>
                    create toast
                </Button>

                <Button
                    data-testid="remove-trigger"
                    variant="accent"
                    onClick={() => {
                        // @ts-ignore
                        store.remove();
                    }}
                >
                    remove all
                </Button>
            </Flex>
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
