import { MutableRefObject, Ref } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

function setRef<T>(ref: PossibleRef<T>, value: T) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref !== null && ref !== undefined) {
        // eslint-disable-next-line no-extra-semi
        (ref as MutableRefObject<T>).current = value;
    }
}

export function composeRefs<T>(...refs: PossibleRef<T>[]) {
    return (node: T) => refs.forEach((ref) => setRef(ref, node));
}
