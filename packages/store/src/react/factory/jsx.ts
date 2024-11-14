import { capitalize, merge } from '@optimacros/ui-kit-utils';
import {
    Children,
    ComponentPropsWithRef,
    ComponentPropsWithoutRef,
    ElementType,
    ForwardRefExoticComponent,
    ForwardRefRenderFunction,
    JSX,
    LegacyRef,
    cloneElement,
    createElement,
    forwardRef,
    isValidElement,
} from 'react';
import { composeRefs } from './composeRef';

export type JsxElementsKey = keyof JSX.IntrinsicElements;

type ExtendJsxProps = {
    as?: keyof JSX.IntrinsicElements;
    asChild?: boolean;
};

export type PropsWithRef<E extends JsxElementsKey> = ComponentPropsWithRef<E> & ExtendJsxProps;

export type Ref<TagOrElement> = TagOrElement extends JsxElementsKey
    ? JSX.IntrinsicElements[TagOrElement]['ref'] extends LegacyRef<infer R>
        ? R
        : unknown
    : TagOrElement;

export type ForwardRefRenderer<
    E extends JsxElementsKey,
    T = NonNullable<unknown>,
    Ref = JSX.IntrinsicElements[E]['ref'] extends LegacyRef<infer R> ? R : unknown,
> = ForwardRefRenderFunction<Ref, PropsWithoutRef<E> & T>;

export type PropsWithoutRef<E extends JsxElementsKey> = ComponentPropsWithoutRef<E> &
    ExtendJsxProps;

export type ForwardRefComponent<E extends JsxElementsKey> = ForwardRefExoticComponent<
    PropsWithRef<E>
>;

export type JsxElements = {
    [E in keyof JSX.IntrinsicElements]: ForwardRefComponent<E>;
};

const withAsChild = (Component: ElementType) => {
    const Comp = forwardRef<unknown, any>((props, ref) => {
        const { asChild, children, as, ...restProps } = props;

        if (!asChild) {
            return !as
                ? createElement(Component, { ...restProps, ref }, children)
                : createElement(as, { ...restProps, ref }, children);
        }

        const onlyChild = Children.only(children);

        return isValidElement(onlyChild)
            ? cloneElement(onlyChild, {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ...merge(false, restProps, onlyChild.props as any),

                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ref: ref ? composeRefs(ref, (onlyChild as any).ref) : (onlyChild as any).ref,
              })
            : null;
    });

    Comp.displayName =
        // @ts-expect-error - it exists
        Component.displayName || Component.name || capitalize(Component);

    return Comp;
};

export const createJsxFactory = () => {
    const cache = new Map();

    return new Proxy(withAsChild, {
        apply(target, thisArg, argArray) {
            return withAsChild(argArray[0]);
        },
        get(_, element) {
            const asElement = element as ElementType;

            if (!cache.has(asElement)) {
                cache.set(asElement, withAsChild(asElement));
            }

            return cache.get(asElement);
        },
    }) as unknown as JsxElements;
};

export const styled = createJsxFactory();
