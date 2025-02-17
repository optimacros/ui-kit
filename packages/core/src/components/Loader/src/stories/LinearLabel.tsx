import { Loader } from '..';
import { Flex } from '@optimacros-ui/flex';

export const LinearLabel = () => {
    const counter = Loader.useProxySelector((state) => state.value);

    return (
        <Flex direction="column" gap={4} align="center" style={{ width: '100%' }}>
            <Flex gap={2}>
                <Loader.StartTrigger data-testid="start-trigger">start</Loader.StartTrigger>
                <Loader.CancelTrigger data-testid="cancel-trigger">stop</Loader.CancelTrigger>
            </Flex>

            <Loader.Label>Loading {counter}/100</Loader.Label>

            <Loader.LinearTrack data-testid="track">
                <Loader.LinearRange data-testid="range" />
            </Loader.LinearTrack>
        </Flex>
    );
};
