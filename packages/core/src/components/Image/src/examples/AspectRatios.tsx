import { CSSProperties } from 'react';
import { Image } from '../';

const SquareImage = () => (
    <Image.Root ratio="square">
        <Image.Image src="https://picsum.photos/id/1015/800/800" alt="Square image" />
        <Image.Fallback>Loading...</Image.Fallback>
    </Image.Root>
);

// Portrait aspect ratio
const PortraitImage = () => (
    <Image.Root ratio="portrait">
        <Image.Image src="https://picsum.photos/id/1016/800/1200" alt="Portrait image" />
        <Image.Fallback>Loading...</Image.Fallback>
    </Image.Root>
);

// Landscape aspect ratio
const LandscapeImage = () => (
    <Image.Root ratio="landscape">
        <Image.Image src="https://picsum.photos/id/1018/1200/900" alt="Landscape image" />
        <Image.Fallback>Loading...</Image.Fallback>
    </Image.Root>
);

// Custom aspect ratio
const CustomRatioImage = () => (
    <Image.Root ratio="custom" style={{ '--aspect-ratio': '70%' } as CSSProperties}>
        <Image.Image src="https://picsum.photos/id/1019/1000/700" alt="Custom ratio image" />
        <Image.Fallback>Loading...</Image.Fallback>
    </Image.Root>
);

export const AspectRatios = () => (
    <div
        style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(4, 1fr)',
        }}
    >
        <SquareImage />
        <PortraitImage />
        <LandscapeImage />
        <CustomRatioImage />
    </div>
);
