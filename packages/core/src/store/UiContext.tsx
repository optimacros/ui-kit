import { createContext, ReactNode, useContext } from 'react';

import { invariant } from '../utils';

interface IUiContext {
    iconsSrc: string;
}

const UiContext = createContext<IUiContext | null>(null);

UiContext.displayName = 'UiCoreContext';

export const UiCoreContextWrapper = ({
    children,
    state,
}: {
    state: IUiContext;
    children: ReactNode;
}) => {
    return <UiContext.Provider value={state}>{children}</UiContext.Provider>;
};

export function useUiCore() {
    const state = useContext(UiContext);

    invariant(state, 'not in ui core context');

    return state;
}
