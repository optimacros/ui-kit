import { Image } from '../';
import { Flex } from '@optimacros-ui/flex';

export const CustomFallback = () => (
    <Image.Root ratio={50}>
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
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                }}
            >
                <span style={{ fontSize: '2rem' }}>🖼</span>
                <span>Image unavailable</span>
            </Flex>
        </Image.Fallback>
    </Image.Root>
);
