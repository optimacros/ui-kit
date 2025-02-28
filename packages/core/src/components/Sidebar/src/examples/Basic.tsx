import { ComponentProps, Fragment } from 'react';
import { Sidebar } from '..';
import { Icon } from '@optimacros-ui/icon';
import { times } from '@optimacros-ui/utils';

export const Basic = (props: ComponentProps<typeof Sidebar.Root>) => (
    <Sidebar.Root {...props}>
        <Sidebar.Trigger data-testid="external-trigger">open\close</Sidebar.Trigger>
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: 400,
                backgroundColor: 'aliceblue',
                marginTop: 20,
            }}
        >
            <Sidebar.Panel data-testid="panel">
                <Sidebar.Header data-testid="header">
                    <Sidebar.CloseTrigger data-testid="close-trigger">
                        <Icon value="keyboard-double-arrow-right" />
                    </Sidebar.CloseTrigger>
                </Sidebar.Header>

                <Sidebar.Content data-testid="content">
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

            <Sidebar.MiniPanel data-testid="mini-panel">
                <Sidebar.Trigger data-testid="open-trigger">
                    <Icon value="keyboard-double-arrow-left" />
                </Sidebar.Trigger>
            </Sidebar.MiniPanel>
        </div>
    </Sidebar.Root>
);
