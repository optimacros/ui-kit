import { Flex } from '@optimacros-ui/flex';
import { Tooltip } from '..';
import { Basic } from './Basic';

const placements: Tooltip.RootProps['positioning']['placement'][] = [
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

export const Placement = (props: Tooltip.RootProps) => {
    return (
        <Flex direction="row" wrap="wrap" style={{ width: '100%' }}>
            {placements.map((p) => (
                <Flex
                    key={p}
                    style={{ flexBasis: '33%', height: 170 }}
                    align="center"
                    justify="center"
                >
                    <Basic {...props} positioning={{ placement: p }} />
                </Flex>
            ))}
        </Flex>
    );
};
