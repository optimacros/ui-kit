//@ts-nocheck

import { useId } from 'react';
import { FileUpload } from '@optimacros-ui/file-upload';
import { Button } from '@optimacros-ui/button';
import { IconButton } from '@optimacros-ui/icon-button';
import { Text } from '@optimacros-ui/text';
import { adaptAcceptParam } from '@optimacros-ui/utils';

interface FileInputProps {
    state: {
        reset?: () => void;
        file: {
            lastModified: number;
            name: string;
            size: number;
        };
    };
    value?: string;
    filePreview?: boolean;
    labelUploadNewFile?: string;
}

export const FileInput: FileInputProps = ({
    state,
    value,
    filePreview,
    labelUploadNewFile,
    accept,
    name,
    onChange,
    ...otherProps
}) => {
    const { file, reset } = state || {};
    const generatedName = useId();

    return (
        <FileUpload.Root
            {...otherProps}
            allowDrop
            maxFiles={10}
            accept={adaptAcceptParam(accept)}
            name={name ?? generatedName}
            onFileAccept={(files) => onChange?.({ target: { files: files.acceptedFiles } })}
        >
            {file && filePreview ? (
                <div data-scope="file-upload" data-part="content" style={{ display: 'block' }}>
                    <FileUpload.ItemGroupHeader>
                        <div data-scope="file-upload" data-part="item-group-header">
                            <Text.Title as="h3">Name</Text.Title>
                            <Text.Title as="h3">Size</Text.Title>
                        </div>
                        {reset && (
                            <IconButton
                                icon="close"
                                variant="bordered"
                                size="xs"
                                squared
                                onClick={() => reset()}
                            />
                        )}
                    </FileUpload.ItemGroupHeader>
                    <FileUpload.ItemInfo file={file} />
                </div>
            ) : (
                <>
                    <FileUpload.HiddenInput />
                    <FileUpload.UploadTrigger asChild>
                        <Button variant="bordered">{labelUploadNewFile ?? 'Upload'}</Button>
                    </FileUpload.UploadTrigger>
                </>
            )}
        </FileUpload.Root>
    );
};
