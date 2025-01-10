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

export const FileInput: FileInputProps = ({
    state,
    value,
    filePreview,
    labelUploadNewFile,
    ...otherProps
}) => {
    const { file, reset } = state || {};

    return (
        <FileUpload.Root {...otherProps} allowDrop maxFiles={1} name="file-input">
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
