import { forward, styled } from '@optimacros/ui-kit-store';
import { PropsWithChildren } from 'react';
import { tw } from '@optimacros/ui-kit-utils';
import { useApi } from '../context';

export const miniPanelClassName = tw`bg-[var(--bg)] h-full absolute top-0 data-[position=right]:right-0 data-[position=left]:left-0 box-border w-[var(--width)] transition-all p-[var(--padding)]

border-0 data-[position=right]:border-l data-[position=left]:border-r border-solid border-[var(--border-bg)]

cursor-pointer hover:bg-[var(--bg-hover)]`;

export const MiniPanel = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        if (api.open) {
            return null;
        }

        return (
            <styled.div
                {...props}
                ref={ref}
                className={miniPanelClassName}
                data-position={api.position}
                data-tag="sidebar"
                data-scope="collapsible"
                data-part="mini-panel"
            />
        );
    },
    { displayName: 'MiniPanel' },
);
