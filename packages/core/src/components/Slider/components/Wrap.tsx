import { forward } from '@optimacros/ui-kit-store';
import { useApi } from './context';
import { isEqual, tw } from '@optimacros/ui-kit-utils';
import { PropsWithChildren, useEffect } from 'react';

export const rootClassName = tw`w-full`;

interface Props extends PropsWithChildren {
    value: number[];
}

export const Wrap = forward<Props, 'div'>(
    ({ value, children, ...rest }, ref) => {
        const api = useApi();

        // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        useEffect(() => {
            if (!isEqual(value, api.value)) {
                api.setValue(value);
            }
        }, [value]);

        return (
            <div {...rest} {...api.getRootProps()} ref={ref} className={rootClassName}>
                {children}
            </div>
        );
    },
    {
        displayName: 'Wrap',
    },
);
