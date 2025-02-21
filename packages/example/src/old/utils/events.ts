import { isUndefined, keys } from '@optimacros-ui/utils';
import type React from 'react';

export default {
    getMousePosition(event: React.MouseEvent<HTMLElement, MouseEvent>): { x: number; y: number } {
        return {
            x: event.pageX - (window.scrollX || window.pageXOffset),
            y: event.pageY - (window.scrollY || window.pageYOffset),
        };
    },

    getTouchPosition(event: React.TouchEvent<HTMLElement>): { x: number; y: number } {
        return {
            x: event.touches[0].pageX - (window.scrollX || window.pageXOffset),
            y: event.touches[0].pageY - (window.scrollY || window.pageYOffset),
        };
    },

    pauseEvent(event: React.MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
    },

    addEventsToDocument(eventMap: Record<string, (event: Event) => void>): void {
        Object.keys(eventMap).forEach((key) => {
            document.addEventListener(key, eventMap[key], false);
        });
    },

    removeEventsFromDocument(eventMap: Record<string, (event: Event) => void>): void {
        Object.keys(eventMap).forEach((key) => {
            document.removeEventListener(key, eventMap[key], false);
        });
    },

    targetIsDescendant(event: Event, parent: HTMLElement | null): boolean {
        let node = event.target as HTMLElement;

        while (node !== null) {
            if (node === parent) {
                return true;
            }

            node = node.parentNode as HTMLElement;
        }

        return false;
    },

    addEventListenerOnTransitionEnded(
        element: HTMLElement | null,
        fn: (event: TransitionEvent) => void,
    ): boolean {
        if (!element) {
            return false;
        }

        const eventName = transitionEventNamesFor(element);

        if (!eventName) {
            return false;
        }

        element.addEventListener(eventName, fn as EventListener);

        return true;
    },

    removeEventListenerOnTransitionEnded(
        element: HTMLElement | null,
        fn: (event: TransitionEvent) => void,
    ): boolean {
        if (!element) {
            return false;
        }

        const eventName = transitionEventNamesFor(element);

        if (!eventName) {
            return false;
        }

        element.removeEventListener(eventName, fn as EventListener);

        return true;
    },
};

const TRANSITIONS: Record<keyof CSSStyleDeclaration, keyof HTMLElementEventMap> = {
    transition: 'transitionend',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
};

function transitionEventNamesFor(element: HTMLElement): keyof HTMLElementEventMap | null {
    return keys(TRANSITIONS).reduce((result: keyof HTMLElementEventMap | null, transition) => {
        return !result && !isUndefined(element.style[transition as keyof CSSStyleDeclaration])
            ? (TRANSITIONS[transition as keyof CSSStyleDeclaration] as keyof HTMLElementEventMap)
            : result;
    }, null);
}
