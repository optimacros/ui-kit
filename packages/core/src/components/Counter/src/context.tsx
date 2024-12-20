import { createContext, useContext, useState } from 'react';

export interface CounterProps {
    value: number | string;
    onIncrease: () => void;
    onDecrease: () => void;
}

const CounterContext = createContext<CounterProps>(null);

export const useApi = () => useContext(CounterContext);

export const RootProvider = ({ defaultValue, maxValue = Infinity, children }) => {
    const [counter, setCounter] = useState<number>(defaultValue || 0);

    const onIncrease = () => {
        setCounter((prev) => ++prev);
    };

    const onDecrease = () => {
        setCounter((prev) => --prev);
    };

    const value = counter < maxValue ? counter : `${maxValue}+`;

    return (
        <CounterContext.Provider value={{ value, onIncrease, onDecrease }}>
            {children}
        </CounterContext.Provider>
    );
};
