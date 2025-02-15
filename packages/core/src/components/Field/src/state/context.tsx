import { createContext, useContext, useReducer, useEffect } from 'react';

interface FieldState {
    disabled: boolean;
    value: string;
}

type FieldAction = FieldActionUpdateState | FieldActionSetValue;

interface FieldActionUpdateState {
    type: 'UPDATE_STATE';
    payload: Partial<FieldState>;
}

interface FieldActionSetValue {
    type: 'SET_VALUE';
    payload: string;
}

const FieldContext = createContext<FieldState>({ disabled: false, value: null });

export const useState = () => useContext(FieldContext);

const reducer = (state: FieldState, action: FieldAction) => {
    const { type, payload } = action;

    switch (type) {
        case 'UPDATE_STATE':
            return { ...state, ...payload };

        case 'SET_VALUE':
            return { ...state, value: payload };

        default:
            return state;
    }
};

export const RootProvider = ({ disabled = false, value = '', children }) => {
    const [state, dispatch] = useReducer(reducer, { disabled, value });

    useEffect(() => {
        dispatch({ type: 'UPDATE_STATE', payload: { disabled } });
    }, [disabled]);

    useEffect(() => {
        dispatch({ type: 'SET_VALUE', payload: value });
    }, [value]);

    return <FieldContext.Provider value={state}>{children}</FieldContext.Provider>;
};
