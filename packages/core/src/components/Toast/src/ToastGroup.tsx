import { createMachineContext } from '@optimacros-ui/store';
import * as toast from '@zag-js/toast';
import { ReactNode, Fragment } from 'react';

export const { Api, RootProvider, useApi } = createMachineContext({
    id: 'toast-group',
    machine: toast.group,
});

export const Portal = ({
    children,
    className,
}: {
    /** toast renderer */
    children: (toast: toast.Service<any>) => ReactNode;
    className?: string;
}) => {
    const api = useApi();

    return (
        <>
            {api.getPlacements().map((placement) => (
                <div key={placement} className={className} {...api.getGroupProps({ placement })}>
                    {api.getToastsByPlacement(placement).map((toast) => (
                        <Fragment key={toast.id}>{children(toast)}</Fragment>
                    ))}
                </div>
            ))}
        </>
    );
};
