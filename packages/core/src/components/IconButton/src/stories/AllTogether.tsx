import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';
import { IconButton } from '../IconButton';

export const AllTogether = () => (
    <Flex gap="4" direction="column">
        <Flex gap="4" direction="column">
            <Text.Title as="h5">Variants</Text.Title>

            <Flex align="center" gap="4">
                <Flex align="center" gap="1" direction="column">
                    <Text.Span>primary</Text.Span>
                    <IconButton variant="primary" icon="bookmark" />
                </Flex>
                <Flex align="center" gap="1" direction="column">
                    <Text.Span>accent</Text.Span>
                    <IconButton variant="accent" icon="bookmark" />
                </Flex>
                <Flex align="center" gap="1" direction="column">
                    <Text.Span>bordered</Text.Span>
                    <IconButton variant="bordered" icon="bookmark" />
                </Flex>
                <Flex align="center" gap="1" direction="column">
                    <Text.Span>neutral</Text.Span>
                    <IconButton variant="neutral" icon="bookmark" />
                </Flex>
                <Flex align="center" gap="1" direction="column">
                    <Text.Span>transparent</Text.Span>
                    <IconButton variant="transparent" icon="bookmark" />
                </Flex>
            </Flex>
        </Flex>

        <Flex gap="4" direction="column">
            <Text.Title as="h5">Float</Text.Title>

            <Flex align="center" gap="4">
                <IconButton float="raised" icon="bookmark" />
                <IconButton float="floating" icon="bookmark" />
                <IconButton float="flat" icon="bookmark" />
            </Flex>
        </Flex>

        <Flex gap="4" direction="column">
            <Text.Title as="h5">Status</Text.Title>

            <Flex align="center" gap="4">
                <IconButton status="success" icon="bookmark" />
                <IconButton status="warning" icon="bookmark" />
                <IconButton status="error" icon="bookmark" />
            </Flex>
        </Flex>

        <Flex gap="4" direction="column">
            <Text.Title as="h5">Size</Text.Title>

            <Flex align="center" gap="4">
                <IconButton size="xs" icon="bookmark" />
                <IconButton size="sm" icon="bookmark" />
                <IconButton size="md" icon="bookmark" />
            </Flex>
        </Flex>

        <Flex gap="4" direction="column">
            <Text.Title as="h5">Squared</Text.Title>

            <Flex align="center" gap="4">
                <IconButton squared variant="primary" icon="bookmark" />
                <IconButton squared variant="accent" icon="bookmark" />
                <IconButton squared variant="bordered" icon="bookmark" />
                <IconButton squared variant="neutral" icon="bookmark" />
                <IconButton squared variant="transparent" icon="bookmark" />
            </Flex>
        </Flex>

        <Flex gap="4" direction="column">
            <Text.Title as="h5">Disabled</Text.Title>

            <Flex align="center" gap="4">
                <IconButton disabled variant="primary" icon="bookmark" />
                <IconButton disabled variant="accent" icon="bookmark" />
                <IconButton disabled variant="bordered" icon="bookmark" />
                <IconButton disabled variant="neutral" icon="bookmark" />
                <IconButton disabled variant="transparent" icon="bookmark" />
            </Flex>
        </Flex>

        <Flex gap="4" direction="column">
            <Text.Title as="h5">Inverse</Text.Title>

            <Flex align="center" gap="4">
                <IconButton inverse variant="primary" icon="bookmark" />
                <IconButton inverse variant="accent" icon="bookmark" />
                <IconButton inverse variant="bordered" icon="bookmark" />
                <IconButton inverse variant="neutral" icon="bookmark" />
                <IconButton inverse variant="transparent" icon="bookmark" />
            </Flex>
        </Flex>
    </Flex>
);
