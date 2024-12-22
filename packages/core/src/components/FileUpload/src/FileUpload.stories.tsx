import { ReactNode } from 'react';
import { Field } from '@optimacros-ui/field';
import { Toolbar } from '@optimacros-ui/toolbar';
import { Align } from '@optimacros-ui/utils';
import { Meta } from '@storybook/react';
import { Button } from '@optimacros-ui/button';
import { IconButton } from '@optimacros-ui/icon-button';
import { Text } from '@optimacros-ui/text';
import { FileUpload } from './index';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '500px', marginLeft: '20px', height: '500px' }}>{children}</div>
);

const meta: Meta<typeof FileUpload> = {
    title: 'UI Kit core/FileUpload',
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};
export default meta;

export const Base = () => {
    return (
        <FileUpload.Root
            accept="image/*"
            allowDrop
            maxFiles={5}
            name="file-input"
            className="size-full"
        >
            <FileUpload.HiddenInput />
            <FileUpload.UploadTrigger asChild>
                <Button variant="bordered">Upload</Button>
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
    );
};

export const DropZone = () => {
    return (
        <FileUpload.Root
            accept="image/*"
            allowDrop
            maxFiles={5}
            name="file-input"
            className="size-full"
        >
            <FileUpload.HiddenInput />
            <FileUpload.Dropzone>Upload</FileUpload.Dropzone>
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
    );
};

export const WithForm = () => {
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
            <FileUpload.Root
                accept="image/*"
                allowDrop
                maxFiles={1}
                name="file-input"
                className="size-full"
            >
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
};
