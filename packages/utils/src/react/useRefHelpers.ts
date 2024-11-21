import { useCallback, useRef } from 'react';

function getValue<T>(value: (() => T) | T): T {
    if (typeof value === 'function') {
        // @ts-ignore
        return value();
    }

    return value;
}

type ConstantBox<T> = { value: T };

export function useConst<T>(initialValue: (() => T) | T): T {
    const constRef = useRef<ConstantBox<T> | void>();

    if (constRef.current === undefined) {
        constRef.current = { value: getValue<T>(initialValue) };
    }

    //@ts-ignore
    return constRef.current.value;
}

export function useLet<T>(value: T): [() => T, (nextValue: T) => void] {
    const letRef = useRef<T>(value);

    const setValue = useCallback(function setValue(value: any) {
        letRef.current = value;
    }, []);

    const getValue = useCallback(function getValue() {
        return letRef.current;
    }, []);

    return [getValue, setValue];
}
