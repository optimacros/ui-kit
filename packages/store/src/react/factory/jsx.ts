import { capitalize, lowerCase, merge } from '@optimacros-ui/utils';
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
        const { asChild, children, as, className = '', ...restProps } = props;
        let cn = className;

        if (restProps['data-part'] && restProps['data-scope']) {
            cn = `${lowerCase(restProps['data-scope'])} ${lowerCase(restProps['data-part'])}${className && ' ' + className}`;
        }

        if (!asChild) {
            return !as
                ? createElement(Component, { ...restProps, className: cn, ref }, children)
                : createElement(as, { ...restProps, className: cn, ref }, children);
        }

        const onlyChild = Children.only(children);

        return isValidElement(onlyChild)
            ? cloneElement(onlyChild, {
                  ...merge(false, restProps, onlyChild.props as any),
                  className: cn,
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

/**
 * React component factory
 */
export const styled = createJsxFactory();
