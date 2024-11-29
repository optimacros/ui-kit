import { ArgTypes, Meta } from '@storybook/react';

import { Loader } from './index';
import { useEffect, useState } from 'react';

const argTypes: Partial<ArgTypes> = {
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled.',
    },
    value: {
        control: 'number',
        description: 'Value of the current progress.',
    },
    min: {
        control: 'number',
        description: 'Minimum value permitted.',
    },
    max: {
        control: 'number',
        description: 'Maximum value permitted.',
    },
    buffer: {
        control: 'number',
        description: 'Value of a secondary progress bar useful for buffering.',
    },
    multicolor: {
        control: 'boolean',
        description:
            ' If `true`, the circular progress bar will be changing its color. ' +
            'When type is `circular` and node is `indeterminate`.',
    },
};

const meta: Meta = {
    title: 'UI Kit core/LoaderV2 Circular',
    argTypes,
};
export default meta;

export const Basic = () => (
    <Loader.Root>
        <Loader.Circle>
            <Loader.CircleTrack />
            <Loader.CircleRange />
        </Loader.Circle>
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
            <Loader.Circle>
                <Loader.CircleTrack />
                <Loader.CircleRange />
            </Loader.Circle>
        </Loader.Root>
    );
};

export const Disabled = () => (
    <Loader.Root disabled>
        <Loader.Circle>
            <Loader.CircleTrack />
            <Loader.CircleRange />
        </Loader.Circle>
    </Loader.Root>
);

export const Buffer = () => (
    <Loader.Root value={33}>
        <Loader.Circle>
            <Loader.CircleTrack />
            <Loader.CircleRange />
        </Loader.Circle>
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
            <Loader.Circle>
                <Loader.CircleTrack />
                <Loader.CircleRange />
            </Loader.Circle>
        </Loader.Root>
    );
};

export const Multicolor = () => (
    <Loader.Root multicolor>
        <Loader.Circle>
            <Loader.CircleTrack />
            <Loader.CircleRange />
        </Loader.Circle>
    </Loader.Root>
);
