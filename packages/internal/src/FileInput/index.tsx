import { ChangeEvent, useId } from 'react';
import { FileUpload } from '@optimacros-ui/file-upload';
import { Button } from '@optimacros-ui/button';
import { IconButton } from '@optimacros-ui/icon-button';
import { Text } from '@optimacros-ui/text';
import { adaptAcceptParam } from '@optimacros-ui/utils';
import { forward } from '@optimacros-ui/store';

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
        const { file, reset } = state || {};
        const generatedName = useId();

        return (
            <FileUpload.Root
                {...otherProps}
                allowDrop
                maxFiles={10}
                accept={adaptAcceptParam(accept)}
                name={name ?? generatedName}
                //@ts-ignore
                onFileAccept={({ files }) => onChange?.({ target: { files } })}
                onReset={reset}
                //@ts-ignore
                acceptedFiles={file ? [file] : []}
            >
                <FileUpload.HiddenInput ref={ref} />
                <FileUpload.Api>
                    {({ acceptedFiles }) =>
                        acceptedFiles.length > 0 && filePreview ? (
                            <FileUpload.Content
                                data-scope="file-upload"
                                data-part="content"
                                style={{ display: 'block' }}
                            >
                                <FileUpload.ItemGroupHeader>
                                    <FileUpload.ItemGroupHeader>
                                        <Text.Title as="h3">Name</Text.Title>
                                        <Text.Title as="h3">Size</Text.Title>
                                    </FileUpload.ItemGroupHeader>
                                    <FileUpload.ClearTrigger as="div">
                                        <IconButton
                                            icon="close"
                                            variant="bordered"
                                            size="xs"
                                            squared
                                        />
                                    </FileUpload.ClearTrigger>
                                </FileUpload.ItemGroupHeader>
                                <FileUpload.ItemGroup>
                                    {(file) => <FileUpload.ItemInfo file={file} />}
                                </FileUpload.ItemGroup>
                            </FileUpload.Content>
                        ) : (
                            <>
                                <FileUpload.UploadTrigger as="div">
                                    <Button variant="bordered">
                                        {labelUploadNewFile ?? 'Upload'}
                                    </Button>
                                </FileUpload.UploadTrigger>
                            </>
                        )
                    }
                </FileUpload.Api>
            </FileUpload.Root>
        );
    },
);
