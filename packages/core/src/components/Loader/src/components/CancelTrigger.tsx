import React from 'react';
import { useApi } from './context';
import { tw } from '@optimacros/ui-kit-utils';
import { forward, styled } from '@optimacros/ui-kit-store';
import { Icon } from '../../Icon';

export const cancelTriggerClassName = tw`cursor-pointer transition`;

export const CancelTrigger = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...rest}
                className={cancelTriggerClassName}
                ref={ref}
                data-part="cancel-trigger"
                onClick={api.onCancel}
            >
                <Icon value="close" />
            </styled.div>
        );
    },
    { displayName: 'CancelTrigger' },
);
