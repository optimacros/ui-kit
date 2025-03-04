import { fn } from '@storybook/test';
import { FileUpload } from '..';

export const props: Partial<FileUpload.RootProps> = {
    name: 'input name',
    accept: ['image/*', 'text/plain'],
    allowDrop: true,
    disabled: false,
    required: false,
    invalid: false,
    maxFileSize: undefined,
    minFileSize: 0,
    maxFiles: 3,
    validate: fn(),
    onFileChange: fn(),
    onFileReject: fn(),
    onFileAccept: fn(),
};
