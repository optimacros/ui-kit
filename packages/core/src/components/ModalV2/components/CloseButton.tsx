import { forward } from '@optimacros/ui-kit-store';
import { useApi } from '../Modal';
import { tw } from '@optimacros/ui-kit-utils';
import React from 'react';
import { Button } from '../../ButtonV2';

export const closeButtonClassName = tw``;

export const CloseButton = forward<React.PropsWithChildren, 'button'>(
    (props, ref) => {
        const api = useApi();

        return (
            <Button
                variant="accent"
                {...api.getCloseTriggerProps()}
                ref={ref}
                {...props}
                className={closeButtonClassName}
            />
        );
    },
    {
        memoize: true,
        displayName: 'CloseButton',
    },
);
