import { Button } from '@optimacros-ui/button';
import { FileUpload } from '..';
import { Text } from '@optimacros-ui/text';
import { IconButton } from '@optimacros-ui/icon-button';
import { Flex } from '../../../Flex/src/Flex';

export const Basic = (props: FileUpload.RootProps) => {
    return (
        <FileUpload.Root {...props} data-testid="root">
            <FileUpload.HiddenInput data-testid="input" />
            <FileUpload.UploadTrigger asChild data-testid="trigger">
                <Button variant="bordered">Upload</Button>
            </FileUpload.UploadTrigger>
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
                        <Flex gap={1} key={file.name}>
                            <FileUpload.ItemInfo file={file} data-testid="item-info" />
                        </Flex>
                    )}
                </FileUpload.ItemGroup>
            </FileUpload.Content>
        </FileUpload.Root>
    );
};
