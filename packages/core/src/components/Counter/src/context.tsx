import { createContext, useContext, useState } from 'react';

export interface CounterProps {
    value: number | string;
    increase: () => void;
    decrease: () => void;
}

const CounterContext = createContext<CounterProps>(null);

export const useApi = () => useContext(CounterContext);

export const RootProvider = ({ defaultValue, maxValue = Infinity, step = 1, children }) => {
    const [counter, setCounter] = useState<number>(defaultValue || 0);

    const increase = () => {
        setCounter((prev) => prev + step);
    };

    const decrease = () => {
        setCounter((prev) => prev - step);
    };

    const value = counter < maxValue ? counter : `${maxValue}+`;

    return (
        <CounterContext.Provider value={{ value, increase, decrease }}>
            {children}
        </CounterContext.Provider>
    );
};
