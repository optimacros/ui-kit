import { Image } from '../';

const images = ['https://picsum.photos/id/1024/800/600', 'invalid-url.jpg'];

export const LoadingStates = () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
        {images.map((src, index) => (
            <Image.Root key={index} style={{ width: '200px', height: '150px' }} ratio="square">
                <Image.Image src={src} alt={`Image ${index + 1}`} />
                <Image.Fallback>{index === 1 ? '❌ Error' : '⌛ Loading...'}</Image.Fallback>
            </Image.Root>
        ))}
    </div>
);
