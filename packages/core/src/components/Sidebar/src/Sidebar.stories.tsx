import { ArgTypes } from '@storybook/react';
import { Sidebar } from '.';
import { Fragment, useState } from 'react';
import { times } from '@optimacros-ui/utils';
import { Icon } from '@optimacros-ui/icon';

const argTypes: Partial<ArgTypes> = {
    open: {
        description: 'Whether the collapsible is open',
        control: 'boolean',
    },
    disabled: {
        description: 'Whether the collapsible is disabled',
        control: 'boolean',
    },
    position: {
        description: 'Sidebar position',
        control: false,
        table: { type: { summary: 'left | right' }, defaultValue: { summary: 'right' } },
    },
    width: {
        description: 'Panel width',
        control: 'number',
        table: { defaultValue: { summary: '300' } },
    },
};

const meta = {
    title: 'UI Kit core/Sidebar',
    argTypes,
};

export default meta;

export const Basic = () => {
    return (
        <Sidebar.Root>
            {(api) => (
                <>
                    <button onClick={() => api.setOpen(!api.open)}>open\close</button>
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: 400,
                            backgroundColor: 'aliceblue',
                            marginTop: 20,
                        }}
                    >
                        <Sidebar.Panel>
                            <Sidebar.Header>
                                <Sidebar.CloseTrigger>
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

                        <Sidebar.MiniPanel>
                            <Sidebar.Trigger>
                                <Icon value="keyboard-double-arrow-left" />
                            </Sidebar.Trigger>
                        </Sidebar.MiniPanel>
                    </div>
                </>
            )}
        </Sidebar.Root>
    );
};

export const PositionLeft = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button onClick={() => setOpen(!open)}>open\close</button>

            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: 400,
                    backgroundColor: 'aliceblue',
                    marginTop: 20,
                }}
            >
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
        </>
    );
};

export const Disabled = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button onClick={() => setOpen(!open)}>open\close</button>

            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: 400,
                    backgroundColor: 'aliceblue',
                    marginTop: 20,
                }}
            >
                <Sidebar.Root open={open} disabled>
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
        </>
    );
};

export const FullWidth = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button onClick={() => setOpen(!open)}>open\close</button>

            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: 400,
                    backgroundColor: 'aliceblue',
                    marginTop: 20,
                }}
            >
                <Sidebar.Root open={open} width={'100%'}>
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
        </>
    );
};
