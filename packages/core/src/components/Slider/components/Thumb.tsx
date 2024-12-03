import { forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';
import { PropsWithChildren } from 'react';
import { useApi } from './context';

export const thumbClassName = tw`flex items-center justify-center rounded-full size-[var(--size)] 
bg-[var(--bg)] data-disabled:bg-[var(--bg-disabled)]`;

interface Props extends PropsWithChildren {
    index: number;
}

export const Thumb = forward<Props, 'div'>(
    ({ index, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...rest}
                {...api.getThumbProps({ index })}
                className={thumbClassName}
                ref={ref}
            >
                <styled.input {...api.getHiddenInputProps({ index })} />
            </styled.div>
        );
    },
    {
        displayName: 'Thumb',
    },
);
