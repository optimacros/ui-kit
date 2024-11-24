import { forward } from '@optimacros/ui-kit-store';
import { clsx, tw, isNumber, notEmptyOrNull } from '@optimacros/ui-kit-utils';
import { normalizeProps, useMachine } from '@zag-js/react';
import React, { useId, useImperativeHandle, useMemo } from 'react';
import * as progress from '@zag-js/progress';
import { PropTypes } from '@zag-js/react';
import { Buffer } from './components/Buffer';
import { Label } from './components/Label';

interface LinearProps {
    label?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    max?: number;
    min?: number;
    value?: number;
    /** not implemented yet */
    buffer?: number;
    mode?: 'determinate' | 'indeterminate';
}

interface CircularProps extends LinearProps {
    multicolor?: boolean;
}

const cn = tw` 
font-normal
`;

export const Linear = forward<LinearProps, progress.Api<PropTypes>>(
    (
        {
            label,
            disabled,
            className,
            min = 0,
            max = 100,
            value = 50,
            buffer,
            mode = 'indeterminate',
        },
        ref,
    ) => {
        const [state, send] = useMachine(
            progress.machine({
                id: useId(),
                min,
                max,
                value: mode === 'indeterminate' ? null : value,
            }),
        );

        const api = progress.connect(state, send, normalizeProps);

        useImperativeHandle(ref, () => api, [api]);

        const rootProps = useMemo(() => {
            const props = { ...api.getRootProps(), className: clsx(cn, className) };

            if (disabled) {
                props['data-disabled'] = true;
            }

            return props;
        }, [api, className, disabled]);

        return (
            <div {...rootProps}>
                {notEmptyOrNull(label) && <Label api={api} label={label} />}

                <div {...api.getTrackProps()}>
                    <div {...api.getRangeProps()} />
                    {isNumber(buffer) && <Buffer api={api} buffer={buffer} />}
                </div>
            </div>
        );
    },
);

export const Circular = forward<CircularProps, progress.Api<PropTypes>>(
    (
        { disabled, className, min = 0, max = 100, value = 50, buffer, mode = 'indeterminate' },
        ref,
    ) => {
        const [state, send] = useMachine(
            progress.machine({
                id: useId(),
                min,
                max,
                value: mode === 'indeterminate' ? null : value,
            }),
        );

        const api = progress.connect(state, send, normalizeProps);

        useImperativeHandle(ref, () => api, [api]);

        const rootProps = useMemo(() => {
            const props = { ...api.getRootProps(), className: clsx(cn, className) };

            if (disabled) {
                props['data-disabled'] = true;
            }

            return props;
        }, [api, className, disabled]);

        return (
            <div {...rootProps}>
                <div {...api.getLabelProps()}>Upload progress</div>
                <svg {...api.getCircleProps()}>
                    <circle {...api.getCircleTrackProps()} />
                    <circle {...api.getCircleRangeProps()} />
                </svg>
            </div>
        );
    },
);
