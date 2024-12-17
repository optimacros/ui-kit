import { createReactApiStateContext } from '@optimacros-ui/store';
import * as toast from '@zag-js/toast';
import { ReactNode, Fragment } from 'react';

export const { Api, RootProvider, useApi } = createReactApiStateContext({
    api: null as toast.GroupApi,
    id: 'toast-group',
    machine: toast.group,
    initialState: null,
});

export const Portal = ({
    children,
}: {
    /** toast renderer */
    children: (toast: toast.Service<any>) => ReactNode;
}) => {
    const api = useApi();

    return (
        <>
            {api.getPlacements().map((placement) => (
                <div key={placement} {...api.getGroupProps({ placement })}>
                    {api.getToastsByPlacement(placement).map((toast) => (
                        <Fragment key={toast.id}>{children(toast)}</Fragment>
                    ))}
                </div>
            ))}
        </>
    );
};
