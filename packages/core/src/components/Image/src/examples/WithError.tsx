import { Image } from '../';

export const WithError = () => (
    <Image.Root ratio="square">
        <Image.Image src="invalid-url.jpg" alt="Invalid image" />
        <Image.Fallback>! Failed to load image</Image.Fallback>
    </Image.Root>
);
