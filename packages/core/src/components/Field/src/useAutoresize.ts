import { isUndefined } from '@optimacros-ui/utils';
import { useEffect } from 'react';

const handleAutoresize = (element: HTMLInputElement | HTMLTextAreaElement, rows: number): void => {
    if (!element) {
        return;
    }

    if (!isUndefined(rows)) {
        element.style.height = 'none';
    } else {
        // compute the height difference between inner height and outer height
        const style = window.getComputedStyle(element, null);

        const heightOffset =
            style.boxSizing === 'content-box'
                ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom))
                : parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

        // resize the input to its content size
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight + heightOffset}px`;
    }
};

export function useAutoResize(element: HTMLInputElement | HTMLTextAreaElement, rows: number) {
    const handler = () => handleAutoresize(element, rows);

    useEffect(() => {
        window.addEventListener('resize', handler);

        handler();

        return () => {
            window.removeEventListener('resize', handler);
        };
    }, [element]);

    useEffect(() => {
        window.addEventListener('resize', handler);

        handler();
    }, [element?.value]);
}
