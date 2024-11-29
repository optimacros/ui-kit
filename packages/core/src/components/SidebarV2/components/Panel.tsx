import { forward, styled } from '@optimacros/ui-kit-store';
import { PropsWithChildren } from 'react';
import { useApi } from '../context';
import { tw } from '@optimacros/ui-kit-utils';

export const rootClassName = tw`bg-[var(--bg)] h-full absolute top-0 data-[position=right]:right-0 data-[position=left]:left-0 transition-all box-border overflow-hidden flex flex-col

border-0 data-[position=right]:border-l data-[position=left]:border-r border-solid border-[var(--border-bg)]`;

export const Panel = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...rest}
                {...api.getRootProps()}
                ref={ref}
                data-tag="sidebar"
                data-position={api.position}
                className={rootClassName}
                style={{ width: api.open ? api.width : 0 }}
            >
                {children}
            </styled.div>
        );
    },
    { displayName: 'Panel' },
);
