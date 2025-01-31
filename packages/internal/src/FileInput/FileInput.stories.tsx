//@ts-nocheck

import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { FileInput } from '@optimacros-ui/kit-internal';
import { ReactNode, useState } from 'react';

const argTypes: Partial<ArgTypes> = {};

const meta: Meta<typeof FileInput> = {
    title: 'UI Kit internal/FileInput',
    component: FileInput,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof FileInput>;

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '500px', marginLeft: '20px', height: '500px' }}>{children}</div>
);

export const BaseTrigger: Story = {
    args: {
        accept: '.zip',
        state: {
            file: {
                lastModified: 11,
                name: 'Default file',
                size: 2000000000000,
            },
            reset: () => {},
        },
        filePreview: false,
    },
};

export const BaseUploadedFile: Story = {
    args: {
        accept: ['.xls', '.xlsx', '.odf', '.csv', '.txt', '.zip'],
        state: {
            file: {
                lastModified: 11,
                name: 'Default file',
                size: 2000000000000,
            },
            reset: () => {},
        },
        filePreview: true,
    },
};

const InputFileState = () => {
    const [state, setState] = useState({
        file: {
            lastModified: 11,
            name: 'Default file',
            size: 2000000000000,
        },
        reset: () => onReset(),
    });
    const [filePreview, setFilePreview] = useState(true);

    const onReset = () => {
        setState((prev) => ({ ...prev, file: {} }));
        setFilePreview(false);
    };

    const props = {
        accept: ['.xls', '.xlsx', '.odf', '.csv', '.txt', '.zip'],
        state: state,
        filePreview: filePreview,
        onChange: (file) => {
            setState((prev) => ({ ...prev, file: file }));
            setFilePreview(true);
        },
    };

    return <FileInput {...props} />;
};

export const Dynamic: Story = {
    render: () => (
        <Wrapper>
            <InputFileState />
        </Wrapper>
    ),
};
