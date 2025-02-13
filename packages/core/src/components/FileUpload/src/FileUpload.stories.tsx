import { Field } from '@optimacros-ui/field';
import { Toolbar } from '@optimacros-ui/toolbar';
import { Align } from '@optimacros-ui/utils';
import { Meta, ArgTypes, StoryObj } from '@storybook/react';
import { Button } from '@optimacros-ui/button';
import { IconButton } from '@optimacros-ui/icon-button';
import { Text } from '@optimacros-ui/text';
import { FileUpload } from './index';
import * as stories from './stories';
import * as scenarios from './__tests__/scenarios';
import { fn } from '@storybook/test';

const argTypes: ArgTypes<FileUpload.RootProps> = {
    name: {
        control: `text`,
        description: 'The name of the underlying file input',
    },
    accept: {
        control: `object`,
        description: 'The accept file types',
        table: {
            type: {
                summary: `Record<string, string[]> | FileMimeType | FileMimeType[]`,
            },
        },
    },
    validate: {
        control: false,
        description: 'Function to validate a file',
        table: {
            type: {
                summary: `(file: File) => ("TOO_MANY_FILES" | "FILE_INVALID_TYPE" | "FILE_TOO_LARGE" | "FILE_TOO_SMALL" | "FILE_INVALID" | AnyString)[] | null`,
            },
        },
    },
    onFileChange: {
        control: false,
        description: 'Function called when the value changes, whether accepted or rejected',
        table: {
            type: {
                summary: `(details: { acceptedFiles: File[], rejectedFiles: FileRejection[] }) => void`,
            },
        },
    },
    allowDrop: {
        control: `boolean`,
        description: 'Whether to allow drag and drop in the dropzone element',
        table: {
            defaultValue: {
                summary: `true`,
            },
        },
    },
    disabled: {
        control: `boolean`,
        description: 'Whether the file input is disabled',
        table: {
            defaultValue: {
                summary: `false`,
            },
        },
    },
    required: {
        control: `boolean`,
        description: 'Whether the file input is required',
        table: {
            defaultValue: {
                summary: `false`,
            },
        },
    },
    invalid: {
        control: `boolean`,
        description: 'Whether the file input is invalid',
        table: {
            defaultValue: {
                summary: `false`,
            },
        },
    },
    maxFileSize: {
        control: `number`,
        description: 'The maximum file size in bytes',
        table: {
            defaultValue: {
                summary: `Infinity`,
            },
        },
    },
    minFileSize: {
        control: `number`,
        description: 'The minimum file size in bytes',
        table: {
            defaultValue: {
                summary: `0`,
            },
        },
    },
    maxFiles: {
        control: `number`,
        description: 'The maximum number of files',
        table: {
            defaultValue: {
                summary: `1`,
            },
        },
    },
    translations: {
        control: `object`,
        description: 'The localized messages to use',
        table: {
            type: {
                summary: `interface IntlTranslations {
    dropzone?: string | undefined;
    itemPreview?(file: File): string;
    deleteFile?(file: File): string;
}`,
            },
        },
    },
    children: { table: { disable: true } },
};

const meta: Meta<typeof FileUpload.Root> = {
    title: 'UI Kit core/FileUpload',
    argTypes,
};
export default meta;

type Story = StoryObj<typeof FileUpload.Root>;

export const Base: Story = {
    args: { controllable: true },
    render: stories.Basic,
    play: scenarios.basic,
};

export const Validation: Story = {
    args: {
        controllable: true,
        validate: (file) => {
            const yes = window.confirm(`allow ${file.name}?`);

            if (yes) {
                return null;
            }

            return ['no'];
        },
    },
    render: stories.Basic,
    play: scenarios.validation,
};

export const Restrictions: Story = {
    args: {
        controllable: true,
        maxFiles: 3,
        accept: 'image/*',
        onFileChange: fn(),
    },
    render: stories.Basic,
    play: scenarios.restrictions,
};

export const DropZone: Story = {
    args: {
        allowDrop: true,
        maxFiles: 5,
        style: { height: '100%', width: '100%' },
    },
    render: stories.DropZone,
    play: scenarios.dropZone,
};

export const States: Story = {
    args: { onFileChange: fn() },
    render: stories.States,
    play: scenarios.states,
};

export const WithForm: Story = {
    args: {
        accept: 'image/*',
        allowDrop: true,
        maxFiles: 1,
        name: 'file-input',
    },
    render: (props) => {
        return (
            <form
                onSubmit={(e) => e.preventDefault()}
                style={{
                    width: '400px',
                }}
            >
                <Field.Root>
                    <Field.FloatingLabel htmlFor="fn">First Name</Field.FloatingLabel>
                    <Field.Input id="fn" />
                </Field.Root>
                <Field.Root>
                    <Field.FloatingLabel htmlFor="fn">Last Name</Field.FloatingLabel>
                    <Field.Input id="fn" />
                </Field.Root>
                <FileUpload.Root {...props}>
                    <Text.Paragraph>Passport: </Text.Paragraph>
                    <FileUpload.HiddenInput />
                    <FileUpload.UploadTrigger asChild>
                        <IconButton icon="attach_file" variant="bordered" />
                    </FileUpload.UploadTrigger>
                    <FileUpload.Content>
                        <FileUpload.ClearTrigger as="div">
                            <IconButton icon="close" variant="bordered" size="xs" squared />
                        </FileUpload.ClearTrigger>
                        <FileUpload.ItemGroupHeader>
                            <Text.Title as="h3">FileName</Text.Title>
                            <Text.Title as="h3">FileSize</Text.Title>
                        </FileUpload.ItemGroupHeader>
                        <FileUpload.ItemGroup>
                            {(file) => (
                                <>
                                    <FileUpload.ItemInfo file={file} />
                                </>
                            )}
                        </FileUpload.ItemGroup>
                    </FileUpload.Content>
                </FileUpload.Root>
                <Toolbar.Root isSmall align={Align.Right}>
                    <Button variant="primary">Cancel</Button>
                    <Button variant="accent">Submit</Button>
                </Toolbar.Root>
            </form>
        );
    },
};
