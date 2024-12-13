import { ArgTypes, Meta } from '@storybook/react';
import { Loader } from './index';
import { useEffect, useState } from 'react';
import { Icon } from '@optimacros-ui/icon';

const argTypes: Partial<ArgTypes> = {
    value: {
        control: 'number',
        description: 'Value of the current progress. Indeterminate mode if no value is provided',
        table: { defaultValue: { summary: 'null' } },
    },
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled.',
    },
    min: {
        control: 'number',
        description: 'The minimum allowed value of the progress bar.',
    },
    max: {
        control: 'number',
        description: 'The maximum allowed value of the progress bar.',
    },
    buffer: {
        control: 'number',
        description: 'Value of a secondary progress bar useful for buffering.',
        table: { type: { summary: 'not implemented yet' } },
    },
};

const meta: Meta = {
    title: 'UI Kit core/Loader/Linear',
    argTypes,
};
export default meta;

export const Basic = () => (
    <Loader.Root>
        <Loader.LinearTrack>
            <Loader.LinearRange />
        </Loader.LinearTrack>
    </Loader.Root>
);

export const Determinate = () => {
    const [counter, setCounter] = useState(33);

    useEffect(() => {
        setInterval(() => {
            setCounter((c) => {
                if (c >= 100) {
                    return 0;
                }

                return c + 1;
            });
        }, 100);
    }, []);

    return (
        <Loader.Root value={counter}>
            <Loader.LinearTrack>
                <Loader.LinearRange />
            </Loader.LinearTrack>
        </Loader.Root>
    );
};

export const Disabled = () => (
    <Loader.Root disabled>
        <Loader.LinearTrack>
            <Loader.LinearRange />
        </Loader.LinearTrack>
    </Loader.Root>
);

export const Buffer = () => (
    <Loader.Root value={50}>
        <Loader.LinearTrack>
            <Loader.LinearRange />
            <Loader.LinearBuffer buffer={70} />
        </Loader.LinearTrack>
    </Loader.Root>
);

export const Label = () => {
    const [counter, setCounter] = useState(33);

    useEffect(() => {
        setInterval(() => {
            setCounter((c) => {
                if (c >= 100) {
                    return 0;
                }

                return c + 1;
            });
        }, 100);
    }, []);

    return (
        <Loader.Root value={counter}>
            <Loader.Label>
                Loading {counter}/100 Loading Loading Loading Loading Loading Loading Loading
                Loading Loading Loading Loading Loading Loading Loading Loading Loading Loading
                Loading Loading Loading Loading Loading Loading Loading{' '}
            </Loader.Label>
            <Loader.LinearTrack>
                <Loader.LinearRange />
            </Loader.LinearTrack>
        </Loader.Root>
    );
};

export const ValueText = () => (
    <Loader.Root value={70}>
        <Loader.Label>
            Loading /100 Loading Loading Loading Loading Loading Loading Loading Loading Loading
            Loading Loading Loading Loading Loading Loading Loading Loading Loading Loading Loading
            Loading Loading Loading Loading{' '}
        </Loader.Label>

        <Loader.LinearTrack>
            <Loader.ValueText />
            <Loader.LinearRange />
        </Loader.LinearTrack>
    </Loader.Root>
);

export const CancelTrigger = () => {
    const handleCancel = () => {
        alert('cancel');
    };

    return (
        <Loader.Root value={70} onCancel={handleCancel}>
            <Loader.Label>
                Loading /100 Loading Loading Loading Loading Loading Loading Loading Loading Loading
                Loading Loading Loading Loading Loading Loading Loading Loading Loading Loading
                Loading Loading Loading Loading Loading{' '}
            </Loader.Label>

            <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Loader.LinearTrack>
                    <Loader.ValueText />
                    <Loader.LinearRange />
                </Loader.LinearTrack>

                <Loader.CancelTrigger>
                    <Icon value="close" style={{ fontSize: 26 }} />
                </Loader.CancelTrigger>
            </div>
        </Loader.Root>
    );
};

export const FloatingCancelTrigger = () => {
    const handleCancel = () => {
        alert('cancel');
    };

    return (
        <Loader.Root value={66} onCancel={handleCancel}>
            <Loader.Label>
                Loading /100 Loading Loading Loading Loading Loading Loading Loading Loading Loading
                Loading Loading Loading Loading Loading Loading Loading Loading Loading Loading
                Loading Loading Loading Loading Loading{' '}
            </Loader.Label>

            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    height: 30,
                    paddingRight: 50,
                }}
            >
                <Loader.LinearTrack>
                    <Loader.ValueText />
                    <Loader.LinearRange />
                </Loader.LinearTrack>

                <Loader.FloatingCancelTrigger>
                    <Icon value="close" style={{ fontSize: 26 }} />
                </Loader.FloatingCancelTrigger>
            </div>
        </Loader.Root>
    );
};
