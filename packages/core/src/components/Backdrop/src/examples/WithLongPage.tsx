import { useState } from 'react';
import { Flex } from '@optimacros-ui/flex';
import { Loader } from '@optimacros-ui/loader';
import { Text } from '@optimacros-ui/text';
import { Chip } from '@optimacros-ui/chip';
import { Image } from '@optimacros-ui/image';
import { Button } from '@optimacros-ui/button';
import { Icon } from '@optimacros-ui/icon';
import { Root } from '../parts';

const text =
    'The Backdrop signals a state change within the application and can be used for creating loaders, dialogs, and more. In its simplest form, the Backdrop component will add a dimmed layer over your application.';

export const WithLongPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLoading = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 4000);
    };

    return (
        <Flex direction="column" gap={6}>
            <Text.Title> Backdrop </Text.Title>
            <Text.Paragraph>
                The Backdrop component narrows the user's focus to a particular element on the
                screen.
            </Text.Paragraph>
            <Image.Root style={{ width: '200px', height: '200px' }} ratio="custom">
                <Image.Avatar
                    src="https://picsum.photos/id/1018/800/600"
                    alt="Mountain landscape"
                />
                <Image.Fallback>Loading...</Image.Fallback>
            </Image.Root>
            <Button variant="accent" onClick={handleLoading}>
                Show backdrop with loader
                <Icon value="keyboard-double-arrow-right"></Icon>
            </Button>
            {new Array(5).fill(0).map((_, i) => (
                <Text.Paragraph key={i}>{text}</Text.Paragraph>
            ))}
            <Flex gap={4}>
                <Chip.Root>
                    <Chip.Icon>
                        <Icon value="check" />
                    </Chip.Icon>
                    Source
                </Chip.Root>
                <Chip.Root>
                    <Chip.Icon>
                        <Icon value="download" />
                    </Chip.Icon>
                    Figma
                </Chip.Root>
                <Chip.Root>
                    <Chip.Icon>
                        <Icon value="person" />
                    </Chip.Icon>
                    Sketch
                </Chip.Root>
            </Flex>
            <Text.Title as="h2"> Example </Text.Title>
            <Image.Root style={{ width: '200px', height: '200px' }} ratio="custom">
                <Image.Avatar
                    src="https://picsum.photos/id/1018/800/600"
                    alt="Mountain landscape"
                />
                <Image.Fallback>Loading...</Image.Fallback>
            </Image.Root>
            <Text.Paragraph>
                The demo below shows a basic Backdrop with a Circular Progress component in the
                foreground to indicate a loading state. After clicking Show Backdrop, you can click
                anywhere on the page to close it.
            </Text.Paragraph>
            <Text.Paragraph>
                The demo below shows a basic Backdrop with a Circular Progress component in the
                foreground to indicate a loading state. After clicking Show Backdrop, you can click
                anywhere on the page to close it.
            </Text.Paragraph>

            {isLoading && (
                <Root>
                    <Loader.Root value={null}>
                        <Loader.Circle>
                            <Loader.CircleTrack />
                            <Loader.CircleRange />
                        </Loader.Circle>
                    </Loader.Root>
                </Root>
            )}
        </Flex>
    );
};
