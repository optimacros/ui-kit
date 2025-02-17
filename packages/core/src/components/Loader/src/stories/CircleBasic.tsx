import { Loader } from '..';
import { Flex } from '@optimacros-ui/flex';

export const CircleBasic = () => {
    return (
        <Flex direction="column" gap={4} style={{ width: '100%' }}>
            <Flex gap={2}>
                <Loader.StartTrigger data-testid="start-trigger">start</Loader.StartTrigger>
                <Loader.CancelTrigger data-testid="cancel-trigger">stop</Loader.CancelTrigger>
            </Flex>

            <Loader.Circle data-testid="circle">
                <Loader.CircleTrack data-testid="track" />
                <Loader.CircleRange data-testid="range" />
            </Loader.Circle>
        </Flex>
    );
};
