import { Button } from '@optimacros-ui/button';
import { FileUpload } from '..';
import { Text } from '@optimacros-ui/text';
import { Flex } from '@optimacros-ui/flex';
import { IconButton } from '@optimacros-ui/icon-button';

export const States = (props: FileUpload.RootProps) => {
    return (
        <Flex gap={2} direction="column">
            <Flex gap={1} direction="column">
                <Text.Span>Required</Text.Span>
                <FileUpload.Root {...props} required data-testid="root-required">
                    <FileUpload.HiddenInput data-testid="input-required" />
                    <FileUpload.UploadTrigger asChild data-testid="trigger-required">
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
            </Flex>

            <Flex gap={1} direction="column">
                <Text.Span>Disabled</Text.Span>
                <FileUpload.Root {...props} disabled data-testid="root-disabled">
                    <FileUpload.HiddenInput data-testid="input-disabled" />
                    <FileUpload.UploadTrigger asChild data-testid="trigger-disabled">
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
            </Flex>

            <Flex gap={1} direction="column">
                <Text.Span>Invalid</Text.Span>
                <FileUpload.Root {...props} invalid data-testid="root-invalid">
                    <FileUpload.HiddenInput data-testid="input-invalid" />
                    <FileUpload.UploadTrigger asChild data-testid="trigger-invalid">
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
            </Flex>
        </Flex>
    );
};
