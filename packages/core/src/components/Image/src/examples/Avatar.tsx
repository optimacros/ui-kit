import { Image } from '../';
import { Flex } from '@optimacros-ui/flex';

export const Avatar = () => (
    <Flex gap={3} align="start" justify="start">
        <Image.Root style={{ width: 100 }} ratio="square">
            <Image.Avatar src="https://picsum.photos/id/1018/800/600" alt="Mountain landscape" />
            <Image.Fallback>Loading...</Image.Fallback>
        </Image.Root>
        <Image.Root style={{ width: 100 }} ratio="square">
            <Image.Avatar src="https://picsum.photos/id/1018/800/600" alt="Mountain landscape" />
            <Image.Fallback>Loading...</Image.Fallback>
        </Image.Root>

        <Image.Root style={{ width: 100 }} ratio="square">
            <Image.Avatar src="https://picsum.photos/id/1018/800/600" alt="Mountain landscape" />
            <Image.Fallback>Loading...</Image.Fallback>
        </Image.Root>

        <Image.Root style={{ width: 100 }} ratio="square">
            <Image.Avatar src="https://picsum.photos/id/1018/800/600" alt="Mountain landscape" />
            <Image.Fallback>Loading...</Image.Fallback>
        </Image.Root>
    </Flex>
);
