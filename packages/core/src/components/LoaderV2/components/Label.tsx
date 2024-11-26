import React, { memo } from 'react';
import { useApi } from '../Loader';
import { tw } from '@optimacros/ui-kit-utils';

export const labelClassName = tw`flex justify-center mb-2.5 max-w-full`;
export const labelContainerClassName = tw`truncate`;

export const Label = memo<React.PropsWithChildren>(({ children }) => {
    const api = useApi();

    return (
        <div {...api.getLabelProps()} className={labelClassName}>
            <div className={labelContainerClassName}>{children}</div>
        </div>
    );
});
