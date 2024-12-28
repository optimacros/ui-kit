import * as _ from '@optimacros-ui/utils';
import {
    ComponentProps,
    createElement,
    FC,
    forwardRef,
    ForwardRefExoticComponent,
    isValidElement,
    memo,
} from 'react';
import { type ForwardRefComponent, type JsxElementsKey, styled } from './factory';

export type ElementConfig<TProps = NonNullable<unknown>, DProps = TProps> = {
    memoize?: boolean;
    defaultProps?: DProps;
    displayName?: string;
    Component?: FC;
    /** Flag for excluding html types if equal false -> won't generate types */
    __types?: boolean;
    /**
     * Internal hook for mutating props
     *
     * Like adding styles, methods
     *
     * Must return the same props, but mutated values
     */
    useProps?: (props: NonNullable<TProps>) => TProps;
};
/**
 * @param Component
 * @param config Makes displayName auto-pascal
 * @returns
 */
export function createReactElement<T extends FC | ForwardRefExoticComponent<{}> | JsxElementsKey>(
    ComponentOrKey: T,
    config: ElementConfig<ComponentProps<T>>,
    //@ts-ignore
): T extends string ? ForwardRefComponent<T> : T {
    const { memoize, displayName, useProps, defaultProps } = config;

    const create = (El) => {
        let Element = El;

        Element = memoize ? memo(Element) : Element;

        displayName && (Element.displayName = displayName);

        defaultProps &&
            (Element.defaultProps = {
                ...Element.defaultProps,
                ...defaultProps,
            });

        return Element;
    };

    const Component =
        typeof ComponentOrKey === 'string'
            ? { ...styled[ComponentOrKey as JsxElementsKey] }
            : ComponentOrKey;

    if (
        //@ts-ignore
        !Component?.$$typeof?.toString() &&
        !isValidElement(Component) &&
        !_.isFunction(Component)
    ) {
        new Error('not valid payload, expected forwardRef render function');
    }

    if (useProps) {
        const ComponentWithUseProps = forwardRef(
            //@ts-ignore
            ({ children, ...props }, ref) => {
                //@ts-ignore
                const mutatedProps = useProps(props);

                return createElement(
                    //@ts-ignore
                    Component,
                    //@ts-ignore
                    { ...mutatedProps, ref },
                    children,
                );
            },
        );

        return create(ComponentWithUseProps);
    }

    return create(Component);
}
