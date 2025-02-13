import { Button } from '@optimacros-ui/button';
import { FileUpload } from '..';
import { Text } from '@optimacros-ui/text';
import { IconButton } from '@optimacros-ui/icon-button';
import { Flex } from '../../../Flex/src/Flex';

export const DropZone = (props: FileUpload.RootProps) => {
    return (
        <Flex style={{ width: '500px', marginLeft: '20px', height: '500px' }}>
            <FileUpload.Root {...props} data-testid="root">
                <FileUpload.HiddenInput data-testid="input" />
                <FileUpload.UploadTrigger asChild data-testid="trigger">
                    <Button variant="bordered">Upload</Button>
                </FileUpload.UploadTrigger>
                <FileUpload.Dropzone data-testid="dropzone">Upload</FileUpload.Dropzone>
                <FileUpload.Content>
                    <FileUpload.ClearTrigger as="div" data-testid="clear-trigger">
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
        </Flex>
    );
};
