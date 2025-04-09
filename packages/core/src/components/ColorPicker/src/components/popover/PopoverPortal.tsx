import { forward } from '@optimacros-ui/store';
import { PropsWithChildren } from 'react';
import { useApi } from '../../exports';
import { Portal } from '@zag-js/react';
import { clsx } from '@optimacros-ui/utils';

export const PopoverPortal = forward<PropsWithChildren & { portalled?: boolean }, 'div'>(
    ({ children, className, portalled, ...rest }, ref) => {
        const api = useApi();

        const { className: classNameContentProp, ...restContentProps } = api.getContentProps();

        const classNameContent = clsx(classNameContentProp, className);

        const Component = (
            <div {...rest} ref={ref} {...api.getPositionerProps()}>
                <div {...restContentProps} className={classNameContent}>
                    <div>{children}</div>
                </div>
            </div>
        );
        return portalled ? <Portal>{Component}</Portal> : Component;
    },
    { displayName: 'PopoverPortal' },
);
