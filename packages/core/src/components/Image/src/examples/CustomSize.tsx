import { Image } from '../';

export const CustomSize = () => (
    <Image.Root style={{ width: '300px', height: '200px' }} ratio="square">
        <Image.Image
            src="https://picsum.photos/id/1018/800/600"
            alt="Mountain landscape"
            style={{ objectFit: 'cover' }}
        />
        <Image.Fallback>Loading...</Image.Fallback>
    </Image.Root>
);
