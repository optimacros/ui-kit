import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownEditor } from '.';
import { useState, useEffect } from 'react';

const meta: Meta<typeof MarkdownEditor> = {
    title: 'Ui Kit internal/MarkdownEditor',
    component: MarkdownEditor,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A versatile markdown editor with preview and split view modes.',
            },
        },
    },
    tags: ['autodocs', 'skip-test-runner'],
    decorators: [(Story) => <Story />],
    argTypes: {
        value: {
            control: 'text',
            description: 'Value',
            type: { name: 'string', required: true },
        },
        onChange: {
            control: false,
            description: 'Value change handler',
            type: { name: 'function', required: true },
        },
        height: {
            control: 'number',
            description: 'Component initial height. Required for `resizable`',
        },
        className: {
            control: 'text',
            description: 'Root element className',
        },
        editTabLabel: {
            control: 'text',
            description: 'Edit tab label',
        },
        previewTabLabel: {
            control: 'text',
            description: 'Preview tab label',
        },
        splitTabLabel: {
            control: 'text',
            description: 'Split tab label',
        },
        resizable: {
            control: 'boolean',
            description: 'Enables resize. height prop is also required',
        },
    },
};

export default meta;
type Story = StoryObj<typeof MarkdownEditor>;

// Default markdown editor
export const Default: Story = {
    args: {
        value: '# Hello World\n\nThis is a basic markdown editor.',
        height: 300,
    },
};

// Resizable editor
export const Resizable: Story = {
    args: {
        value: '# Resizable Editor\n\nTry dragging the bottom edge to resize.',
        height: 300,
        resizable: true,
    },
};

// Custom tab labels
export const CustomLabels: Story = {
    args: {
        value: '# Custom Labels\n\nThis editor has custom tab labels.',
        height: 300,
        editTabLabel: 'Write',
        previewTabLabel: 'Read',
        splitTabLabel: 'Both',
    },
};

// Interactive Blog Post Editor
export const BlogPostEditor: Story = {
    render: () => {
        const [content, setContent] = useState(`# My Blog Post

## Introduction
Start writing your blog post here...

## Main Content
- Point 1
- Point 2
- Point 3

## Conclusion
Wrap up your thoughts here...`);

        const handleChange = (newValue: string) => {
            setContent(newValue);
        };

        return (
            <div className="blog-editor-container">
                <div className="blog-editor-header">
                    <h2>Blog Post Editor</h2>
                    <button className="save-button" onClick={() => console.log('Saving:', content)}>
                        Save Draft
                    </button>
                </div>
                <MarkdownEditor
                    value={content}
                    onChange={handleChange}
                    height={400}
                    resizable={true}
                    className="blog-editor"
                />
                <div className="word-count">
                    Words: {content.split(/\s+/).filter(Boolean).length}
                </div>
            </div>
        );
    },
};

// Auto-saving Editor
export const AutoSavingEditor: Story = {
    render: () => {
        const [content, setContent] = useState('# Auto-saving Editor\n\nStart typing...');
        const [lastSaved, setLastSaved] = useState<Date | null>(null);
        const [saving, setSaving] = useState(false);

        useEffect(() => {
            const timer = setTimeout(() => {
                if (content) {
                    setSaving(true);
                    // Simulate API call
                    setTimeout(() => {
                        setLastSaved(new Date());
                        setSaving(false);
                    }, 500);
                }
            }, 1000);

            return () => clearTimeout(timer);
        }, [content]);

        return (
            <div className="autosave-editor-container">
                <div className="autosave-status">
                    {saving ? (
                        <span className="saving">Saving...</span>
                    ) : lastSaved ? (
                        <span className="saved">Last saved: {lastSaved.toLocaleTimeString()}</span>
                    ) : null}
                </div>
                <MarkdownEditor
                    value={content}
                    onChange={setContent}
                    height={300}
                    className="autosave-editor"
                />
            </div>
        );
    },
};

// Documentation Editor
export const DocumentationEditor: Story = {
    render: () => {
        const [content, setContent] = useState(`# Documentation Template

## Overview
[Brief description of the component/feature]

## Installation
\`\`\`bash
npm install my-package
\`\`\`

## Usage
\`\`\`typescript
import { MyComponent } from 'my-package';

const Example = () => (
    <MyComponent prop="value" />
);
\`\`\`

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop | string | - | Description |

## Examples
[Add examples here]`);

        const handleChange = (newValue: string) => {
            setContent(newValue);
        };

        return (
            <div className="documentation-editor-container">
                <div className="toolbar">
                    <button
                        className="toolbar-button"
                        onClick={() => {
                            setContent((prev) => prev + '\n\n## New Section\n[Content here]');
                        }}
                    >
                        Add Section
                    </button>
                    <button
                        className="toolbar-button"
                        onClick={() => {
                            setContent((prev) => prev + '\n\n```typescript\n// Code here\n```');
                        }}
                    >
                        Add Code Block
                    </button>
                    <button
                        className="toolbar-button"
                        onClick={() => {
                            setContent(
                                (prev) =>
                                    prev +
                                    '\n\n| Header | Column |\n|--------|--------|\n| Cell | Cell |',
                            );
                        }}
                    >
                        Add Table
                    </button>
                </div>
                <MarkdownEditor
                    value={content}
                    onChange={handleChange}
                    height={500}
                    resizable={true}
                    className="documentation-editor"
                />
            </div>
        );
    },
};

// Collaborative Editor Simulation
export const CollaborativeEditor: Story = {
    render: () => {
        const [content, setContent] = useState('# Collaborative Document\n\nStart editing...');
        const [activeUsers] = useState([
            { id: 1, name: 'Alice', color: '#ef4444' },
            { id: 2, name: 'Bob', color: '#3b82f6' },
            { id: 3, name: 'Charlie', color: '#10b981' },
        ]);

        useEffect(() => {
            const interval = setInterval(() => {
                const randomUser = activeUsers[Math.floor(Math.random() * activeUsers.length)];
                const notification = document.createElement('div');
                notification.className = 'user-activity';
                notification.style.borderColor = randomUser.color;
                notification.textContent = `${randomUser.name} is editing...`;
                document.querySelector('.collaboration-indicators')?.appendChild(notification);
                setTimeout(() => notification.remove(), 2000);
            }, 3000);

            return () => clearInterval(interval);
        }, []);

        return (
            <div className="collaborative-editor-container">
                <div className="active-users">
                    {activeUsers.map((user) => (
                        <div
                            key={user.id}
                            className="user-indicator"
                            style={{ backgroundColor: user.color }}
                            title={user.name}
                        />
                    ))}
                </div>
                <div className="collaboration-indicators" />
                <MarkdownEditor
                    value={content}
                    onChange={setContent}
                    height={400}
                    className="collaborative-editor"
                />
            </div>
        );
    },
};
