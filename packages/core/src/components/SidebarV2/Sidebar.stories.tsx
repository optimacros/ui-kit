import { ArgTypes } from '@storybook/react';
import { Sidebar } from './';
import { Fragment, useState } from 'react';
import { times } from '@optimacros/ui-kit-utils';
import { Icon } from '../Icon';

const argTypes: Partial<ArgTypes> = {
    children: {
        description: 'Content of sidebar',
        control: 'object',
    },
    className: { table: { disable: true } },
};

const meta = {
    title: 'UI Kit core/SidebarV2',
    argTypes,
};

export default meta;

export const Basic = () => {
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: 400,
                backgroundColor: 'aliceblue',
            }}
        >
            <button onClick={() => setOpen(!open)}>open\close</button>

            <Sidebar.Root open={open}>
                <Sidebar.Panel>
                    <Sidebar.Header>
                        <Sidebar.CloseTrigger onClick={() => setOpen(false)}>
                            <Icon value="keyboard-double-arrow-right" />
                        </Sidebar.CloseTrigger>
                    </Sidebar.Header>

                    <Sidebar.Content>
                        <div>
                            {times(100, (n) => (
                                <Fragment key={n}>
                                    line
                                    <br />
                                </Fragment>
                            ))}
                        </div>
                    </Sidebar.Content>
                </Sidebar.Panel>

                <Sidebar.MiniPanel onClick={() => setOpen(true)}>
                    <Sidebar.Trigger>
                        <Icon value="keyboard-double-arrow-left" />
                    </Sidebar.Trigger>
                </Sidebar.MiniPanel>
            </Sidebar.Root>
        </div>
    );
};

export const PositionLeft = () => {
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: 400,
                backgroundColor: 'aliceblue',
            }}
        >
            <button onClick={() => setOpen(!open)}>open\close</button>

            <Sidebar.Root position="left" open={open}>
                <Sidebar.Panel>
                    <Sidebar.Header>
                        <Sidebar.CloseTrigger onClick={() => setOpen(false)}>
                            <Icon value="keyboard-double-arrow-right" />
                        </Sidebar.CloseTrigger>
                    </Sidebar.Header>

                    <Sidebar.Content>
                        <div>
                            {times(100, (n) => (
                                <Fragment key={n}>
                                    line
                                    <br />
                                </Fragment>
                            ))}
                        </div>
                    </Sidebar.Content>
                </Sidebar.Panel>

                <Sidebar.MiniPanel onClick={() => setOpen(true)}>
                    <Sidebar.Trigger>
                        <Icon value="keyboard-double-arrow-left" />
                    </Sidebar.Trigger>
                </Sidebar.MiniPanel>
            </Sidebar.Root>
        </div>
    );
};
