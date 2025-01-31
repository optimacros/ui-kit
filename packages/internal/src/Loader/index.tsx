import React from 'react';
import { Loader as LoaderComponent } from '@optimacros-ui/kit';

export type Theme = {
    buffer?: string;
    circle?: string;
    circular?: string;
    indeterminate?: string;
    linear?: string;
    multicolor?: string;
    path?: string;
    value?: string;
};

export type LoaderProps = {
    buffer?: number;
    className?: string;
    max?: number;
    min?: number;
    mode?: 'determinate' | 'indeterminate';
    type?: 'linear' | 'circular';
    value?: number;
    multicolor?: boolean;
    theme?: Theme;
    innerRef?: React.RefObject<HTMLDivElement>;
    disabled?: boolean;
};

export const Loader = ({
    min = 0,
    max = 100,
    mode = 'indeterminate',
    multicolor = false,
    type = 'linear',
    theme = {},
    value = null,
    buffer = null,
    innerRef,
    disabled = false,
}: LoaderProps) => {
    const isInfinite = !value && !buffer;

    return (
        <LoaderComponent.Root
            disabled={disabled}
            value={value || buffer}
            infinite={isInfinite}
            max={max}
            min={min}
            ref={innerRef}
        >
            {type === 'circular' ? (
                <LoaderComponent.Circle>
                    <LoaderComponent.CircleTrack />
                    <LoaderComponent.CircleRange />
                </LoaderComponent.Circle>
            ) : (
                <LoaderComponent.LinearTrack>
                    <LoaderComponent.LinearRange />
                </LoaderComponent.LinearTrack>
            )}
        </LoaderComponent.Root>
    );
};

export const ProgressBar = Loader;
