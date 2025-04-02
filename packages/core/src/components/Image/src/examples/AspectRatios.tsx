import { Image } from '../';
import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';

const ratios: Image.ImageRatio[] = [
    'square',
    'portrait',
    'landscape',
    'wide',
    'ultrawide',
    'golden',
];

export const AspectRatios = () => (
    <div
        style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(4, 1fr)',
        }}
    >
        {ratios.map((ratio) => (
            <Flex key={ratio} direction="column" gap={4}>
                <Text.Span>{ratio}</Text.Span>
                <Image.Root ratio={ratio}>
                    <Image.Image src="/public/image-500x550.jpg" data-testid="image" />
                    <Image.Fallback>Loading...</Image.Fallback>
                </Image.Root>
            </Flex>
        ))}

        <Flex key="custom" direction="column" gap={4}>
            <Text.Span>custom (0.7)</Text.Span>
            <Image.Root ratio={0.7}>
                <Image.Image src="/public/image-500x550.jpg" data-testid="image" />
                <Image.Fallback>Loading...</Image.Fallback>
            </Image.Root>
        </Flex>
    </div>
);
