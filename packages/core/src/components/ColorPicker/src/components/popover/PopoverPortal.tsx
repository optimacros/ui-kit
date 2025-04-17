import { forward, styled } from '@optimacros-ui/store';
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
            <styled.div {...rest} ref={ref} {...api.getPositionerProps()}>
                <styled.div {...restContentProps} className={classNameContent}>
                    <styled.div>{children}</styled.div>
                </styled.div>
            </styled.div>
        );
        return portalled ? <Portal>{Component}</Portal> : Component;
    },
    { displayName: 'PopoverPortal' },
);
