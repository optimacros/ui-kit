import React from 'react';
import { Loader as LoaderComponent } from '@optimacros-ui/loader';
import { clsx } from '@optimacros-ui/utils';
import { forward } from '@optimacros-ui/store';

export type LoaderTheme = {
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
    theme?: LoaderTheme;
    innerRef?: React.RefObject<HTMLDivElement>;
    disabled?: boolean;
};

export const Loader = forward<LoaderProps, 'div'>(
    (
        {
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
            className,
        },
        ref,
    ) => {
        const isInfinite = !value && !buffer;

        const cn = clsx(
            theme[type],
            {
                [theme.indeterminate]: mode === 'indeterminate',
                [theme.multicolor]: multicolor,
            },
            className,
        );

        return (
            <LoaderComponent.Root
                disabled={disabled}
                value={value || buffer}
                infinite={isInfinite}
                max={max}
                min={min}
                ref={innerRef || ref}
                multicolor={multicolor}
                state={mode}
                className={cn}
            >
                {type === 'circular' ? (
                    <LoaderComponent.Circle className={theme.circle}>
                        <LoaderComponent.CircleTrack className={theme.path} />
                        <LoaderComponent.CircleRange />
                    </LoaderComponent.Circle>
                ) : (
                    <LoaderComponent.LinearTrack className={theme.buffer}>
                        <LoaderComponent.LinearRange />
                    </LoaderComponent.LinearTrack>
                )}
            </LoaderComponent.Root>
        );
    },
);

export const ProgressBar = Loader;
