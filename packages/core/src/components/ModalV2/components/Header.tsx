import { forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';
import React from 'react';
import { useApi } from '../Modal';
import { Icon } from '../../Icon';
import { ICONS_MAP } from '@optimacros/themes';

export const headerClassName = tw`relative pl-6 pr-14 py-3.5 flex flex-row items-center w-full box-border`;
export const iconClassName = tw`absolute size-6 text-[var(--Checkbox-color)] hover:text-[var(--color-primary)] cursor-pointer top-4 right-4`;

export const Header = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div className={headerClassName} {...rest} ref={ref} data-part="header">
                {children}

                <Icon
                    {...api.getCloseTriggerProps()}
                    value={ICONS_MAP.close}
                    className={iconClassName}
                />
            </styled.div>
        );
    },
    {
        memoize: true,
        displayName: 'Header',
    },
);
