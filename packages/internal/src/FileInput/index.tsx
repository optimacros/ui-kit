import { ChangeEvent, useEffect, useId } from 'react';
import { FileUpload } from '@optimacros-ui/file-upload';
import { Button } from '@optimacros-ui/button';
import { IconButton } from '@optimacros-ui/icon-button';
import { Text } from '@optimacros-ui/text';
import { adaptAcceptParam } from '@optimacros-ui/utils';
import { forward } from '@optimacros-ui/store';

import './style.css';

interface FileInputProps {
    state: {
        reset?: () => void;
        file: {
            lastModified: number;
            name: string;
            size: number;
        };
    };
    name?: string;
    accept?: string;
    value?: string;
    filePreview?: boolean;
    labelUploadNewFile?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput = forward<FileInputProps, HTMLInputElement>(
    (
        { state, value, filePreview, labelUploadNewFile, accept, name, onChange, ...otherProps },
        ref,
    ) => {
        const { file } = state || {};
        const generatedName = useId();

        const handleFileChange: FileUpload.RootProps['onFileChange'] = ({ acceptedFiles }) => {
            const dt = new DataTransfer();

            acceptedFiles.forEach((file) => {
                dt.items.add(file);
            });

            const files = dt.files;

            if (files.length === 0) {
                // onReset не работает, хз
                state.reset();
            } else {
                //@ts-ignore
                onChange?.({ target: { files } });
            }
        };

        return (
            <FileUpload.Root
                {...otherProps}
                allowDrop
                maxFiles={10}
                accept={adaptAcceptParam(accept)}
                name={name ?? generatedName}
                onFileChange={handleFileChange}
                data-style-tag="internal"
            >
                <FileUpload.HiddenInput ref={ref} />

                <FileUploadContent
                    file={file}
                    filePreview={filePreview}
                    labelUploadNewFile={labelUploadNewFile}
                />
            </FileUpload.Root>
        );
    },
);

const FileUploadContent = ({ file, filePreview, labelUploadNewFile }) => {
    const { acceptedFiles, setFiles } = FileUpload.useApi();

    useEffect(() => {
        if (file && acceptedFiles.length === 0) {
            setFiles([file]);
        }

        if (!file) {
            setFiles([]);
        }
    }, [file]);

    if (acceptedFiles.length > 0 && filePreview) {
        return (
            <FileUpload.Content
                data-scope="file-upload"
                data-part="content"
                style={{ display: 'block' }}
            >
                <FileUpload.ItemGroupHeader>
                    <Text.Title as="h3">Name</Text.Title>
                    <Text.Title as="h3">Size</Text.Title>
                </FileUpload.ItemGroupHeader>
                <FileUpload.ClearTrigger as="div">
                    <IconButton icon="close" variant="bordered" size="xs" squared />
                </FileUpload.ClearTrigger>
                <FileUpload.ItemGroup>
                    {(file) => <FileUpload.ItemInfo file={file} />}
                </FileUpload.ItemGroup>
            </FileUpload.Content>
        );
    }

    return (
        <FileUpload.UploadTrigger as="div">
            <Button variant="bordered">{labelUploadNewFile ?? 'Upload'}</Button>
        </FileUpload.UploadTrigger>
    );
};
