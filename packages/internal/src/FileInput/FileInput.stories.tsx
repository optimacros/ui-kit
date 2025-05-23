import type { Meta, StoryObj } from '@storybook/react';
import { FileInput } from '.';
import { useState, useCallback } from 'react';
import { fn } from '@storybook/test';

const meta: Meta<typeof FileInput> = {
    title: 'Ui Kit internal/FileInput',
    //@ts-ignore
    component: FileInput,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A file input component supporting file preview and custom labels.',
            },
        },
    },
    tags: ['autodocs', 'skip-test-runner'],
    argTypes: {
        filePreview: {
            control: 'boolean',
            description: 'Enable file preview functionality',
        },
        labelUploadNewFile: {
            control: 'text',
            description: 'Custom label for uploading new files',
        },
        value: {
            control: 'text',
            description: 'Value of the file input',
        },
    },
    args: {
        onChange: fn(),
    },
    decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof FileInput>;

const file = new File(['text content'], 'text.txt', { type: 'text/plain' });

// Basic file input
export const Default: Story = {
    args: {
        state: {
            file,
            reset: fn(),
        },
        filePreview: true,
    },
};

// With custom upload label
export const CustomLabel: Story = {
    args: {
        labelUploadNewFile: 'Choose a new file',
        state: {
            file,
            reset: fn(),
        },
    },
};

// With file preview enabled
export const WithPreview: Story = {
    args: {
        filePreview: true,
        state: {
            file,
            reset: fn(),
        },
    },
};

// Interactive file input with reset
export const InteractiveWithReset: Story = {
    render: () => {
        const [fileState, setFileState] = useState({
            file,
        });

        const handleReset = useCallback(() => {
            setFileState({
                file,
            });
        }, []);

        return (
            <div className="file-input-container">
                <FileInput
                    state={{
                        ...fileState,
                        reset: handleReset,
                    }}
                    labelUploadNewFile="Upload new file"
                    onChange={({ target }) =>
                        setFileState(() => ({
                            file: target.files?.[0],
                        }))
                    }
                    filePreview
                />
            </div>
        );
    },
};

const getImgFile = (size = 1024) =>
    new File([new ArrayBuffer(size)], 'img.jpg', { type: 'image/jpeg' });

// File size validator
export const WithSizeValidation: Story = {
    render: () => {
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB
        const [fileState, setFileState] = useState({
            file: getImgFile(6 * 1024 * 1024),
        });
        const [error, setError] = useState<string | null>(null);

        const validateFileSize = (size: number) => {
            if (size > MAX_SIZE) {
                setError('File size exceeds 5MB limit');
                return false;
            }
            setError(null);
            return true;
        };

        const handleReset = () => {
            setFileState({
                file: null,
            });
            setError(null);
        };

        return (
            <div className="file-input-container">
                <FileInput
                    state={{
                        ...fileState,
                        reset: handleReset,
                    }}
                    labelUploadNewFile="Upload file (max 5MB)"
                    onChange={({ target }) =>
                        setFileState(() => ({
                            file: target.files?.[0],
                        }))
                    }
                />
                {error && <div className="error-message">{error}</div>}
                {fileState.file.size > 0 && (
                    <div className="file-size">
                        Size: {(fileState.file.size / (1024 * 1024)).toFixed(2)}MB
                    </div>
                )}
            </div>
        );
    },
};

// Multiple file input showcase
export const MultipleFileStates: Story = {
    render: () => {
        const [files, setFiles] = useState([
            {
                id: 1,
                state: {
                    file,
                },
            },
            {
                id: 2,
                state: {
                    file: getImgFile(2048),
                },
            },
        ]);

        const handleReset = (id: number) => {
            setFiles((prev) =>
                prev.map((file) =>
                    file.id !== id
                        ? file
                        : { id: file.id, state: { file: null, reset: () => handleReset(file.id) } },
                ),
            );
        };

        return (
            <div className="multiple-files-container">
                {files.map((file) => (
                    <div key={file.id} className="file-input-wrapper">
                        <FileInput
                            state={{
                                ...file.state,
                                reset: () => handleReset(file.id),
                            }}
                            filePreview
                            onChange={({ target }) =>
                                setFiles(() => {
                                    return [
                                        ...files.filter(({ id }) => id !== file.id),
                                        {
                                            id: file.id,
                                            state: {
                                                file: target.files?.[0],
                                            },
                                            reset: () => handleReset(file.id),
                                        },
                                    ];
                                })
                            }
                            labelUploadNewFile={`Upload ${file.id === 1 ? 'Document' : 'Image'}`}
                        />
                    </div>
                ))}
            </div>
        );
    },
};

// Progress indicator
export const WithUploadProgress: Story = {
    render: () => {
        const [progress, setProgress] = useState(0);
        const [fileState, setFileState] = useState({
            file: null,
        });

        const simulateUpload = () => {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 500);
        };

        const handleReset = () => {
            setFileState({
                file: null,
            });
            setProgress(() => 0);
        };

        return (
            <div className="file-input-container">
                <FileInput
                    state={{
                        ...fileState,
                        reset: handleReset,
                    }}
                    labelUploadNewFile="Upload with progress"
                    filePreview
                    onChange={({ target }) => {
                        setFileState(() => ({
                            file: {
                                name: target.files?.[0]?.name,
                                size: target.files?.[0]?.size,
                                lastModified: target.files?.[0]?.lastModified,
                            },
                        }));
                    }}
                />
                {fileState.file?.size > 0 && (
                    <div className="upload-status">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="progress-text">{progress}% uploaded</div>
                        {progress === 0 && (
                            <button onClick={simulateUpload} className="upload-button">
                                Start Upload
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    },
};
