import { Flex } from '@optimacros-ui/flex';
import { Popover } from '..';
import { ComponentProps } from 'react';

const placements: ComponentProps<typeof Popover.Root>['positioning']['placement'][] = [
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-start',
    'bottom',
    'bottom-end',
    'left-start',
    'left',
    'left-end',
];

export const Placement = () => {
    return (
        <Flex direction="row" wrap="wrap" style={{ width: '100%' }}>
            {placements.map((p) => (
                <Flex
                    key={p}
                    style={{ flexBasis: '33%', height: 170 }}
                    align="center"
                    justify="center"
                >
                    <Popover.Root
                        positioning={{ placement: p }}
                        open
                        closeOnEscape={false}
                        closeOnInteractOutside={false}
                    >
                        <Popover.Trigger asChild data-testid="open-trigger">
                            <Flex style={{ width: 30, height: 30, background: '#000' }} />
                        </Popover.Trigger>

                        <Popover.Positioner>
                            <Popover.Content>
                                <Popover.Arrow />

                                <Flex
                                    gap={2}
                                    direction="column"
                                    style={{
                                        background: 'rgb(240 240 240)',
                                        padding: 10,
                                        borderRadius: 5,
                                    }}
                                >
                                    <Popover.Description>{p}</Popover.Description>
                                </Flex>
                            </Popover.Content>
                        </Popover.Positioner>
                    </Popover.Root>
                </Flex>
            ))}
        </Flex>
    );
};
