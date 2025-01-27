//@ts-nocheck
import { FormEvent, MutableRefObject, useRef, useState } from 'react';

/**
 * updates state, when onChange function fires
 * 
 * @example
 * const [data, onChange] = useFormData();
 * 
 * <form onBlur={onChange} onFocus={onChange}>
        <input type="text" name="so" />
    </form>

	// implementing side-effects
	<form onChange={_.debounce(onChange, 300)}>
        <input type="text" name="so" />
  </form>
 */
export function useFormData<T = {}>(defaultValues: T = {}) {
    const [data, setData] = useState(defaultValues);

    return [
        data,
        /** setData, can be used in onBlur onChange etc. */
        (e) => {
            setData(() => ({ ...data, [e.target.name]: e.target.value }));
        },
    ] as [T, (e: FormEvent<HTMLFormElement>) => void];
}

/**
 * lazy version of {@link useFormData}
 *
 * internally when onChange fires updates a Map [name, value]
 *
 * `great for onBlur onSubmit` or some other lazy operation
 *
 * data - ref to map [name, value]
 *
 * onChange function (provide in onChange or onBlur or onClick)
 */
export function useLazyFormData() {
    const data = useRef(new Map());
    return [
        data,
        (e: FormEvent<HTMLFormElement>) => {
            data.current.set(e.target.name, e.target.value);
        },
    ] as [MutableRefObject<Map<string, string>>, (e: FormEvent<HTMLFormElement>) => void];
}
