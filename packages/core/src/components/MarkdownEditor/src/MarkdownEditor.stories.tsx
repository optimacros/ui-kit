import { useState } from 'react';
import { MarkdownEditor } from './index';
import { ArgTypes, Meta } from '@storybook/react';
import { within, expect, waitFor, fireEvent } from '@storybook/test';
import { StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { convertStringToMarkdown } from './utils';

const argTypes: Partial<ArgTypes> = {
    value: {
        control: 'text',
        description: 'Current editor value',
    },
    disabled: {
        control: 'boolean',
        description: 'Whether the editor is disabled',
    },
    onChange: {
        control: false,
        description: 'Value change handler',
        table: { type: { summary: '(newValue: string) => void' } },
    },
};

const meta: Meta = {
    title: 'Ui kit core/Markdown Editor',
    argTypes,
};
export default meta;

const defaultValue = `## heading

text

- list
- list
- list`;

const generateMarkdown = () => {
    return `# ${faker.company.catchPhrase()}

## About the Author
*${faker.person.fullName()}*
${faker.person.jobTitle()} at ${faker.company.name()}

## Introduction
${faker.lorem.paragraph(3)}

### Key Points
${new Array(3)
    .fill(null)
    .map(() => `- ${faker.company.buzzPhrase()}`)
    .join('\n')}

## Main Content

### ${faker.commerce.productName()}
${faker.lorem.paragraphs(2)}

#### Technical Details
| Feature | Description |
|---------|-------------|
${new Array(4)
    .fill(null)
    .map(() => `| ${faker.lorem.word()} | ${faker.lorem.word()} |`)
    .join('\n')}

### Market Analysis
${faker.lorem.paragraphs(1)}

> ${faker.person.bio()}
> — ${faker.person.firstName()} ${faker.person.lastName()}

## Conclusion
${faker.lorem.paragraph(2)}

---
*Generated on ${faker.date.recent().toLocaleDateString()}*
Tags: ${new Array(3)
        .fill(null)
        .map(() => `${faker.hacker.adjective()}`)
        .join(', ')}
`;
};

const tabs: MarkdownEditor.Tabs.Tab[] = [
    { id: MarkdownEditor.MarkdownEditorMode.EDIT, title: MarkdownEditor.MarkdownEditorMode.EDIT },
    {
        id: MarkdownEditor.MarkdownEditorMode.PREVIEW,
        title: MarkdownEditor.MarkdownEditorMode.PREVIEW,
    },
    { id: MarkdownEditor.MarkdownEditorMode.SPLIT, title: MarkdownEditor.MarkdownEditorMode.SPLIT },
];

export const Basic: StoryObj = {
    render: () => {
        const [value, setValue] = useState('');

        const handleChange = (v: string) => setValue(v);

        return (
            <div style={{ width: '100%', height: 500 }}>
                <button
                    style={{ marginBottom: 20 }}
                    onClick={() => setValue('')}
                    data-testid="clear-trigger"
                >
                    reset
                </button>

                <MarkdownEditor.Root value={value} onChange={handleChange} tabs={tabs}>
                    <MarkdownEditor.Tabs.List>
                        {(tabs) =>
                            tabs.map((tab) => (
                                <MarkdownEditor.Tabs.Trigger
                                    key={tab.id}
                                    id={tab.id}
                                    data-testid={`${tab.id}-trigger`}
                                >
                                    {tab.title}
                                </MarkdownEditor.Tabs.Trigger>
                            ))
                        }
                    </MarkdownEditor.Tabs.List>

                    <MarkdownEditor.Edit data-testid="edit-tab" />
                    <MarkdownEditor.Preview data-testid="preview-tab" />
                    <MarkdownEditor.Split />
                </MarkdownEditor.Root>
            </div>
        );
    },
    play: async ({ canvasElement, step, globals }) => {
        if (!globals.test) {
            return;
        }

        const canvas = within(canvasElement);
        const editTrigger = canvas.getByTestId('edit-trigger');
        const previewTrigger = canvas.getByTestId('preview-trigger');

        const editTab = canvas.getByTestId('edit-tab');

        const previewTab = canvas.getByTestId('preview-tab');

        const md = generateMarkdown();
        const expectedOutput = convertStringToMarkdown(md);

        await step('typing', async () => {
            const editTextarea = within(editTab).getByLabelText('textarea');

            await fireEvent.click(editTrigger);
            await waitFor(() => expect(editTab).not.toHaveAttribute('hidden'));
            await waitFor(() => expect(editTextarea).toHaveValue(''));

            // TODO: use userEvent
            await fireEvent.change(editTextarea, { target: { value: md } });

            await waitFor(() => expect(editTextarea).toHaveValue(md));

            await fireEvent.click(previewTrigger);
            await waitFor(() => expect(previewTab).not.toHaveAttribute('hidden'));

            await waitFor(() => expect(previewTab.innerHTML).toBe(expectedOutput));

            await fireEvent.click(editTrigger);
            await fireEvent.focus(editTab);

            await fireEvent.change(editTextarea, { target: { value: '' } });
            await fireEvent.click(previewTrigger);

            await waitFor(() => expect(previewTab).toBeEmptyDOMElement());
        });
    },
};

export const Disabled = {
    render: () => {
        return (
            <div style={{ width: '100%', height: 500 }}>
                <MarkdownEditor.Root value={defaultValue} disabled tabs={tabs}>
                    <MarkdownEditor.Tabs.List>
                        {(tabs) =>
                            tabs.map((tab) => (
                                <MarkdownEditor.Tabs.Trigger
                                    key={tab.id}
                                    id={tab.id}
                                    data-testid={`${tab.id}-trigger`}
                                >
                                    {tab.title}
                                </MarkdownEditor.Tabs.Trigger>
                            ))
                        }
                    </MarkdownEditor.Tabs.List>

                    <MarkdownEditor.Edit
                        id={MarkdownEditor.MarkdownEditorMode.EDIT}
                        data-testid="edit-tab"
                    />
                    <MarkdownEditor.Preview
                        id={MarkdownEditor.MarkdownEditorMode.PREVIEW}
                        data-testid="preview-tab"
                    />
                    <MarkdownEditor.Split
                        id={MarkdownEditor.MarkdownEditorMode.SPLIT}
                        data-testid="split-tab"
                    />
                </MarkdownEditor.Root>
            </div>
        );
    },
    play: async ({ canvasElement, step, globals }) => {
        if (!globals.test) {
            return;
        }

        const canvas = within(canvasElement);
        const editTrigger = canvas.getByTestId('edit-trigger');
        const previewTrigger = canvas.getByTestId('preview-trigger');

        const editTab = canvas.getByTestId('edit-tab');

        const previewTab = canvas.getByTestId('preview-tab');

        const md = generateMarkdown();

        await step('typing', async () => {
            const editTextarea = within(editTab).getByLabelText('textarea');

            await fireEvent.click(editTrigger);
            await waitFor(() => expect(editTab).not.toHaveAttribute('hidden'));
            await waitFor(() => expect(editTextarea).toHaveValue(defaultValue));
        });
    },
};
