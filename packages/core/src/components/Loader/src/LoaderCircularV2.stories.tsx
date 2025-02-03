//@ts-nocheck

import { ArgTypes, Meta } from '@storybook/react';

import { Loader } from './index';
import { useEffect } from 'react';
import LinearStory from './LoaderLinearV2.stories';

const argTypes: Partial<ArgTypes> = {
    ...LinearStory.argTypes,
    multicolor: {
        control: 'boolean',
        description: 'The circular progress bar will be changing its color in indeterminate mode.',
    },
};

const meta: Meta = {
    title: 'UI Kit core/Loader/Circular',
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
        <Loader.Circle>
            <Loader.CircleTrack />
            <Loader.CircleRange />
        </Loader.Circle>
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

export const CancelTrigger = () => {
    return (
        <>
            <Loader.StartTrigger>start</Loader.StartTrigger>
            <Loader.CancelTrigger>stop</Loader.CancelTrigger>
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 30,
                }}
            >
                <Loader.ValueText />

                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                    }}
                >
                    <Loader.Circle>
                        <Loader.CircleTrack />
                        <Loader.CircleRange />
                    </Loader.Circle>
                </div>
            </div>
        </>
    );
};
