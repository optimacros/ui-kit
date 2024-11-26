import React, { memo } from 'react';
import { useApi } from '../Loader';
import { tw } from '@optimacros/ui-kit-utils';

const classNameWrapper = tw`flex justify-center mb-2.5 max-w-full`;
const classNameContainer = tw`truncate`;

export const Label = memo<React.PropsWithChildren>(({ children }) => {
    const api = useApi();

    return (
        <div {...api.getLabelProps()} className={classNameWrapper}>
            <div className={classNameContainer}>{children}</div>
        </div>
    );
});
