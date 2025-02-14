import { ReactNode, createContext, useContext, useState } from 'react';

export interface CounterState {
    value: number | string;
    increase: () => void;
    decrease: () => void;
}

export interface CounterProps {
    defaultValue?: number;
    step?: number;
    maxValue?: number;
    children?: ReactNode;
}

const CounterContext = createContext<CounterState>(null);

export const useApi = () => useContext(CounterContext);

export const RootProvider = ({
    defaultValue,
    maxValue = Infinity,
    step = 1,
    children,
}: CounterProps) => {
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
