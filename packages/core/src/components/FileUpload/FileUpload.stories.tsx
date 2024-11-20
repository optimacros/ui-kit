import { Meta } from '@storybook/react';

import { FileUpload } from './index';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { IconButton } from '../IconButtonV2/IconButton';
import { ReactNode } from 'react';
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
            accept={'image/*'}
            allowDrop
            maxFiles={5}
            name="file-input"
            className="size-full"
        >
            <FileUpload.HiddenInput />
            <FileUpload.UploadTrigger asChild>
                <Button variant="bordered">Upload</Button>
            </FileUpload.UploadTrigger>
            <FileUpload.Dropzone>Upload</FileUpload.Dropzone>
            <FileUpload.Content>
                <FileUpload.ClearTrigger>
                    <IconButton renderIcon={() => <Icon value={'close'} />} variant="bordered" />
                </FileUpload.ClearTrigger>
                <FileUpload.ItemGroupHeader>
                    <span>FileName</span>
                    <span>FileSize</span>
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