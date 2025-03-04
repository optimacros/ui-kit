import { Loader } from '..';
import { Flex } from '@optimacros-ui/flex';

export const CircleLabel = () => {
    const counter = Loader.useProxySelector((state) => state.api.value);
    const max = Loader.useProxySelector((state) => state.api.max);

    return (
        <Flex direction="column" gap={4} align="center" style={{ width: '100%' }}>
            <Flex gap={2}>
                <Loader.StartTrigger data-testid="start-trigger">start</Loader.StartTrigger>
                <Loader.CancelTrigger data-testid="cancel-trigger">stop</Loader.CancelTrigger>
            </Flex>

            <Loader.Label>
                Loading {counter}/{max}
            </Loader.Label>

            <Loader.Circle data-testid="circle">
                <Loader.CircleTrack data-testid="track" />
                <Loader.CircleRange data-testid="range" />
            </Loader.Circle>
        </Flex>
    );
};
