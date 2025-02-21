import type { Meta, StoryObj, ArgTypes } from '@storybook/react';
import { Text } from '.';
import { Flex } from '@optimacros-ui/flex';
import { Field } from '@optimacros-ui/field';

const argTypes: ArgTypes<Text.TextProps> = {
    as: {
        control: 'select',
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'label', 'span'],
        description: 'Converts any component into component of other kind for no reason',
        table: { type: { summary: 'h1 | h2 | h3 | h4 | h5 | h6 | p | li | label | span' } },
    },
};

const meta: Meta = {
    title: 'Ui kit core/Text',
    argTypes,
    parameters: {
        layout: 'centered',
    },
};

export default meta;

export const Title: StoryObj<typeof Text.Title> = {
    render: (props) => (
        <Flex gap={2} direction="column">
            <Text.Title {...props} as="h1">
                Heading Level 1
            </Text.Title>
            <Text.Title {...props} as="h2">
                Heading Level 2
            </Text.Title>
            <Text.Title {...props} as="h3">
                Heading Level 3
            </Text.Title>
            <Text.Title {...props} as="h4">
                Heading Level 4
            </Text.Title>
            <Text.Title {...props} as="h5">
                Heading Level 5
            </Text.Title>
            <Text.Title {...props} as="h6">
                Heading Level 6
            </Text.Title>
        </Flex>
    ),
};

export const Span: StoryObj<typeof Text.Span> = {
    render: (props) => (
        <Flex gap={2} direction="column">
            <Text.Span {...props}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation
            </Text.Span>
        </Flex>
    ),
};

export const Paragraph: StoryObj<typeof Text.Paragraph> = {
    render: (props) => (
        <Flex gap={2} direction="column">
            <Text.Paragraph {...props}>
                This is a standard paragraph with regular text. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
            </Text.Paragraph>
            <Text.Paragraph {...props}>
                This paragraph is not rendered as a span element instead.
            </Text.Paragraph>
            <Text.Paragraph {...props}>
                This paragraph is not rendered as a list item element.
            </Text.Paragraph>
        </Flex>
    ),
};

export const Code: StoryObj<typeof Text.Code> = {
    render: (props) => (
        <Flex gap={2} direction="column">
            <Text.Code {...props}>const greeting = "Hello, World!";</Text.Code>
            <Text.Code {...props}>
                {`function example() {
  return "This is a code block";
}`}
            </Text.Code>
        </Flex>
    ),
};

export const Markdown: StoryObj<typeof Text.Markdown> = {
    render: (props) => (
        <Flex gap={2} direction="column">
            <Text.Markdown {...props}># Heading</Text.Markdown>
            <Text.Markdown {...props}>## Heading pomenshe</Text.Markdown>
            <Text.Markdown {...props}>### Heading oche maly</Text.Markdown>
            <Text.Markdown {...props}>**Bold text** in markdown</Text.Markdown>
            <Text.Markdown {...props}>*Italic text* in markdown</Text.Markdown>
            <Text.Markdown {...props}>`inline code` in markdown</Text.Markdown>
            <Text.Markdown {...props}>- Markdown list item</Text.Markdown>
        </Flex>
    ),
};

export const Label: StoryObj<typeof Text.Label> = {
    render: (props) => (
        <form>
            <Text.Label htmlFor="input" {...props}>
                Label for input
            </Text.Label>
            <Field.Input placeholder="input" name="input" />
        </form>
    ),
};

export const Li: StoryObj<typeof Text.Label> = {
    render: (props) => (
        <ul>
            <Text.Label as="li" {...props}>
                List element (I should not exist)
            </Text.Label>
            <Text.Label as="li" {...props} style={{ listStyleType: 'square' }}>
                Another list element (use @optimacros-ui/list instead)
            </Text.Label>
        </ul>
    ),
    tags: ['skip-test-runner'],
};
