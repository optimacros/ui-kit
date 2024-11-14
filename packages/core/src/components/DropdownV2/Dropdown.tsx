import { createReactApiStateContext } from '@optimacros/ui-kit-store';
import * as menu from '@zag-js/menu';
import { ReactNode } from 'react';

export const { Api, Provider, useApi, State, Root } = createReactApiStateContext({
    id: 'dropdown',
    initialState: null,
    api: null as menu.Api,
    machine: menu,
});

export const Indicator = ({ children }: { children: ReactNode }) => {
    const api = useApi();

    return <span {...api.getIndicatorProps()}>{children}</span>;
};

export const Item = ({ children, ...props }: menu.ItemProps & { children: ReactNode }) => {
    const api = useApi();

    return <li {...api.getItemProps(props)}>{children}</li>;
};

export const Content = ({ children }: { children: ReactNode }) => {
    const api = useApi();

    return (
        <div {...api.getPositionerProps()}>
            <ul {...api.getContentProps()}>{children}</ul>
        </div>
    );
};

export const Trigger = ({ children }: { children: (props) => ReactNode }) => {
    const api = useApi();

    return children(api.getTriggerProps());
};
