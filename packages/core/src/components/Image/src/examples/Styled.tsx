import { Image } from '../';

export const Styled = () => (
    <Image.Root
        ratio="square"
        style={{
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        }}
    >
        <Image.Image
            src="https://picsum.photos/id/1029/800/600"
            alt="Mountain lake"
            style={{ transition: 'transform 0.3s ease' }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
            }}
        />
        <Image.Fallback>Loading...</Image.Fallback>
    </Image.Root>
);
