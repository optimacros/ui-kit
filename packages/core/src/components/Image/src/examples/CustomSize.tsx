import { Image } from '../';

export const CustomSize = () => (
    <Image.Root style={{ width: '300px' }} ratio={123}>
        <Image.Image
            src="https://picsum.photos/id/1018/800/600"
            alt="Mountain landscape"
            style={{ objectFit: 'cover' }}
        />
        <Image.Fallback>Loading...</Image.Fallback>
    </Image.Root>
);
