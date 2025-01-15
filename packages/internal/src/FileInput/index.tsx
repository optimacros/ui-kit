import { useId } from 'react';
import { FileUpload } from '@optimacros-ui/file-upload';
import { Button } from '@optimacros-ui/button';
import { IconButton } from '@optimacros-ui/icon-button';
import { Text } from '@optimacros-ui/text';

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

const mimeMap = {
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.odf': 'application/vnd.oasis.opendocument.spreadsheet',
    '.csv': 'text/csv',
    '.txt': 'text/plain',
    '.zip': 'zip,application/zip,application/x-zip,application/x-zip-compressed',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.bmp': 'image/bmp',
    '.svg': 'image/svg+xml',
};

function adaptAcceptParam(params) {
    return Array.isArray(params)
        ? params.map((ext) => mimeMap[ext] || ext).join(',')
        : mimeMap[params];
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
            onFileChange={(files) =>
                onChange && onChange({ target: { files: files.acceptedFiles } })
            }
        >
            {file && filePreview ? (
                <>
                    {reset && (
                        <IconButton
                            icon="close"
                            variant="bordered"
                            size="xs"
                            squared
                            onClick={() => reset()}
                        />
                    )}
                    <FileUpload.ItemGroupHeader>
                        <Text.Title as="h3">Name</Text.Title>
                        <Text.Title as="h3">Size</Text.Title>
                    </FileUpload.ItemGroupHeader>
                    <FileUpload.ItemInfo file={file} />
                </>
            ) : (
                <>
                    <FileUpload.HiddenInput />
                    <FileUpload.UploadTrigger asChild>
                        <Button variant="bordered">{labelUploadNewFile ?? 'Upload'}</Button>
                    </FileUpload.UploadTrigger>
                    <FileUpload.Content>
                        <FileUpload.ItemGroup>
                            {(file) => <FileUpload.ItemInfo file={file} />}
                        </FileUpload.ItemGroup>
                    </FileUpload.Content>
                </>
            )}
        </FileUpload.Root>
    );
};
