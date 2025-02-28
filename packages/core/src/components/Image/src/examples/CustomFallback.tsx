import { Image } from '../';
import { Flex } from '@optimacros-ui/flex';

export const CustomFallback = () => (
    <Image.Root ratio="square">
        <Image.Image src="invalid-url.jpg" alt="Invalid image" />
        <Image.Fallback>
            <Flex
                style={{
                    padding: '2rem',
                    backgroundColor: '#f3f4f6',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '0.5rem',
                }}
            >
                <span style={{ fontSize: '2rem' }}>🖼</span>
                <span>Image unavailable</span>
            </Flex>
        </Image.Fallback>
    </Image.Root>
);
