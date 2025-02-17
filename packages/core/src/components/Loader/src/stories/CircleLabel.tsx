import { Loader } from '..';
import { Flex } from '@optimacros-ui/flex';

export const CircleLabel = () => {
    const counter = Loader.useProxySelector((state) => state.value);

    return (
        <Flex direction="column" gap={4} style={{ width: '100%' }}>
            <Flex gap={2}>
                <Loader.StartTrigger data-testid="start-trigger">start</Loader.StartTrigger>
                <Loader.CancelTrigger data-testid="cancel-trigger">stop</Loader.CancelTrigger>
            </Flex>

            <Loader.Label>Loading {counter}/100</Loader.Label>

            <Loader.Circle data-testid="circle">
                <Loader.CircleTrack data-testid="track" />
                <Loader.CircleRange data-testid="range" />
            </Loader.Circle>
        </Flex>
    );
};
