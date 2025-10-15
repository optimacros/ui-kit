// TODO create state or context?

import { useMemo } from 'react';
import { InputProps, TextAreaProps, Callback } from '../models';
import { isObject, isNumber, each, debounce, has } from '@optimacros-ui/utils';

const callbacks: Callback[] = ['onKeyPress', 'onKeyDown', 'onChange'];

type ElementProps = InputProps | TextAreaProps;

export const generateCallbacksFromProps = <T extends ElementProps>(props: T) => {
    const { debounce: debounceProp, ...rest } = props;

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const debouncedCallbacks = useMemo(() => {
        const result = {};

        const submittedCallbacks = callbacks.filter((key) => has(rest, key));

        each(submittedCallbacks, (cb) => {
            if (isNumber(debounceProp)) {
                result[cb] = debounce(rest[cb], debounceProp);
            } else if (isObject(debounceProp) && has(debounceProp, cb)) {
                result[cb] = debounce(rest[cb], debounceProp[cb]);
            }
        });

        return result;
    }, [debounceProp, ...callbacks.map((key) => rest[key])]);

    return { ...rest, ...debouncedCallbacks };
};
