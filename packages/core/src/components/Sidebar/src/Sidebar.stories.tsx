import { ArgTypes, StoryObj, Meta } from '@storybook/react';
import { Sidebar } from '.';
import { Fragment } from 'react';
import { sleep, times } from '@optimacros-ui/utils';
import { Icon } from '@optimacros-ui/icon';
import { userEvent, waitFor, expect, within } from '@storybook/test';

const argTypes: Partial<ArgTypes> = {
    open: {
        description: 'Whether the collapsible is open when component is loaded',
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
        control: 'object',
        table: { type: { summary: 'number | string' }, defaultValue: { summary: '300' } },
    },
};

const meta: Meta<typeof Sidebar.Root> = {
    title: 'UI Kit core/Sidebar',
    component: Sidebar.Root,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Sidebar.Root>;

export const Basic: Story = {
    args: {},
    play: async ({ globals, canvasElement }) => {
        if (!globals.test) {
            return;
        }

        await window.waitForPageTrulyReady?.();
        await window.takeScreenshot?.();

        const canvas = within(canvasElement);

        await waitFor(async () => {
            const trigger = canvas.getByTestId('open-trigger');

            expect(trigger).toBeInTheDocument();

            await userEvent.click(trigger);
        });

        await waitFor(() => {
            const sidebar = canvasElement.querySelector(
                'div[data-scope="collapsible"][data-part="root"][data-tag="sidebar"]',
            );

            expect(sidebar).toHaveAttribute('data-state', 'open');
        });

        await sleep(1000);

        await window.takeScreenshot?.('open');
    },
    render: (props) => (
        <Sidebar.Root {...props}>
            <Sidebar.Trigger>open\close</Sidebar.Trigger>
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
                    <Sidebar.Trigger data-testid="open-trigger">
                        <Icon value="keyboard-double-arrow-left" />
                    </Sidebar.Trigger>
                </Sidebar.MiniPanel>
            </div>
        </Sidebar.Root>
    ),
};

export const PositionLeft = {
    args: {
        open: true,
        position: 'left',
    },
    render: (props) => (
        <Sidebar.Root {...props}>
            <Sidebar.Trigger>open\close</Sidebar.Trigger>
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
                    <Sidebar.Trigger data-testid="open-trigger">
                        <Icon value="keyboard-double-arrow-left" />
                    </Sidebar.Trigger>
                </Sidebar.MiniPanel>
            </div>
        </Sidebar.Root>
    ),
};

export const Disabled = {
    args: {
        disabled: true,
    },
    render: (props) => (
        <Sidebar.Root {...props}>
            {(api) => (
                <>
                    <button disabled onClick={() => api.setOpen(!api.open)}>
                        open\close
                    </button>

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
    ),
};

export const FullWidth = {
    args: {
        open: true,
        width: '100%',
    },
    render: (props) => (
        <Sidebar.Root {...props}>
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
                            <Sidebar.Trigger data-testid="open-trigger">
                                <Icon value="keyboard-double-arrow-left" />
                            </Sidebar.Trigger>
                        </Sidebar.MiniPanel>
                    </div>
                </>
            )}
        </Sidebar.Root>
    ),
};
