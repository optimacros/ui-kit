import { ComponentProps } from 'react';
import { Image } from '../';

export const Basic = (props: ComponentProps<typeof Image.Root>) => (
    <Image.Root {...props}>
        <Image.Image src="https://picsum.photos/800/600" alt="Random landscape" />
        <Image.Fallback>Loading...</Image.Fallback>
    </Image.Root>
);
