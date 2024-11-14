import { ComponentProps, ReactNode } from 'react';
import * as tooltip from '@zag-js/tooltip';
import { createReactApiStateContext } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';

export const { Provider, useState, useApi, State, Api, Root } = createReactApiStateContext({
    id: 'Tooltip',
    initialState: null,
    machine: tooltip,
    api: null as tooltip.Api,
});

const tooltipContent = tw`bg-tooltip-bg text-tooltip p-2 max-w-20 rounded-sm`;

export const Content = ({ children }: { children: ReactNode }) => {
    const api = useApi();

    return (
        api.open && (
            <div {...api.getPositionerProps()}>
                <span {...api.getContentProps()} className={tooltipContent}>
                    {children}
                </span>
                <div {...api.getArrowProps()} className="z-low">
                    <div {...api.getArrowTipProps()} />
                </div>
            </div>
        )
    );
};

export const Trigger = ({ children }: { children: (props) => ReactNode }) => {
    const api = useApi();

    return children(api.getTriggerProps());
};

export interface Props extends ComponentProps<typeof Root> {}
