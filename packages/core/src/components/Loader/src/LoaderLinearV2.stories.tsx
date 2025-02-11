import { ArgTypes, Meta } from '@storybook/react';
import { Loader } from '.';
import { useEffect } from 'react';

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
    decorators: [
        (Story, props) => {
            return (
                <Loader.Root {...props.args}>
                    <Story />
                </Loader.Root>
            );
        },
    ],
    tags: ['skip-test-runner'],
};
export default meta;

export const Basic = () => {
    const api = Loader.useApi();

    useEffect(() => {
        api.start();
    }, []);

    return (
        <Loader.LinearTrack>
            <Loader.LinearRange />
        </Loader.LinearTrack>
    );
};

export const Disabled = {
    render: () => <Basic />,
    args: {
        disabled: true,
    },
    tags: ['!skip-test-runner'],
};

export const Buffer = {
    render: () => <Basic />,
    args: {
        value: 33,
    },
};

export const Label = {
    render: () => {
        const counter = Loader.useProxySelector((state) => state.value);

        return (
            <>
                <Loader.Label>Loading {counter}/100</Loader.Label>
                <Basic />
            </>
        );
    },
    args: {
        max: 100,
    },
};

export const Infinite = {
    render: () => {
        const counter = Loader.useProxySelector((state) => state.value);

        return (
            <>
                <Loader.Label>Loading {counter}/100</Loader.Label>
                <Basic />
            </>
        );
    },
    args: {
        infinite: true,
    },
};
