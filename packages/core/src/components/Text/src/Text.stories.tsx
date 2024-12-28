import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '.';

const meta: Meta = {
    title: 'Ui kit core/Text',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

// Title Stories
export const TitleComponent: StoryObj = {
    render: () => (
        <div className="space-y-4">
            <Text.Title as="h1">Heading Level 1</Text.Title>
            <Text.Title as="h2">Heading Level 2</Text.Title>
            <Text.Title as="h3">Heading Level 3</Text.Title>
            <Text.Title as="h4">Heading Level 4</Text.Title>
            <Text.Title as="h5">Heading Level 5</Text.Title>
            <Text.Title as="h6">Heading Level 6</Text.Title>
        </div>
    ),
    name: 'Title Variations',
};

// Paragraph Stories
export const ParagraphComponent: StoryObj = {
    render: () => (
        <div className="space-y-4">
            <Text.Paragraph>
                This is a standard paragraph with regular text. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
            </Text.Paragraph>
            <Text.Paragraph as="span">
                This paragraph is rendered as a span element instead.
            </Text.Paragraph>
            <Text.Paragraph as="li">
                This paragraph is rendered as a list item element.
            </Text.Paragraph>
        </div>
    ),
    name: 'Paragraph Variations',
};

// Code Stories
export const CodeComponent: StoryObj = {
    render: () => (
        <div className="space-y-4">
            <Text.Code>const greeting = "Hello, World!";</Text.Code>
            <Text.Code>
                {`function example() {
  return "This is a code block";
}`}
            </Text.Code>
        </div>
    ),
    name: 'Code Examples',
};

// Markdown Stories
export const MarkdownComponent: StoryObj = {
    render: () => (
        <div className="space-y-4">
            <Text.Markdown>**Bold text** in markdown</Text.Markdown>
            <Text.Markdown>*Italic text* in markdown</Text.Markdown>
            <Text.Markdown>`inline code` in markdown</Text.Markdown>
            <Text.Markdown as="li">- Markdown as list item</Text.Markdown>
        </div>
    ),
    name: 'Markdown Examples',
};

// Combined Usage Example
export const CombinedExample: StoryObj = {
    render: () => (
        <div className="space-y-6">
            <Text.Title as="h1">Documentation Example</Text.Title>
            <Text.Paragraph>
                Welcome to our documentation. Below you'll find various examples of our text
                components working together.
            </Text.Paragraph>
            <Text.Title as="h2">Code Sample</Text.Title>
            <Text.Code>
                {`const Component = () => {
  return <div>Hello World</div>;
}`}
            </Text.Code>
            <Text.Title as="h2">Markdown Support</Text.Title>
            <Text.Markdown>
                You can use **bold**, *italic*, and `code` within markdown text.
            </Text.Markdown>
        </div>
    ),
    name: 'Combined Usage',
};
