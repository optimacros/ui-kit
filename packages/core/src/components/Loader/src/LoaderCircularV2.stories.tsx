import { ArgTypes, Meta } from '@storybook/react';

import { Loader } from './index';
import { useCallback, useEffect, useState } from 'react';
import { Icon } from '@optimacros-ui/icon';
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
        (Story) => (
            <Loader.Root>
                <Story />
            </Loader.Root>
        ),
    ],
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

export const ValueText = () => (
    <Loader.Root value={20}>
        <Loader.Label>
            Loading \/100 Loading Loading Loading Loading Loading Loading Loading Loading Loading
            Loading Loading Loading Loading Loading Loading Loading Loading Loading Loading Loading
            Loading Loading Loading Loading{' '}
        </Loader.Label>

        <div
            style={{
                position: 'relative',
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Loader.ValueText />
            <Loader.Circle>
                <Loader.CircleTrack />
                <Loader.CircleRange />
            </Loader.Circle>
        </div>
    </Loader.Root>
);

export const CancelTrigger = () => {
    return (
        <Loader.Root>
            <Loader.Api>
                {(api) => (
                    <>
                        <div onClick={() => api.start()}>start</div>
                        <Loader.Label>
                            Loading {api.value}/100 Loading Loading Loading Loading Loading Loading
                            Loading Loading Loading Loading Loading Loading Loading Loading Loading
                            Loading Loading Loading Loading Loading Loading Loading Loading Loading{' '}
                        </Loader.Label>
                    </>
                )}
            </Loader.Api>
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

                    <Loader.CancelTrigger style={{ position: 'absolute', top: -30, right: -30 }}>
                        <Icon value="close" style={{ fontSize: 32 }} />
                    </Loader.CancelTrigger>
                </div>
            </div>
        </Loader.Root>
    );
};

export const FloatingCancelTrigger = () => {
    const [counter, setCounter] = useState(33);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        setTimer(
            setInterval(() => {
                setCounter((c) => {
                    if (c >= 100) {
                        return 0;
                    }

                    return c + 1;
                });
            }, 100),
        );
    }, []);

    const handleCancel = useCallback(() => {
        clearInterval(timer);
    }, [timer]);

    return (
        <Loader.Root value={counter} onCancel={handleCancel}>
            <Loader.Label>
                Loading {counter}/100 Loading Loading Loading Loading Loading Loading Loading
                Loading Loading Loading Loading Loading Loading Loading Loading Loading Loading
                Loading Loading Loading Loading Loading Loading Loading{' '}
            </Loader.Label>

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

                    <Loader.FloatingCancelTrigger>
                        <Icon value="close" style={{ fontSize: 32 }} />
                    </Loader.FloatingCancelTrigger>
                </div>
            </div>
        </Loader.Root>
    );
};
