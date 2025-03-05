import { Image } from '@optimacros-ui/image';
import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';
import { Root, Content, Positioner, Trigger, Arrow } from '../parts';
import { Api } from '../state';

export const Basic = (props) => {
    return (
        <Root {...props}>
            <Trigger asChild>
                <a href="#" target="_blank" rel="noreferrer noopener">
                    <Image.Root ratio="landscape">
                        <Image.Image
                            src="https://lh5.googleusercontent.com/p/AF1QipMg8YQx3pDUNFyl6PDl6Nl_xuG_JJzPCTWDKWOz=w1200-h642-p-k-no"
                            alt="Random landscape"
                        />
                        <Image.Fallback>Loading image...</Image.Fallback>
                    </Image.Root>
                </a>
            </Trigger>
            <Api>
                {({ open }) => (
                    <>
                        {open && (
                            <Positioner>
                                <Content
                                    style={{
                                        boxShadow: '1px 1px 20px 1px gray',
                                        background: 'var(--color-theme-gray-50)',
                                        //@ts-ignore
                                        '--arrow-background': 'var(--color-theme-gray-50)',
                                        '--arrow-size': '16px',
                                    }}
                                >
                                    <Arrow />
                                    <Flex
                                        direction="column"
                                        gap={4}
                                        style={{
                                            padding: 'var(--spacing-2)',
                                        }}
                                    >
                                        <Text.Paragraph>
                                            <Text.Title as="h3">Zag js</Text.Title>
                                            <Text.Paragraph> @zag_js</Text.Paragraph>
                                        </Text.Paragraph>
                                        <Text.Paragraph>
                                            <Text.Paragraph>
                                                UI components powered by Finite State Machines.
                                            </Text.Paragraph>
                                        </Text.Paragraph>
                                        <Flex align="between" gap={2}>
                                            <Flex gap={2}>
                                                <Text.Paragraph>2</Text.Paragraph>
                                                <Text.Paragraph>Following</Text.Paragraph>
                                            </Flex>
                                            <Flex gap={2}>
                                                <Text.Paragraph>4,000</Text.Paragraph>
                                                <Text.Paragraph>Followers</Text.Paragraph>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Content>
                            </Positioner>
                        )}
                    </>
                )}
            </Api>
        </Root>
    );
};
